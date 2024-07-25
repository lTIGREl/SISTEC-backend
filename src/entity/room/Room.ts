import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { User } from "../user/User"; // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    isAvailable: boolean = true;

    @OneToOne(() => User, user => user.room)
    @JoinColumn({ name: "occupiedBy" })
    occupiedBy: User | undefined;
}