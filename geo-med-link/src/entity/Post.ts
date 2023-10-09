import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post: String;

  @Column({ type: "timestamptz" })
  date: Date;

  // @Column({})
  // url: string;
  // @ManyToOne(() => User, (user) => user.post)
  // user: User;
}
