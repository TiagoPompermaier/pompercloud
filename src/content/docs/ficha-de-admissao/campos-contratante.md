---
title: Campos das condições da contratação
description: Referência dos campos da aba Contratante (RH) da Ficha de Admissão — o que preencher, o que é obrigatório e de onde vem cada valor sugerido ou automático.
tipo: referencia
palavras_chave: [campo, condições da contratação, aba contratante, data de admissão, cargo, salário, escala, sindicato, estabelecimento, organograma, adiantamento, 13º, insalubridade, periculosidade]
revisado_em: 2026-10-13
responsavel: Central de Tarefas
sidebar:
  order: 12
---

A aba **Contratante (RH)** é preenchida pelo **RH da empresa** (papel do cliente). O empregado não vê esta aba. Todos os campos marcados como obrigatórios precisam estar preenchidos para o RH concluir o preenchimento.

Na coluna "Origem": **digitado** é informado pelo RH; **sugerido** vem das admissões anteriores da empresa no mesmo cargo; **automático** vem do tipo de contrato ou de outra resposta. Valores sugeridos e automáticos podem ser alterados.

## Condições da contratação: seção Contrato

| Campo | Obrigatório | Origem | Observação |
|---|---|---|---|
| Data de admissão | Sim | Digitado | Pode ser informada antes do cargo |
| Cargo | Sim | Lista do cadastro | Deve ser o primeiro campo. Libera os demais e dispara as sugestões |
| Salário | Sim | Sugerido | No estágio, é o valor da bolsa |
| Tipo de salário | Sim | Automático | Mensal, Comissão/variável, Hora, Tarefa ou Bolsista |
| Experiência (dias) | Sim | Digitado | CLT: entre 30 e 90 dias. Estágio e aprendiz: "Dias de contrato", sem esse limite |
| Prorrogação (dias) | Não | Automático | No CLT, 90 menos os dias de experiência |
| Modalidade de contratação | Sim, só no aprendiz | Digitado | Direta (a empresa contrata) ou indireta (entidade contrata em nome da empresa) |

## Condições da contratação: seção Lotação

| Campo | Obrigatório | Origem | Observação |
|---|---|---|---|
| Estabelecimento | Sim | Sugerido | Lista dos estabelecimentos da empresa |
| Organograma | Sim | Sugerido | Depende do estabelecimento. Trocar o estabelecimento limpa o organograma |
| Sindicato | Sim | Sugerido | Sindicatos já usados pela empresa ou cadastro completo (só sindicatos de empregados) |

## Condições da contratação: seção Jornada

| Campo | Obrigatório | Origem | Observação |
|---|---|---|---|
| Escala de trabalho | Sim | Sugerido | Escalas já usadas pela empresa ou cadastro completo |
| Regime de jornada | Sim | Automático | Submetido a horário, atividade externa, cargo de gestão (art. 62, II) ou teletrabalho |
| Tipo de jornada | Sim | Sugerido | Por exemplo 12x36, horário fixo com folga variável, turno de revezamento |
| Tempo parcial | Sim | Automático | Padrão "não é tempo parcial"; no aprendiz, "até 25h semanais" |

## Condições da contratação: seção Adicionais

| Campo | Obrigatório | Origem | Observação |
|---|---|---|---|
| Exposição a agente nocivo | Sim | Automático | Padrão "sem exposição". Só muda com PGR ou laudo de segurança do trabalho |
| Já esteve exposto | Sim | Automático | Padrão "Não" |
| Insalubridade (%) | Não | Sugerido | |
| Periculosidade (%) | Não | Sugerido | |

## Condições da contratação: seção Pagamento

| Campo | Obrigatório | Origem | Observação |
|---|---|---|---|
| Recebe adiantamento | Sim | Automático | Padrão "Não recebe". Opções: no mês da admissão, no mês seguinte, após a experiência |
| Percentual de adiantamento | Não | Digitado | Só quando recebe adiantamento |
| Modo de pagamento | Sim | Automático | Padrão "Bancária" |
| Recebe 13º salário | Sim | Automático | "Sim" no CLT, intermitente e aprendiz; "Não" no estágio |

## Condições da contratação: seção Estágio

Aparece só para estagiário. No menor aprendiz, aparece como **Aprendizagem**, apenas com a instituição de ensino. Veja [Admissão de estagiário](/ficha-de-admissao/estagiario/).
