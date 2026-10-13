import type { APIRoute } from 'astro';
import { docsIndexaveis, respostaIndice } from '../lib/indice-agente';

/**
 * Índice geral com todos os módulos: /search-index.json
 * Útil para um agente que precise consultar tudo (ex.: Tecnologia ou a Triagem).
 */
export const GET: APIRoute = async ({ site }) => {
  const docs = await docsIndexaveis();
  return respostaIndice(docs, site);
};
