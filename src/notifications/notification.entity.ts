import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    body: string;


    @Column({name: 'create_at'})
    createAt: Date;

    @Column({name: 'is_red'})
    isRed: boolean;
}