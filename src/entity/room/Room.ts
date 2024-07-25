import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "../user/User"; // Asegúrate de ajustar la ruta de importación según tu estructura de proyecto

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({type: 'boolean', default: true})
    isAvailable: boolean = true;

    @OneToOne(() => User, user => user.room)
    @JoinColumn({ name: "occupiedBy" })
    occupiedBy: User | undefined;
}