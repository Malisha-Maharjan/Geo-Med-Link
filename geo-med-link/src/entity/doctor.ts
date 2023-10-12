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
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  NMC: number;

  @Column({ nullable: false })
  degree: string;

  @Column({ default: false })
  is_verified: Boolean;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  user: User;
  donor: Promise<User[]>;
}
