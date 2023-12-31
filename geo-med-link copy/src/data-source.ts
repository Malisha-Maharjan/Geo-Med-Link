import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { env } from "./utils/env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: env.DATABASE_LOGGING,
  entities: [User],
  migrations: [env.MIGRATION_URL],
  subscribers: [],
});
