import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blood_Donor } from "./Blood-donor";
@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  NMC_number: number;

  @OneToOne(() => Blood_Donor, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn()
  user: Blood_Donor;
  donor: Promise<Blood_Donor[]>;

  @Column({ default: true })
  is_active: Boolean;
}
