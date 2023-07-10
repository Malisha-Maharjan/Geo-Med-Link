import { AppDataSource } from "./data-source";
import { Blood_Donor } from "./entity/Blood-donor";
import { User } from "./entity/User";

export const userRepository = AppDataSource.getRepository(User);
export const donorRepository = AppDataSource.getRepository(Blood_Donor);
