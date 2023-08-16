import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: String;

  @Column({ nullable: false })
  address: String;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  email: string;

  @Column({})
  bio: String;

  @Column({ nullable: false })
  type: number;
}
