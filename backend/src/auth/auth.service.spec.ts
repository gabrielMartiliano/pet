import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// 1. Mock do bcrypt no topo para evitar o erro de "Cannot redefine property"
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  
  // Criamos mocks para as dependências do Prisma
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  // Mock do JwtService
  const mockJwt = {
    signAsync: jest.fn().mockResolvedValue('fake-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve disparar erro se a conta estiver bloqueada', async () => {
    const futureDate = new Date(Date.now() + 10000);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: 'hashedpassword',
      lockedUntil: futureDate,
    });

    await expect(service.login('test@test.com', 'password')).rejects.toThrow(
      'Muitas tentativas. Tente novamente mais tarde.',
    );
  });

  it('deve incrementar loginAttempts ao errar a senha', async () => {
    // 2. Agora usando o mock importado corretamente
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      password: 'hashedpassword',
      loginAttempts: 2,
    });

    // Mock do update
    mockPrisma.user.update.mockResolvedValue({});

    await expect(service.login('test@test.com', 'wrong')).rejects.toThrow(
      'E-mail ou senha incorretos',
    );

    // Verifica se o update foi chamado com o incremento
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ loginAttempts: 3 }),
      }),
    );
  });
});