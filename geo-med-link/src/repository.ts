import { AppDataSource } from "./data-source";
import { Comment } from "./entity/Comment";
import { Doctor } from "./entity/Doctor";
import { Like } from "./entity/Like";
import { Organization } from "./entity/Organization";
import { People } from "./entity/People";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Scrap } from "./entity/scrapNews";

export const userRepository = AppDataSource.getRepository(User);
export const personRepository = AppDataSource.getRepository(People);
export const doctorRepository = AppDataSource.getRepository(Doctor);
export const organizationRepository = AppDataSource.getRepository(Organization);
export const scrapNewsRepository = AppDataSource.getRepository(Scrap);
export const postRepository = AppDataSource.getRepository(Post);
export const commentRepository = AppDataSource.getRepository(Comment);
export const likeRepository = AppDataSource.getRepository(Like);
