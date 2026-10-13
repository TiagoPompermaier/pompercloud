import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { docsIndexaveis, moduloDe, respostaIndice } from '../../lib/indice-agente';

/**
 * Gera um índice por módulo: /rdfin/search-index.json, /ficha-de-admissao/search-index.json...
 * Cada agente especialista da Aila aponta para o índice do seu módulo.
 * Pasta nova em src/content/docs = índice novo, sem mexer neste arquivo.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  const modulos = new Set(docs.map(moduloDe).filter((m): m is string => !!m));
  return [...modulos].map((modulo) => ({ params: { modulo } }));
};

export const GET: APIRoute = async ({ params, site }) => {
  const docs = await docsIndexaveis(params.modulo);
  return respostaIndice(docs, site);
};
