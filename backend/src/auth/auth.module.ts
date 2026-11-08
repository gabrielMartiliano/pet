import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // Importe isto
import { JwtStrategy } from './strategies/jwt.strategy'; // E a estratégia

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Registre o Passport
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'SECRET_KEY_PADRAO', 
      signOptions: { expiresIn: '1d' }, 
    }),  
    PrismaModule
  ],
  providers: [AuthService, JwtStrategy], 
  controllers: [AuthController],
  exports: [PassportModule] 
})
export class AuthModule {}