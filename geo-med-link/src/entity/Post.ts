import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  post!: String;

  @Column({ type: "datetime" })
  date: Date;

  @Column({ nullable: true })
  photo: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User)
  user: User;
}
