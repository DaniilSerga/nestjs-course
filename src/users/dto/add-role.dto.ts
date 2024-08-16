import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({description: 'Role name', example: 'USER'})
    readonly value: string;
    @ApiProperty({description: 'User\'s id', example: 1})
    readonly userId: number;
}