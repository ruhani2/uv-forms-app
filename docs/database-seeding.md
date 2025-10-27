# Database Seeding Guide

This project uses Prisma with a MySQL database. The seed workflow lives in `prisma/seed.js` and hydrates lookup tables and test users from the JSON fixtures under `prisma/data`.

## 1. Install Dependencies
- Ensure you have a recent Node.js + npm toolchain.
- Install project dependencies once with:

  ```bash
  npm install
  ```

## 2. Prepare Your MySQL Instance
- Point the project at the MySQL instance you already manage (cloud-hosted or on-premise).
- Ensure the database is reachable from your machine and that the user has permissions to create tables and insert data.

## 3. Configure Environment Variables
- Open `.env` and confirm that `DATABASE_URL` targets the hosted MySQL instance you plan to seed. The repo currently ships with `mysql://nihal:nihal_dev_pass_123@31.97.236.161:3306/nextjs_dev`; update this if you are using different credentials or a separate database.
- Example format:

  ```
  DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
  ```

- Restart your shell or reload the environment after editing the file so the Prisma CLI picks it up.

## 4. Push the Prisma Schema
Because this repo does not ship Prisma migrations yet, create/update the schema in your database before seeding:

```bash
npx prisma generate      # builds the Prisma client
npx prisma db push       # applies prisma/schema.prisma to the database
```

## 5. Run the Seed Script
- For the default development dataset run:

  ```bash
  npm run db:seed:development
  ```

  This resolves to `NODE_ENV=development node prisma/seed.js`. The script upserts roles, countries, Indian states and cities, facilities, a dummy bhandara, and test users. It is safe to re-run because all writes use `upsert`.

- To target a different environment, invoke the script manually with the desired `NODE_ENV`, for example:

  ```bash
  NODE_ENV=production node prisma/seed.js   # only inserts core roles
  ```

  On Windows, use `npx cross-env NODE_ENV=development node prisma/seed.js` to set the environment variable.

## 6. Verify the Data
- Inspect the tables with `npx prisma studio`, your preferred SQL client, or by querying `mysql -u root -p`.
- Confirm that key tables such as `Role`, `Country`, and `Facility` contain records.

## Fixture Notes
- JSON fixtures live under `prisma/data`. Adjust these files before running the seed if you need different defaults.
- The seed expects a file named `branch_and_centers.json`; if you use the provided dataset, rename `prisma/data/branch_and_centres.json` or update the path in `prisma/seed.js` accordingly.
- State and city data currently covers India (`prisma/data/countries/IN/**`). Additional countries can be added by following the same directory structure.

## Troubleshooting
- Ensure the database user in `DATABASE_URL` has privileges to create tables and insert data.
- If you see `Error: connect ECONNREFUSED`, verify the host/port in `DATABASE_URL`, ensure the MySQL service is running, and check that firewalls allow the connection.
- Prisma will cache a generated client; re-run `npx prisma generate` after changing `schema.prisma`.
- When running in CI/CD or other environments where `NODE_ENV=development command` syntax is not supported, wrap the script with `cross-env`.
