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
}