import { PrismaClient } from "@prisma/client";
import { ROLES } from "../src/lib/constants.js";
import fs from "fs";

const prisma = new PrismaClient();

async function insertRoles() {
  for (const [key, name] of Object.entries(ROLES)) {
    await prisma.role.upsert({
      where: { key },
      update: { name },
      create: { key, name },
    });
    console.log(`Upserted role: ${name}`);
  }
}

async function insertCountriesAndStatesAndCities() {
  const countriesData = JSON.parse(
    fs.readFileSync("./prisma/data/countries.json", "utf-8")
  );

  for (const country of countriesData) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: { name: country.name },
      create: { code: country.code, name: country.name },
    });
  }

  const statesData = JSON.parse(
    fs.readFileSync("./prisma/data/countries/IN/states.json", "utf-8")
  );

  const india = await prisma.country.findUnique({ where: { code: "IN" } });

  if (india) {
    for (const state of statesData) {
      const stateUpsert = await prisma.state.upsert({
        where: { code: state["code"], countryId: india.id },
        update: { code: state["code"], name: state["name"] },
        create: {
          code: state["code"],
          name: state["name"],
          countryId: india.id,
        },
      });

      const citiesData = JSON.parse(
        fs.readFileSync(
          `./prisma/data/countries/IN/${state["name"].split(" ").join("_")}-${
            state["code"]
          }/allCities.lite.json`,
          "utf-8"
        )
      );

      if (stateUpsert.id !== null) {
        for (const city of citiesData) {
          console.log("States", stateUpsert.id);
          console.log("City", city);
          await prisma.city.upsert({
            where: {
              code: `${city["name"].split(" ").join("_")}-${state["code"]}`,
              name: city["name"],
              stateId: stateUpsert.id,
            },
            update: {
              code: `${city["name"].split(" ").join("_")}-${state["code"]}`,
              name: city["name"],
              stateId: stateUpsert.id,
            },
            create: {
              code: `${city["name"].split(" ").join("_")}-${state["code"]}`,
              name: city["name"],
              stateId: stateUpsert.id,
            },
          });
        }
      }
    }
  }
}

async function insertBranchesAndCenters() {
  const branchesAndCenters = JSON.parse(
    fs.readFileSync("./prisma/data/branch_and_centers.json", "utf-8")
  );

  for (const item of branchesAndCenters) {
    if (item["id"] !== null) {
      await prisma.facility.upsert({
        where: { affiliationCode: item["id"] },
        update: {
          name: item["name"],
          region: item["region"],
          affiliationCode: item["id"],
          parentId: item["parent_id"],
        },
        create: {
          name: item["name"],
          region: item["region"],
          affiliationCode: item["id"],
          parentId: item["parent_id"],
        },
      });
    }
  }
}

async function insertTestUsers() {
  const testUsers = JSON.parse(
    fs.readFileSync("./prisma/data/test-users.json", "utf-8")
  );

  for (const user of testUsers) {
    const {} = user;
    const role = await prisma.role.findUnique({
      where: { key: user["roleKey"] },
    });
    const facility = await prisma.facility.findUnique({
      where: { affiliationCode: user["affiliationCode"] },
    });

    const country = await prisma.country.findUnique({ where: { code: "IN" } });
    const state = await prisma.state.findFirst({
      where: { name: user["addresses"][0]["state"], countryId: country?.id },
    });

    const city = await prisma.city.findFirst({
      where: { name: user["addresses"][0]["city"], stateId: state?.id },
    });

    if (role && facility) {
      await prisma.user.upsert({
        where: { uid: user["uid"] },
        update: {
          uid: user["uid"],
          title: user["title"],
          firstName: user["firstName"],
          middleName: user["middleName"],
          lastName: user["lastName"],
          password: user["password"],
          roleId: role.id,
          facilityId: facility.id,
          emails: {
            create: [{ emailAddress: user["emails"][0]["emailAddress"] }],
          },
          addresses: {
            create: [
              {
                houseNo: user["addresses"][0]["houseNo"],
                landmark: user["addresses"][0]["landmark"],
                pincode: user["addresses"][0]["pincode"],
                addressType: user["addresses"][0]["addressType"],
                countryId: country.id,
                stateId: state.id,
                cityId: city.id,
              },
            ],
          },
          phoneNumbers: {
            create: [
              {
                code: user["phoneNumbers"][0]["code"],
                number: user["phoneNumbers"][0]["number"],
              },
            ],
          },
        },
        create: {
          uid: user["uid"],
          title: user["title"],
          firstName: user["firstName"],
          middleName: user["middleName"],
          lastName: user["lastName"],
          password: user["password"],
          roleId: role.id,
          facilityId: facility.id,
          emails: {
            create: [{ emailAddress: user["emails"][0]["emailAddress"] }],
          },
          addresses: {
            create: [
              {
                houseNo: user["addresses"][0]["houseNo"],
                landmark: user["addresses"][0]["landmark"],
                pincode: user["addresses"][0]["pincode"],
                addressType: user["addresses"][0]["addressType"],
                countryId: country.id,
                stateId: state.id,
                cityId: city.id,
              },
            ],
          },
          phoneNumbers: {
            create: [
              {
                code: user["phoneNumbers"][0]["code"],
                number: user["phoneNumbers"][0]["number"],
              },
            ],
          },
        },
      });
    }
  }
}

export async function seed() {
  console.log(`Start seeding for ${process.env.NODE_ENV} environment...`);
  console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    // Seed data for development
    await insertRoles();
    await insertCountriesAndStatesAndCities();
    await insertBranchesAndCenters();
    await insertTestUsers();
  } else if (process.env.NODE_ENV === "testing") {
    // Seed data for testing
  } else if (process.env.NODE_ENV === "production") {
    // Seed data for production
    await insertRoles();
  }

  console.log("Seeding finished.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
