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

  @Column({ default: false })
  is_shared: Boolean;

  @Column({ nullable: true })
  sharedPID: number;

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  user: User;
}
