# Central de Ajuda PomperCloud

Documentação dos módulos do PomperCloud, feita com [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).
Serve a dois públicos com o mesmo conteúdo:

- **Usuários:** site com menu, busca e modo escuro.
- **Agentes da Aila (FluxaChat):** um índice `search-index.json` por módulo, lido pela ferramenta "Pesquisar AstroDocs".

## Estrutura

```
src/content/docs/            ← TODO o conteúdo fica aqui
├── index.mdx                ← página inicial
├── rdfin/                   ← módulo RDFIN       → /rdfin/search-index.json
└── ficha-de-admissao/       ← módulo Admissão    → /ficha-de-admissao/search-index.json

src/content.config.ts        ← campos do cabeçalho das páginas (palavras_chave, tipo...)
src/lib/indice-agente.ts     ← formato do índice dos agentes (ajustar após resposta da Demander)
src/pages/                   ← gera os índices automaticamente
src/styles/pompermaier.css   ← cores da Pompermaier
astro.config.mjs             ← nome do site, domínio e menu lateral
docs-internos/               ← guias internos: modelo de página, FluxaChat, publicação (não é publicado)
.github/workflows/           ← automação que publica no servidor
public/.htaccess             ← configuração do Apache (404, HTTPS, UTF-8)
```

## Rodar no seu computador (opcional)

Não é necessário para publicar nem para editar páginas. Útil só para quem quiser ver alterações antes de salvar.

1. Instale o [Node.js](https://nodejs.org) (versão LTS).
2. Abra um terminal na pasta do projeto e rode:

```bash
npm install      # só na primeira vez
npm run dev      # abre o site em http://localhost:4321 e atualiza a cada alteração salva
```

Para conferir os índices: http://localhost:4321/rdfin/search-index.json

## Adicionar uma página

Copie o modelo de `docs-internos/MODELO-DE-PAGINA.md` para a pasta do módulo e escreva o conteúdo.

## Adicionar um módulo novo

1. Crie a pasta em `src/content/docs/` (ex.: `certificados-digitais/`) com ao menos uma página.
2. Em `astro.config.mjs`, acrescente no `sidebar`:

```js
{ label: 'Certificados Digitais', items: [{ autogenerate: { directory: 'certificados-digitais' } }] },
```

3. O índice `/certificados-digitais/search-index.json` passa a existir sozinho no próximo build.
4. Configure a ferramenta no agente do FluxaChat (ver `docs-internos/CONFIGURAR-FLUXACHAT.md`).

## Publicar

O site é publicado em **https://docs.pompermaiercont.com.br**, na hospedagem da Pompermaier.
O GitHub monta o site e envia por FTP a cada alteração salva (`.github/workflows/publicar.yml`).

Passo a passo da configuração inicial: `docs-internos/PUBLICAR-NO-SERVIDOR.md`.

## Proteções contra conteúdo incompleto

- Página com `✏️ PREENCHER` aparece no site, mas **não entra** no índice dos agentes.
- Página com `indexar_agente: false` também fica fora do índice.
- Se um campo do cabeçalho estiver errado, o build falha e nada é publicado.
