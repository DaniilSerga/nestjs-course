import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Create new user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }
    
    @ApiOperation({summary: 'Set new role'})
    @ApiResponse({status: 200})
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('/role') 
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
    
    @ApiOperation({summary: 'Ban a user'})
    @ApiResponse({status: 200})
    @UseGuards(RolesGuard)
    @Roles('ADMIN') 
    @Post('/ban ') 
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
