import "reflect-metadata";
import { DataSource } from "typeorm";
import { Blood_Donor } from "./entity/Blood-donor";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "Malisha2001",
  database: "geo-med-link",
  logging: false,
  entities: [User, Blood_Donor],
  migrations: ["./build/migration/**.js"],
  subscribers: [],
});
