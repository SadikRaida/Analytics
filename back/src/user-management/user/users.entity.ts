import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
