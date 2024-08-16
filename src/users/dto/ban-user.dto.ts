import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({description: 'User\'s id', example: 1})
    readonly userId: number ;
    @ApiProperty({description: 'Ban reason', example: 1})
    readonly banReason: string;
}