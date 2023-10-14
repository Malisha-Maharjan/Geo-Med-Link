import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comment } from "./entity/Comment";
import { Doctor } from "./entity/Doctor";
import { Organization } from "./entity/Organization";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Scrap } from "./entity/scrapNews";
import { env } from "./utils/env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  logging: env.DATABASE_LOGGING,
  entities: [User, Doctor, Organization, Scrap, Post, Comment],
  migrations: [env.MIGRATION_URL],
  subscribers: [],
});
