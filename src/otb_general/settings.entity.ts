import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { OTB_User } from "src/auth/user.entity";
import { IsNumber, IsNumberString, Max, Min } from "class-validator";

@Entity()
export class OTB_Settings {
    @PrimaryColumn({ type: 'varchar', length: 100 })
    email: string; // Use email as the primary key

    @OneToOne(() => OTB_User)
    @JoinColumn({ name: 'email', referencedColumnName: 'email' })
    user: OTB_User;

    @Column()
    color_theme: string;

    @Column()
    toolbar_orientation: number;
 
    @Column()
    show_tips: number;
}