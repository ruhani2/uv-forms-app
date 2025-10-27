import NextAuthImport from "next-auth";
import CredentialsProviderImport from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const NextAuthHandler = NextAuthImport?.default ?? NextAuthImport;
const credentialsProvider =
  CredentialsProviderImport?.default ?? CredentialsProviderImport;

const findUser = async ({ uid, password }) => {
  if (!uid || !password) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { uid },
    include: {
      role: true,
      facility: true,
      phoneNumbers: true,
      emails: true,
      addresses: {
        include: {
          country: true,
          state: true,
          city: true,
        },
      },
    },
  });

  if (!user || user.password !== password) {
    return null;
  }

  const primaryPhone = user.phoneNumbers?.[0] ?? null;
  const primaryEmail = user.emails?.[0] ?? null;
  const primaryAddress = user.addresses?.[0] ?? null;
  const fullName = [user.firstName, user.middleName, user.lastName]
    .filter(Boolean)
    .join(" ");
  const facilityName = user.facility?.name ?? null;

  return {
    id: String(user.id),
    uid: user.uid,
    name: fullName || user.uid,
    email: primaryEmail?.emailAddress ?? null,
    role: user.role?.key ?? null,
    roleName: user.role?.name ?? null,
    branch: facilityName,
    centre: facilityName,
    facilityAffiliation: user.facility?.affiliationCode ?? null,
    facilityId: user.facilityId ?? null,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    phone: primaryPhone
      ? { code: primaryPhone.code, number: primaryPhone.number }
      : null,
    houseNo: primaryAddress?.houseNo ?? null,
    landmark: primaryAddress?.landmark ?? null,
    city: primaryAddress?.city?.name ?? null,
    state: primaryAddress?.state?.name ?? null,
    country: primaryAddress?.country?.name ?? null,
    pincode: primaryAddress?.pincode ?? null,
  };
};

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    credentialsProvider({
      name: "Credentials",
      credentials: {
        uid: { label: "UID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => findUser(credentials),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.uid = user.uid;
        token.role = user.role;
        token.roleName = user.roleName;
        token.branch = user.branch;
        token.centre = user.centre;
        token.facilityAffiliation = user.facilityAffiliation;
        token.facilityId = user.facilityId;
        token.firstName = user.firstName;
        token.middleName = user.middleName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.houseNo = user.houseNo;
        token.landmark = user.landmark;
        token.city = user.city;
        token.state = user.state;
        token.country = user.country;
        token.pincode = user.pincode;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.uid = token.uid;
        session.user.role = token.role;
        session.user.roleName = token.roleName;
        session.user.branch = token.branch;
        session.user.centre = token.centre;
        session.user.facilityAffiliation = token.facilityAffiliation;
        session.user.facilityId = token.facilityId;
        session.user.firstName = token.firstName;
        session.user.middleName = token.middleName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.houseNo = token.houseNo;
        session.user.landmark = token.landmark;
        session.user.city = token.city;
        session.user.state = token.state;
        session.user.country = token.country;
        session.user.pincode = token.pincode;
        session.user.email = token.email ?? session.user.email ?? null;
        session.user.name = token.name ?? session.user.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuthHandler(authOptions);
