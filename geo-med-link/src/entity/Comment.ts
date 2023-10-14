import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  comment: String;

  @Column({ type: "datetime" })
  date: Date;

  // @Column({ nullable: true })
  // photo: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Post, { eager: true })
  post: Post;
}
