/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    // Aqui usamos o TestingModule para criar a instância com o ciclo de vida completo do Nest
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('deve ser instanciado corretamente', () => {
    expect(service).toBeDefined();
  });

  it('deve conectar ao banco ao inicializar o módulo', async () => {
    // Espionamos o método $connect que a classe herda do PrismaClient
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue(undefined);
    
    // Agora o NestJS executa corretamente o método do ciclo de vida
    await service.onModuleInit();
    
    expect(connectSpy).toHaveBeenCalled();
  });
});