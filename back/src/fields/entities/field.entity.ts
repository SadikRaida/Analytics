import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Field {

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({nullable:true})
    startDate: Date;
}
