import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
// @Check("password", "^(?=.*[A-Z])(?=.*[a-z]).{8,}$")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: true,
    type: "text",
  })
  middleName!: string | null;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({ default: false })
  is_donor: Boolean;

  @Column({ nullable: true })
  blood_Group: String;

  @Column({ default: false })
  is_doctor: Boolean;
}
