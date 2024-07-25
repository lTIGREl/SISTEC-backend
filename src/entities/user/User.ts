import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Room } from "../room/Room";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ nullable: false })
    name: string = "";

    @Column({ nullable: false })
    idNumber: string = "";

    @OneToOne(() => Room, room => room.occupiedBy)
    room: Room | undefined;

    @Column({ nullable: false })
    startDate: Date = new Date();

    @Column({ type: 'datetime', nullable: true })
    endDate: Date | null = null;
}