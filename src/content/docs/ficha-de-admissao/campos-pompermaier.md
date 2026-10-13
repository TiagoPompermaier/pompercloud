---
title: Campos de enquadramento preenchidos pela Pompermaier
description: Referência da aba DP Pompermaier da Ficha de Admissão — enquadramento, local contábil e obrigações legais, com os padrões aplicados por tipo de contrato.
tipo: referencia
palavras_chave: [enquadramento, aba DP, categoria eSocial, tipo de vínculo, FGTS, local contábil, RAIS, CAGED, tipo de admissão, seguro-desemprego, matrícula, tipo de contrato no Questor]
revisado_em: 2026-10-13
responsavel: Departamento Pessoal
sidebar:
  order: 15
---

A aba **DP Pompermaier** é **papel da Pompermaier**. Ela só aparece a partir da triagem (etapa 3) e o cliente não a preenche. A Central de Tarefas completa os campos na triagem e o Departamento Pessoal confere na validação.

Para o cliente, basta saber que o enquadramento é definido pela Pompermaier a partir do tipo de contrato, do cargo e do histórico da empresa.

## Enquadramento (Pompermaier)

| Campo | Obrigatório | Origem |
|---|---|---|
| Matrícula | Não | Em branco, o Questor atribui a próxima sequência. Preencher só se a empresa tem numeração própria |
| Tipo de contrato no Questor | Sim | Sugerido pelo histórico do cargo. A lista mostra só os tipos compatíveis com o tipo de contrato da ficha |
| Tipo de vínculo | Sim | Automático pelo tipo de contrato |
| Categoria do contrato | Sim | Automático pelo tipo de contrato no Questor |
| Categoria eSocial | Sim | Automático pelo tipo de contrato no Questor |
| Optante pelo FGTS | Sim | Automático pelo tipo de contrato no Questor |
| Data de opção do FGTS | Não | Igual à data de admissão, quando optante |

Escolher o tipo de contrato no Questor atualiza a categoria, a categoria eSocial e o FGTS. Para estagiário, também define o tipo de salário como Bolsista.

## Contabilização (Pompermaier)

| Campo | Obrigatório | Origem |
|---|---|---|
| Local contábil | Sim | Sugerido a partir do que a empresa usa para o cargo |

## Obrigações e eSocial (Pompermaier)

| Campo | Obrigatório | Origem |
|---|---|---|
| Tipo de admissão | Sim | Padrão "Admissão". Outras opções cobrem transferências entre empresas |
| Admissão na RAIS | Sim | Automático: primeiro emprego ou reemprego, conforme a resposta do empregado |
| Admissão no CAGED | Sim | Automático: primeiro emprego ou reemprego, conforme a resposta do empregado |
| Tramita seguro-desemprego | Sim | Padrão "Não" |

## Padrões por tipo de contrato

| Item | CLT | Estagiário | Intermitente | Menor aprendiz |
|---|---|---|---|---|
| Categoria eSocial | 101 Empregado geral | 901 Estagiário | 111 Intermitente | 103 Aprendiz |
| Tipo de vínculo | 10 Urbano CLT | 10 Urbano CLT | 10 Urbano CLT | 55 Aprendiz |
| FGTS | Sim | Não | Sim | Sim |
| Tipo de salário | Mensal | Bolsista | Hora | Hora |
| 13º salário | Sim | Não | Sim | Sim |
| Tempo parcial | Não | Não | Não | Até 25h semanais |

O tipo de salário pode ser trocado pela sugestão do histórico do cargo.
