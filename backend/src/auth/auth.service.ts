import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string) {
  
    const user = await this.prisma.user.findUnique({ where: { email } });


    if (!user ) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

     if(user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Muitas tentativas. Tente novamente mais tarde.');
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);


    if (!passwordCompare) {
      await this.prisma.user.update({
        where: { email },
        data: {
          loginAttempts: user.loginAttempts + 1,
          lockedUntil: user.loginAttempts + 1 >= 5 ? new Date(Date.now() + 10 * 60 * 1000) : null,
        },
      });
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }
    else {
      await this.prisma.user.update({
        where: { email },
        data: {
          loginAttempts: 0,
          lockedUntil: null,
        },
      });
    }

    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role 
    
    };
    
    return {
       access_token: await this.jwtService.signAsync(payload),
       
    }
  }
}