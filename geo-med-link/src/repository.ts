import { AppDataSource } from "./data-source";
import { Doctor } from "./entity/Doctor";
import { User } from "./entity/User";

export const userRepository = AppDataSource.getRepository(User);
export const doctorRepository = AppDataSource.getRepository(Doctor);
