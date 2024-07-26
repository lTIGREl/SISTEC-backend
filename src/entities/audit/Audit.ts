import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Audit {
	@PrimaryGeneratedColumn()
	id: number = 0;

	@Column()
	entity: string = "";

	@Column()
	action: string = "";

	@Column()
	entityId: number = 0;

	@Column("json")
	data: any;

	@CreateDateColumn()
	timestamp: Date | undefined;
}