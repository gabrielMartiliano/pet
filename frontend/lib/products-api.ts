import type { Produto } from "@/lib/types"
import type { ProdutoFormValues } from "@/lib/product-schema"

/**
 * API SIMULADA (mock)
 * ------------------------------------------------------------------
 * Substitua o corpo destas funções pelas chamadas reais ao seu
 * backend NestJS. Ex.:
 *   const res = await fetch(`${API_URL}/produtos`)
 *   return res.json()
 * A assinatura das funções foi mantida próxima de um client REST.
 */

const LATENCIA = 600

function delay(ms = LATENCIA) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

// ---- "Banco de dados" em memória -------------------------------------------
let produtos: Produto[] = [
  {
    id: uid(),
    nome: "Camiseta Básica Premium",
    descricao: "Camiseta de algodão pima com caimento regular.",
    categoria: "Camisetas",
    criadoEm: new Date().toISOString(),
    variantes: [
      {
        id: uid(),
        sku: "CAM-PRE-P-PT",
        cor: "Preto",
        tamanho: "P",
        preco: 89.9,
        precoPromocional: 69.9,
        promocaoAtiva: true,
        estoque: 24,
        imagens: [],
      },
      {
        id: uid(),
        sku: "CAM-PRE-M-PT",
        cor: "Preto",
        tamanho: "M",
        preco: 89.9,
        promocaoAtiva: false,
        estoque: 40,
        imagens: [],
      },
    ],
  },
  {
    id: uid(),
    nome: "Calça Jeans Slim",
    descricao: "Calça jeans com elastano e lavagem escura.",
    categoria: "Calças",
    criadoEm: new Date().toISOString(),
    variantes: [
      {
        id: uid(),
        sku: "CAL-SLIM-38-AZ",
        cor: "Azul",
        tamanho: "M",
        preco: 199.9,
        promocaoAtiva: false,
        estoque: 12,
        imagens: [],
      },
    ],
  },
  {
    id: uid(),
    nome: "Tênis Runner",
    descricao: "Tênis de corrida leve com amortecimento em EVA.",
    categoria: "Calçados",
    criadoEm: new Date().toISOString(),
    variantes: [
      {
        id: uid(),
        sku: "TEN-RUN-40-BR",
        cor: "Branco",
        tamanho: "G",
        preco: 349.9,
        precoPromocional: 299.9,
        promocaoAtiva: true,
        estoque: 8,
        imagens: [],
      },
      {
        id: uid(),
        sku: "TEN-RUN-41-BR",
        cor: "Branco",
        tamanho: "GG",
        preco: 349.9,
        promocaoAtiva: false,
        estoque: 0,
        imagens: [],
      },
    ],
  },
]

// ---- Endpoints -------------------------------------------------------------

export async function listarProdutos(): Promise<Produto[]> {
  await delay()
  return structuredClone(produtos)
}

export async function criarProduto(
  data: ProdutoFormValues,
): Promise<Produto> {
  await delay()
  const novo: Produto = {
    id: uid(),
    criadoEm: new Date().toISOString(),
    ...data,
    variantes: data.variantes.map((v) => ({ ...v, id: v.id ?? uid() })),
  }
  produtos = [novo, ...produtos]
  return structuredClone(novo)
}

export async function atualizarProduto(
  id: string,
  data: ProdutoFormValues,
): Promise<Produto> {
  await delay()
  const index = produtos.findIndex((p) => p.id === id)
  if (index === -1) throw new Error("Produto não encontrado")
  const atualizado: Produto = {
    ...produtos[index],
    ...data,
    variantes: data.variantes.map((v) => ({ ...v, id: v.id ?? uid() })),
  }
  produtos[index] = atualizado
  return structuredClone(atualizado)
}

export async function excluirProduto(id: string): Promise<void> {
  await delay()
  produtos = produtos.filter((p) => p.id !== id)
}
