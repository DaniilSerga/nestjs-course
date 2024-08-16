import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/users.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }
    
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        
        // PASSWORDS COMPARISON
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
 
        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: 'Invalid email or password'});
    }

    async register(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException('The email was already taken', HttpStatus.BAD_REQUEST); 
        }

        // Hashing password
        const hashPassword = await bcrypt.hash(userDto.password, 5); // 5 is salt

        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};

        return {
            // Create token
            token: this.jwtService.sign(payload)
        }
    }
}
