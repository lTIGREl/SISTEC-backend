import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "../user/User"; // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({default: true})
    isAvailable: boolean = true;

    @OneToOne(() => User, user => user.id, { eager: true })
    @JoinColumn({ name: "occupiedBy" })
    occupiedBy: User | null = null;
}