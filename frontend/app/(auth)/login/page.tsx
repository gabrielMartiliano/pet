"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevenção básica de duplo clique
    if (isLoading) return;

    setIsLoading(true);
    setErrorMsg("");
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      
      if (!response.ok) {
        throw new Error(data.message || "Ocorreu um erro ao tentar acessar o sistema.");
      }

      // IMPORTANTE: Atualiza o cache do roteador do Next.js. 
      // Isso força os layouts e componentes de servidor a lerem o novo cookie.
      router.refresh();
      
      // Redireciona para a área protegida
      router.push("/home");
      
    } catch (error: any) {
      // Removemos os console.logs de produção por segurança
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-8 transition-all">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            PET 
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Acesso restrito. Insira suas credenciais.
          </p>
        </header>

        {errorMsg && (
          <div 
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg text-sm text-center font-medium"
            role="alert"
            aria-live="assertive"
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              E-mail corporativo 
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-zinc-800"
              placeholder="pet@saude.com.br"
              aria-invalid={!!errorMsg}
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-white disabled:opacity-60 disabled:bg-gray-100 dark:disabled:bg-zinc-800"
              placeholder="••••••••"
              aria-invalid={!!errorMsg}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all flex justify-center items-center focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Autenticando...
              </span>
            ) : (
              "Acessar Painel"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}