import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 segundos
      limit: 20,  // Máximo 20 requisições por IP na janela de tempo
    }]),
    
    
    AuthModule, PrismaModule],
  controllers: [],
  providers: [
       {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
