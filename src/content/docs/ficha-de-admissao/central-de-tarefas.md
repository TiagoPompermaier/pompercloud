---
title: Como a Central de Tarefas conduz a admissão
description: Papel da Pompermaier na Ficha de Admissão — como a Central de Tarefas faz a triagem (etapa 3), devolve ao cliente quando preciso e faz a migração ao Questor (etapa 5).
tipo: procedimento
palavras_chave: [central de tarefas, CT, triagem, migração, Questor, exportar, importação, devolver ao cliente, matrícula, equipe Pompermaier]
revisado_em: 2026-10-13
responsavel: Central de Tarefas
sidebar:
  order: 8
---

Esta página é para a **equipe da Pompermaier**. A Central de Tarefas (CT) atua nas etapas 3 e 5 da Ficha de Admissão. O cliente não participa dessas etapas.

## Central de Tarefas (Pompermaier): acesso

O papel **Pomper CT** fica disponível para quem integra a equipe da Central de Tarefas, com login no PomperCloud. O botão **Localizar ficha** busca fichas em todas as empresas da carteira, sem precisar escolher a empresa antes.

A CT também pode abrir fichas e preencher as abas do cliente, por exemplo quando o cliente pede ajuda. Para atuar em nome da empresa, use o papel Cliente RH: o sistema avisa e registra a ação com o seu usuário.

## Central de Tarefas (Pompermaier): etapa 3, triagem

A ficha chega à triagem quando o RH do cliente a libera. A partir daí, o cliente não edita mais.

1. Abra a ficha. No filtro de situação, use **3 · Triagem CT Pompermaier**.
2. Confira os **campos obrigatórios pendentes**. Clique em cada um para ir direto ao campo.
3. Revise a aba **DP Pompermaier** (enquadramento, local contábil e obrigações). A maior parte vem preenchida automaticamente pelo tipo de contrato e pelo histórico do cargo.
4. Revise os **dados informados pelo cliente**. A CT pode corrigir esses campos; cada alteração vai para o histórico com o valor anterior.
5. Resolva as **verificações automáticas** e registre os atestos pedidos. Veja [Verificações da triagem](/ficha-de-admissao/verificacoes-da-triagem/).
6. Clique em **Triagem concluída — enviar ao DP**.

O botão fica bloqueado enquanto houver campo obrigatório vazio ou verificação de nível erro falhando.

## Central de Tarefas (Pompermaier): devolver ao cliente

Use **Devolver ao cliente** quando o ajuste depende de uma informação ou decisão da empresa. A ficha volta para a etapa 1, e o cliente precisa concluir de novo as abas Contratante e Contratado e liberar outra vez. A devolução fica registrada no histórico.

Quando a correção é simples e a informação já está disponível, a CT pode corrigir o campo na própria triagem, sem devolver.

## Central de Tarefas (Pompermaier): etapa 5, migração ao Questor

Depois da validação do DP, a ficha volta à CT para a migração. Nesta etapa os dados ficam somente para consulta.

1. No quadro **Exportar para o Questor**, escolha o formato:
   - **Arquivos para importação manual:** os NLIs e o TXT de dados;
   - **Integração SYN (JSON):** o corpo para a integração.
2. Clique em **Baixar arquivo**. O sistema pergunta a **matrícula**. Deixe em branco para o Questor atribuir a próxima sequência; informe só quando a empresa tem numeração própria.
3. Importe no Questor.
4. Confirmada a importação, clique em **Migração concluída no Questor**. A ficha vai para a etapa 6.

Cada arquivo baixado fica registrado na ficha.

:::caution[A etapa 6 não retrocede]
Antes de marcar a migração como concluída, confirme que a importação deu certo. Se algo precisar mudar ainda na etapa 5, use **Voltar à validação do DP**.
:::

## Central de Tarefas (Pompermaier): cancelar a admissão

A partir da etapa 3, só a Pompermaier cancela a ficha. Use **Cancelar admissão** e descreva o motivo, que fica no histórico. A ficha cancelada libera o CPF para nova ficha na mesma empresa e pode ser reativada. Uma ficha na etapa 6 não pode ser cancelada.
