import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Blood_Donor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  bloodGroup: string;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user: User;
  donor: Promise<User[]>;

  @Column({ default: true })
  is_active: Boolean;
}
