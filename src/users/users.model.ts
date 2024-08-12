import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({example: '0', description: 'Unique primary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number; 
    @ApiProperty({example: 'test@mail.ru', description: 'User\'s email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: 'qwerty', description: 'User\'s password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example: false, description: 'Describes whether user is banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    @ApiProperty({example: 'ban reason', description: 'Ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;
}