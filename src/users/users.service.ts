import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {} 

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER');

        // Dynamically set a field value and save it at the same time
        await user.$set('roles', [role.id])
         
        return user;
    } 
    
    async getAllUsers() {
        // Include all fields
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }
}
