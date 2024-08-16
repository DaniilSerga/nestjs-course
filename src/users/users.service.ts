import { HttpException, HttpStatus, Injectable, NotImplementedException } from '@nestjs/common';
import { User } from './entities/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService) {} 

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('ADMIN');

        // Dynamically set a field value and save it at the same time
        await user.$set('roles', [role.id])
        user.roles = [role];
        
        return user;
    } 
    
    async getAllUsers() {
        // Include all fields
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);

        if (role && user) {
            await user.$add('role', role);
            return dto;
        }

        throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
    }
    
    async ban(dto: BanUserDto) {
        // await this.userRepository.update()
        throw new NotImplementedException();
    }
}
