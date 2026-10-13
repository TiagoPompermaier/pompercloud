# Modelo de página

Copie este bloco para criar uma página nova dentro da pasta do módulo
(ex.: `src/content/docs/rdfin/nome-da-pagina.md`). O nome do arquivo vira o endereço da página:
use letras minúsculas, sem acento e com hífens.

```md
---
title: Título claro, como o usuário pesquisaria
description: Uma frase dizendo o que a página resolve.
tipo: procedimento        # conceito | procedimento | referencia | faq | politica
palavras_chave: [termos, que o usuário, realmente usa, no WhatsApp]
revisado_em: 2026-10-12
responsavel: Central de Tarefas
sidebar:
  order: 2                # posição no menu do módulo
---

Uma ou duas frases explicando do que se trata.

## Quando usar

Em que situação isso se aplica.

## Passo a passo

1. Primeiro passo.
2. Segundo passo.

## Problemas comuns

### Nome do problema
Causa e solução.

## Com quem falar

Qual área procurar se a página não resolver.
```

## Regras de redação

**Cada seção precisa fazer sentido sozinha.** O agente da Aila lê trechos isolados. Evite "como dito acima"; repita o nome do módulo ou da tela quando necessário.

**Escreva com as palavras do usuário.** Coloque em `palavras_chave` os termos que aparecem nas conversas reais ("mandar extrato", "subir o banco"), não só os nomes oficiais.

**Diga quando NÃO se aplica.** Uma seção "Com quem falar" ou um aviso `:::caution` evita que o agente responda o que não é dele.

**Siglas por extenso na primeira vez de cada página.** Ex.: "RDFIN (Remessa de Dados Financeiros)".

**Tabelas para dados estruturados:** endereços, prazos, campos.

**O título da página e os títulos das seções valem mais na busca do bot.** Escreva-os como o usuário perguntaria: "Como enviar extratos no RDFIN" é melhor que "Envio". Em páginas de dúvidas frequentes, use a própria pergunta como título `##`.

**Páginas de até ~6.000 caracteres.** O bot lê no máximo 18.000 caracteres somando até 3 páginas. Conteúdo longo (como a documentação completa de um formulário) deve virar várias páginas, por exemplo uma por etapa. O build avisa quando uma página passa do limite.

**Só Markdown nas páginas dos módulos.** Componentes MDX (`<Tabs>`, `<Card>` etc.) somem do texto que o bot lê. Os avisos `:::note`, `:::tip` e `:::caution` podem ser usados: eles são convertidos automaticamente.

**Use ✏️ PREENCHER para trechos ainda não escritos.** Páginas com essa marca aparecem no site, mas nunca entram no índice do agente.

**Rascunho inteiro:** use `indexar_agente: false` no cabeçalho. Tire a linha quando a página estiver pronta.

## Avisos destacados

```md
:::note
Informação complementar.
:::

:::tip
Dica de uso.
:::

:::caution[Título opcional]
Atenção: algo que costuma dar errado.
:::
```
