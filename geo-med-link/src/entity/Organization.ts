import { Length, Matches } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  email: string;

  @Column({})
  bio: string;

  @Column({ nullable: false })
  type: number;

  @Column({ unique: true })
  userName: string;

  @Column({ nullable: false })
  @Length(8, 20, { message: "Password must be between 8 to 20 characters." })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
    message: "Must contain one uppercase, one lowercase and min length is 8",
  })
  password: string;
}
