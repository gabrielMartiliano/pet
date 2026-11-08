import type { Produto } from "@/lib/types"

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function estoqueTotal(produto: Produto) {
  return produto.variantes.reduce((acc, v) => acc + (v.estoque || 0), 0)
}
