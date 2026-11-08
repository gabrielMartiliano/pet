import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Cria um pool de conexões usando o pacote nativo do Postgres
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // 2. Cria o adaptador oficial do Prisma
    const adapter = new PrismaPg(pool);
    
    // 3. Passa o adaptador para o construtor do PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}