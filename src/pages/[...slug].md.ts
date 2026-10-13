import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { limparMarkdown, moduloDe } from '../lib/indice-agente';

/**
 * Versão em Markdown puro de cada página: /rdfin/o-que-e.md
 * É o endereço informado no campo "markdown" do índice. O FluxaChat não abre esse link,
 * mas ele serve para o bot citar e para outras ferramentas de IA lerem a página.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs', (d) => moduloDe(d) !== null);
  return docs.map((doc) => ({ params: { slug: doc.id }, props: { doc } }));
};

export const GET: APIRoute<{ doc: CollectionEntry<'docs'> }> = ({ props }) => {
  const { doc } = props;
  const partes = [`# ${doc.data.title}`];
  if (doc.data.description) partes.push(doc.data.description);
  partes.push(limparMarkdown(doc.body ?? ''));
  return new Response(partes.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
