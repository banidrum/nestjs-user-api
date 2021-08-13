import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_table')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column()
    address: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @Column()
    password?: string;
}