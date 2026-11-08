import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Função nativa para decodificar o payload do JWT no Edge Runtime.
 * Não valida a assinatura (isso é papel do backend), apenas lê os dados.
 */
function getRoleFromToken(token: string): string | null {
  try {
    // O JWT tem 3 partes: header.payload.signature
    const payloadBase64 = token.split('.')[1]; 
    if (!payloadBase64) return null;

    // Converte Base64Url (padrão do JWT) para Base64 comum
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    
    // atob é nativo no navegador e no Next.js Edge
    const jsonString = atob(base64);
    const payload = JSON.parse(jsonString);
    
    return payload.role || null; // Certifique-se de que a propriedade no NestJS se chama 'role'
  } catch (error) {
    console.error('Erro ao ler role do token:', error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  // Pega apenas o token do cookie
  
  const token = request.cookies.get('token')?.value;
  console.log(token)
  // Extrai a role direto de dentro do token
  const role = token ? getRoleFromToken(token) : null; 
  
  const url = request.nextUrl.pathname;

  // 1. Identificamos quais são os tipos de rotas
  const isAdminRoute = url.startsWith('/admin');
  const isClientRoute = url.startsWith('/checkout') || url.startsWith('/perfil');
  const isAuthRoute = url === '/login' || url === '/cadastro';

  // 2. Regra de Ouro: Sem token, ninguém entra em rota protegida
  if ((isAdminRoute || isClientRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Regra do Admin: Tem token, mas não é administrador tentando acessar /admin
  if (isAdminRoute && role !== 'ADMIN') {
    // Um cliente tentando dar uma de espertinho. Manda de volta pra vitrine.
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 4. Regra de Login/Cadastro: Usuário já está logado
  if (isAuthRoute && token) {
    // Se for o Admin, manda pro painel. Se for Cliente.
    if (role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/produtos', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se passou por todas as barreiras acima, o acesso está liberado!
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/perfil/:path*', 
    '/checkout/:path*',
    '/login',
    '/cadastro'
  ],
};