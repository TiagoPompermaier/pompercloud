# Configurar a ferramenta "Pesquisar AstroDocs" nos agentes da Aila

Cada agente especialista recebe a ferramenta apontando só para o índice do seu módulo.


## CT - RDFIN

- **Nome da fonte:** Central de Ajuda RDFIN
- **Quando usar:** Quando o contato tiver dúvida sobre como usar o módulo RDFIN (Remessa de Dados Financeiros) ou o Gerencial Financeiro: o que é, como enviar extratos e dados financeiros, como consultar os dados, acesso, prazos e erros. Não usar para fatura, boleto ou honorários da Pompermaier.
- **URL do índice:** https://docs.pompermaiercont.com.br/rdfin/search-index.json

## CT - Admissões

- **Nome da fonte:** Central de Ajuda Ficha de Admissão
- **Quando usar:** Quando o contato tiver dúvida sobre a Ficha de Admissão ou o CV Digital: como iniciar uma admissão, o que preencher em cada campo, o que o empregado preenche, etapas do processo e com quem falar.
- **URL do índice:** https://docs.pompermaiercont.com.br/ficha-de-admissao/search-index.json

## Índice geral (opcional)

Para um agente que precise consultar todos os módulos:
https://docs.pompermaiercont.com.br/search-index.json

## Testes

1. Ligue o **Debug** durante os testes. A nota privada mostra os termos pesquisados e as páginas encontradas.
2. Quando o agente não achar uma página que existe, veja os termos usados no Debug e acrescente-os em `palavras_chave` da página.
3. Desligue o Debug ao colocar em produção.

## Instrução sugerida para o system_prompt do agente

> Para dúvidas de uso do módulo, consulte primeiro a ferramenta de pesquisa da Central de Ajuda e responda com base no conteúdo encontrado, de forma curta e em linguagem simples. Quando útil, envie o link da página. Se a ferramenta não trouxer resposta para a dúvida, não invente: siga para a saída de atendimento humano adequada.

## Como a ferramenta funciona (confirmado pelo time FluxaChat)

- Baixa só o `search-index.json`. **Não abre** as URLs das páginas: tudo o que o bot sabe vem do campo `text` de cada trecho.
- Cada item do índice é um trecho de página (uma seção `##` ou `###`). Seções com mais de 1.800 caracteres são divididas por parágrafo.
- A busca é por palavras-chave, com peso maior no título da página, depois no título da seção, nas `palavras_chave`, na descrição e por fim no texto.
- Devolve até 12 resultados e lê até 3 páginas por vez, somando no máximo 18.000 caracteres.
- O índice precisa ser **público** (GET simples, sem login) e responder em até 5 segundos.
- Fica em cache por 5 minutos: uma alteração publicada leva até 5 minutos para chegar ao bot.
- **Um único trecho inválido faz o índice inteiro ser rejeitado.** O build valida o índice com as mesmas regras e falha antes de publicar, então o site no ar nunca fica com índice quebrado.
- Limite de 5.000 trechos por índice.
