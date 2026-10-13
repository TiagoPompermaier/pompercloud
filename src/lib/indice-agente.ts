import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Índice de busca lido pela ferramenta "Pesquisar AstroDocs" do FluxaChat.
 *
 * Formato confirmado pelo time FluxaChat (serviço documentacao-index):
 * - ARRAY na raiz; cada item é um TRECHO de página (seção ## ou ###).
 * - Seção com mais de 1800 caracteres é dividida por parágrafo.
 * - id = "slug:sequência"; locale = "pt"; id, slug, title, description,
 *   heading, url, markdown e text são strings; tags é array de strings.
 * - Um único item inválido faz o índice INTEIRO ser rejeitado,
 *   por isso o build valida tudo e falha antes de publicar algo errado.
 * - Máximo de 5000 trechos.
 * - A ferramenta não abre as URLs: o "text" precisa ter o conteúdo completo,
 *   sem HTML/JSX/MDX.
 * - Na leitura, junta até 3 páginas e 18.000 caracteres: páginas muito longas
 *   são cortadas. O build avisa quando uma página passa de 6.000 caracteres.
 */

type Doc = CollectionEntry<'docs'>;

export interface Trecho {
  id: string;
  locale: 'pt';
  slug: string;
  title: string;
  description: string;
  tags: string[];
  heading: string;
  url: string;
  markdown: string;
  text: string;
}

const MARCADOR_RASCUNHO = '✏️';
const LIMITE_SECAO = 1800;
const LIMITE_TRECHOS = 5000;
const AVISO_PAGINA_LONGA = 6000;

/** Pasta de primeiro nível = módulo (ex.: "rdfin/envio-de-dados" → "rdfin"). */
export function moduloDe(doc: Doc): string | null {
  return doc.id.includes('/') ? doc.id.split('/')[0] : null;
}

export async function docsIndexaveis(modulo?: string): Promise<Doc[]> {
  const docs = await getCollection('docs', (d) => {
    if (!d.data.indexar_agente) return false;
    const m = moduloDe(d);
    if (!m) return false; // página inicial e páginas soltas ficam fora
    if (modulo && m !== modulo) return false;
    if ((d.body ?? '').includes(MARCADOR_RASCUNHO)) {
      console.warn(`[índice do agente] "${d.id}" ignorada: ainda tem ${MARCADOR_RASCUNHO} PREENCHER.`);
      return false;
    }
    return true;
  });
  return docs.sort((a, b) => a.id.localeCompare(b.id));
}

/** Converte o corpo da página em Markdown limpo, sem HTML, JSX/MDX nem sintaxe própria do Starlight. */
export function limparMarkdown(corpo: string): string {
  return (
    corpo
      // linhas de import/export do MDX
      .replace(/^(import|export)\s.+$/gm, '')
      // avisos do Starlight  :::caution[Título]  →  **Atenção: Título**
      .replace(/^:::(\w+)(?:\[(.+?)\])?\s*$/gm, (_m, tipo: string, titulo?: string) => {
        const nomes: Record<string, string> = {
          note: 'Observação',
          tip: 'Dica',
          caution: 'Atenção',
          danger: 'Importante',
        };
        const base = nomes[tipo] ?? 'Observação';
        return titulo ? `**${base}: ${titulo}**` : `**${base}:**`;
      })
      // fechamento dos avisos
      .replace(/^:::\s*$/gm, '')
      // comentários e tags HTML/JSX
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\/?[A-Za-z][^>]*>/g, '')
      // linhas em branco em excesso
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

interface Secao {
  heading: string;
  corpo: string;
}

/** Quebra o Markdown por títulos ## e ###, ignorando o que estiver dentro de blocos de código. */
function quebrarPorTitulo(md: string, tituloPagina: string): Secao[] {
  const secoes: Secao[] = [];
  let atual: Secao = { heading: tituloPagina, corpo: '' };
  let dentroDeCodigo = false;

  for (const linha of md.split('\n')) {
    if (/^\s*(```|~~~)/.test(linha)) dentroDeCodigo = !dentroDeCodigo;
    const titulo = !dentroDeCodigo && linha.match(/^(##|###)\s+(.+?)\s*#*\s*$/);
    if (titulo) {
      secoes.push(atual);
      atual = { heading: titulo[2], corpo: '' };
    } else {
      atual.corpo += linha + '\n';
    }
  }
  secoes.push(atual);
  return secoes
    .map((s) => ({ heading: s.heading, corpo: s.corpo.trim() }))
    .filter((s) => s.corpo.length > 0);
}

/** Divide uma seção longa por parágrafos, sem passar de LIMITE_SECAO quando possível. */
function dividirPorParagrafo(texto: string): string[] {
  if (texto.length <= LIMITE_SECAO) return [texto];
  const partes: string[] = [];
  let atual = '';
  for (const paragrafo of texto.split(/\n{2,}/)) {
    const candidato = atual ? `${atual}\n\n${paragrafo}` : paragrafo;
    if (candidato.length > LIMITE_SECAO && atual) {
      partes.push(atual);
      atual = paragrafo;
    } else {
      atual = candidato;
    }
  }
  if (atual) partes.push(atual);
  return partes;
}

function trechosDaPagina(doc: Doc, site: URL): Trecho[] {
  const slug = doc.id;
  const title = doc.data.title;
  const md = limparMarkdown(doc.body ?? '');

  if (md.length > AVISO_PAGINA_LONGA) {
    console.warn(
      `[índice do agente] "${slug}" tem ${md.length} caracteres. ` +
        `O FluxaChat lê no máximo 18.000 caracteres somando até 3 páginas: considere dividir em páginas menores.`,
    );
  }

  const base = {
    locale: 'pt' as const,
    slug,
    title,
    description: doc.data.description ?? '',
    tags: doc.data.palavras_chave,
    url: new URL(`/${slug}/`, site).href,
    markdown: new URL(`/${slug}.md`, site).href,
  };

  const trechos: Trecho[] = [];
  for (const secao of quebrarPorTitulo(md, title)) {
    for (const text of dividirPorParagrafo(secao.corpo)) {
      trechos.push({ id: `${slug}:${trechos.length}`, ...base, heading: secao.heading, text });
    }
  }
  return trechos;
}

/** Mesma validação do FluxaChat: se algo falhar aqui, o build para e nada é publicado. */
function validar(trechos: Trecho[]): void {
  const erros: string[] = [];
  if (trechos.length > LIMITE_TRECHOS) {
    erros.push(`índice com ${trechos.length} trechos (máximo ${LIMITE_TRECHOS}).`);
  }
  const ids = new Set<string>();
  const camposTexto = ['id', 'slug', 'title', 'description', 'heading', 'url', 'markdown', 'text'] as const;
  for (const t of trechos) {
    for (const campo of camposTexto) {
      if (typeof t[campo] !== 'string') erros.push(`${t.id}: campo "${campo}" não é texto.`);
    }
    if (t.locale !== 'pt') erros.push(`${t.id}: locale diferente de "pt".`);
    if (!Array.isArray(t.tags) || t.tags.some((x) => typeof x !== 'string')) {
      erros.push(`${t.id}: "tags" precisa ser uma lista de textos.`);
    }
    if (ids.has(t.id)) erros.push(`id repetido: ${t.id}`);
    ids.add(t.id);
  }
  if (erros.length) {
    throw new Error(`Índice do agente inválido (o FluxaChat rejeitaria):\n- ${erros.join('\n- ')}`);
  }
}

export function respostaIndice(docs: Doc[], site: URL | undefined): Response {
  if (!site) throw new Error('Defina "site" no astro.config.mjs para gerar URLs absolutas.');
  const trechos = docs.flatMap((d) => trechosDaPagina(d, site));
  validar(trechos);
  return new Response(JSON.stringify(trechos), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
