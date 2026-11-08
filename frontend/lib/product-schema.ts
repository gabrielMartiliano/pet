import { z } from "zod"

const emptyToUndefined = (v: unknown) =>
  v === "" || v === null || (typeof v === "number" && Number.isNaN(v))
    ? undefined
    : v

export const varianteSchema = z
  .object({
    id: z.string().optional(),
    sku: z.string().min(1, "SKU é obrigatório"),
    cor: z.string().min(1, "Cor é obrigatória"),
    tamanho: z.string().min(1, "Tamanho é obrigatório"),
    preco: z
      .number({ message: "Informe um preço válido" })
      .positive("O preço deve ser maior que zero"),
    precoPromocional: z.preprocess(
      emptyToUndefined,
      z
        .number({ message: "Valor inválido" })
        .nonnegative("Valor inválido")
        .optional(),
    ),
    promocaoAtiva: z.boolean(),
    estoque: z
      .number({ message: "Informe um estoque válido" })
      .int("O estoque deve ser um número inteiro")
      .nonnegative("O estoque não pode ser negativo"),
    imagens: z.array(z.string()),
  })
  .refine(
    (v) =>
      !v.promocaoAtiva ||
      (v.precoPromocional !== undefined && v.precoPromocional > 0),
    {
      message: "Informe o preço promocional quando a promoção estiver ativa",
      path: ["precoPromocional"],
    },
  )
  .refine(
    (v) =>
      !v.promocaoAtiva ||
      v.precoPromocional === undefined ||
      v.precoPromocional < v.preco,
    {
      message: "O preço promocional deve ser menor que o preço normal",
      path: ["precoPromocional"],
    },
  )

export const produtoSchema = z.object({
  nome: z.string().min(2, "O nome deve ter ao menos 2 caracteres"),
  descricao: z.string().min(1, "A descrição é obrigatória"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  variantes: z.array(varianteSchema).min(1, "Adicione ao menos uma variante"),
})

// Tipo de entrada (valores dos inputs) e de saída (após validação/parse)
export type ProdutoFormInput = z.input<typeof produtoSchema>
export type ProdutoFormValues = z.output<typeof produtoSchema>
export type VarianteFormValues = z.output<typeof varianteSchema>
