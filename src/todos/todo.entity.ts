import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Todo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({name : 'user_id', nullable: true})
     userId: string;

    @Column({nullable: true})
    title: string;

}