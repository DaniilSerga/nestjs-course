import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Determines role\'s name'})
    readonly value: string;
    @ApiProperty({example: 'Administrator', description: 'Describes role'})
    readonly  description: string;
}