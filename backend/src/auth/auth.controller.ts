import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async test() {
    return { message: 'API de autenticação funcionando!' };
  }
  @Post('login' ) 
  async login(@Body() loginDto: LoginDto ) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}