import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * Campos extras do cabeçalho (frontmatter) de cada página.
 * O build falha se um campo obrigatório faltar ou vier errado,
 * o que impede publicar página incompleta por engano.
 */
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        // Termos que o usuário realmente usa ao perguntar ("mandar extrato", "subir banco").
        // Entram no índice de busca dos agentes.
        palavras_chave: z.array(z.string()).default([]),

        // Tipo de conteúdo. Ajuda a IA a saber se está lendo um passo a passo ou uma regra.
        tipo: z
          .enum(['conceito', 'procedimento', 'referencia', 'faq', 'politica'])
          .default('procedimento'),

        // Data da última revisão do conteúdo (AAAA-MM-DD).
        revisado_em: z.coerce.date().optional(),

        // Quem responde pelo conteúdo desta página.
        responsavel: z.string().optional(),

        // false = a página aparece no site, mas fica fora do índice do agente
        // (útil para rascunhos ou conteúdo só para leitura humana).
        indexar_agente: z.boolean().default(true),
      }),
    }),
  }),
};
