import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }
    
    @Post('/register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto)
    }
}
