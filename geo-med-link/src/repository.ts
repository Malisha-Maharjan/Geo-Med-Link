import { AppDataSource } from "./data-source";
import { Doctor } from "./entity/Doctor";
import { Organization } from "./entity/Organization";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Scrap } from "./entity/scrapNews";

export const userRepository = AppDataSource.getRepository(User);
export const doctorRepository = AppDataSource.getRepository(Doctor);
export const organizationRepository = AppDataSource.getRepository(Organization);
export const scrapNewsRepository = AppDataSource.getRepository(Scrap);
export const postRepository = AppDataSource.getRepository(Post);
