import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Room } from "../room/Room";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    firstName: string = "";

    @Column()
    idNumber: string = "";

    @OneToOne(() => Room, room => room.occupiedBy)
    room: Room | undefined;

    @Column()
    startDate: Date = new Date();

    @Column()
    endDate: Date | undefined;
}