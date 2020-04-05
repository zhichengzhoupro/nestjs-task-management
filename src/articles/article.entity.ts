import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;


    @Column({nullable: true})
    amount: number;

    @Column()
    title: string;

    @Column({nullable: true})
    body: string;


    @Column({name: 'create_at'})
    createAt: Date;
}