import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bycrypt from 'bcryptjs'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({nullable: true})
    avatar: string;

    @Column({name: "display_name", nullable: true})
    displayName: string;

    @Column({nullable: true})
    role: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bycrypt.hash(password, this.salt);
        console.log(hash, this.password);
        return hash === this.password;
    }
}