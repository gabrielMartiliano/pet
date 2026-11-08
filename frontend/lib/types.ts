export interface Variante {
  id?: string
  sku: string
  cor: string
  tamanho: string
  preco: number
  precoPromocional?: number | null
  promocaoAtiva: boolean
  estoque: number
  imagens: string[]
}

export interface Produto {
  id: string
  nome: string
  descricao: string
  categoria: string
  variantes: Variante[]
  criadoEm: string
}

export const CATEGORIAS = [
  "Camisetas",
  "Calças",
  "Vestidos",
  "Calçados",
  "Acessórios",
  "Jaquetas",
] as const

export const TAMANHOS = ["PP", "P", "M", "G", "GG", "XG"] as const
