import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OTB_User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    jobtitle: string;

    @Column()
    company: string;

    @Column()
    country: string;

    @Column()
    joined: Date;
}