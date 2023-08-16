import { BaseEntity, Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Post extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  post: String

  
}
