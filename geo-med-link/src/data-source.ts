import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
// import { Service } from "./entity/services";
import { Comment } from "./entity/Comment";
import { Doctor } from "./entity/Doctor";
import { Like } from "./entity/Like";
import { Organization } from "./entity/Organization";
import { People } from "./entity/People";
import { Post } from "./entity/Post";
import { Scrap } from "./entity/scrapNews";
import { env } from "./utils/env";

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: env.DATABASE_HOST,
//   port: env.DATABASE_PORT,
//   username: env.DATABASE_USER,
//   password: env.DATABASE_PASSWORD,
//   database: env.DATABASE_NAME,
//   logging: env.DATABASE_LOGGING,
//   entities: [User, People, Organization, Doctor, Scrap, Post, Comment, Like],
//   migrations: [env.MIGRATION_URL],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "MYSQL5048.site4now.net",
  // port: 3306,
  username: "aa486b_geomed",
  password: "Malisha2001",
  database: "db_aa486b_geomed",
  // logging: env.DATABASE_LOGGING,
  entities: [User, People, Organization, Doctor, Scrap, Post, Comment, Like],
  migrations: [env.MIGRATION_URL],
  subscribers: [],
});
