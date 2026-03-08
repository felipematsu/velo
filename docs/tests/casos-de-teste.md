# Casos de Teste - Velô Sprint

Este documento contém os casos de teste funcionais para o sistema Velô Sprint - Configurador de Veículo Elétrico, cobrindo os módulos principais da aplicação SPA. O foco é garantir a validação de regras de negócio, fluxos de uso (felizes e alternativos) e segurança.

## Módulo: Configurador de Veículo

---

### CT01 - Configuração de veículo com opcionais (Fluxo Feliz)

#### Objetivo
Validar se o cálculo do preço do veículo é atualizado corretamente ao selecionar opcionais e rodas premium.

#### Pré-Condições
- O usuário deve estar na página do Configurador.
- O preço base do veículo deve estar em R$ 40.000.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a roda tipo "Sport" | O valor total é acrescido em R$ 2.000 |
| 2 | Adicionar o pacote "Precision Park" | O valor total é acrescido em R$ 5.500 |
| 3 | Adicionar o pacote "Flux Capacitor" | O valor total é acrescido em R$ 5.000 |
| 4 | Clicar no botão "Avançar para Checkout" | O usuário é redirecionado para a tela de Pedido com o valor total calculado em R$ 52.500 |

#### Resultados Esperados
- O sistema calcula dinamicamente o valor do veículo conforme os adicionais escolhidos e permite progredir para o checkout.

#### Critérios de Aceitação
- Preços devem atualizar na interface imediatamente após a seleção.
- A configuração (cor, rodas, opcionais) deve ser mantida ao transitar para o Checkout.

---


## Módulo: Checkout/Pedido

---

### CT02 - Validação de campos obrigatórios no formulário de pedido

#### Objetivo
Garantir que o usuário não consiga avançar no checkout sem preencher corretamente todos os dados pessoais e aceitar os termos.

#### Pré-Condições
- O usuário deve ter finalizado a configuração do veículo.
- O usuário deve estar na tela de Checkout/Pedido.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar o campo "Nome" vazio ou com 1 caractere | Exibe mensagem: "Nome deve ter pelo menos 2 caracteres" |
| 2 | Inserir um "Email" com formato inválido (ex: `teste@`) | Exibe mensagem: "Email inválido" |
| 3 | Inserir um "CPF" incompleto ou vazio | Exibe mensagem: "CPF inválido" |
| 4 | Não selecionar nenhuma "Loja para Retirada" | Exibe mensagem: "Selecione uma loja" |
| 5 | Não marcar a checkbox de "Termos de Uso e Privacidade" | Exibe mensagem: "Aceite os termos" |
| 6 | Clicar em "Confirmar Pedido" com os erros acima | O pedido não é criado e o formulário destaca os erros |

#### Resultados Esperados
- O envio do formulário deve ser bloqueado até que todos os campos obrigatórios atendam aos requisitos de validação.

#### Critérios de Aceitação
- O sistema valida cliente, contato e loja retirada.
- O sistema obriga o aceite dos termos através de um booleano de aceite explícito.

---

### CT03 - Finalização de pedido com pagamento "À Vista"

#### Objetivo
Validar criação de pedido via fluxo à vista sem análise de crédito complexa.

#### Pré-Condições
- Estar na tela de Checkout.
- Todos os campos de dados pessoais preenchidos corretamente.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Selecionar a opção de pagamento "À Vista" | A interface exibe o valor total sem juros e esconde as opções de financiamento. |
| 2 | Clicar em "Confirmar Pedido" | O sistema cria o pedido como "APROVADO" (ou default à vista) e redireciona para a tela de Confirmação (Success). |

#### Resultados Esperados
- Pedido criado com sucesso com o valor exato da configuração.

#### Critérios de Aceitação
- A tela de Sucesso exibe o número do pedido gerado.

---


## Módulo: Análise de Crédito Automática (Financiamento)

---

### CT04 - Crédito reprovado por Score Baixo (Score <= 500)

#### Objetivo
Validar a política de rejeição de crédito para scores baixos (<= 500) sem entrada suficiente.

#### Pré-Condições
- Estar na tela de Checkout com dados pessoais preenchidos (CPF deve simular um Score <= 500).
- Selecionar a opção "Financiamento".
- O campo "Valor da Entrada" preenchido com menos de 50% do total.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Digitar uma entrada de 0% ou até 49% do valor total | Sistema recalcula valor financiado de forma correta. |
| 2 | Clicar em "Confirmar Pedido" | O sistema processa o pedido e aplica o status "REPROVADO" com base no Score. |
| 3 | Observar a tela de sucesso/confirmação | Exibe o pedido com status "Reprovado". |

#### Resultados Esperados
- Pedido finalizado como negado.

#### Critérios de Aceitação
- A taxa de juros de 2% a.m em 12x consta no financiamento interno ou visual.
- A decisão não pode aprovar este pedido (estado final = REPROVADO).

---

### CT05 - Crédito em análise por Score Médio (Score 501 a 700)

#### Objetivo
Validar se clientes com score médio ficam retidos para análise manual da mesa de crédito.

#### Pré-Condições
- Estar na tela de Checkout com dados preenchidos (CPF simula Score entre 501 e 700).
- Selecionar a opção "Financiamento".
- Entrada menor que 50% do valor do veículo.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Clicar em "Confirmar Pedido" | O sistema invoca a análise de crédito. |
| 2 | Analisar o retorno do sistema na tela de confirmação | O pedido é criado com status "EM_ANALISE". |

#### Resultados Esperados
- Pedido assume status pendente "Em Análise".

#### Critérios de Aceitação
- O cálculo das parcelas do financiamento é exibido ao cliente.

---

### CT06 - Exceção de Aprovação por Entrada Alta (Entrada >= 50%)

#### Objetivo
Validar regra de negócio que aprova financiamento ignorando score baixo caso a entrada seja maior ou igual a 50% do total da compra.

#### Pré-Condições
- Estar na tela de Checkout (CPF simula Score <= 500).
- Selecionar a opção "Financiamento".
- Total da compra: R$ 40.000 (exemplo base).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Inserir no campo "Valor da Entrada" um valor >= R$ 20.000 | O sistema calcula o financiamento restante com as parcelas devidas. |
| 2 | Clicar em "Confirmar Pedido" | O sistema processa a análise e percebe a entrada alta. |
| 3 | Observar o status do pedido na tela final | O sistema define o pedido como "APROVADO", contornando o score. |

#### Resultados Esperados
- Pedido entra com status "Aprovado" instantaneamente devido à entrada substancial, mesmo com score ruim.

#### Critérios de Aceitação
- A lógica de entrada (>= 50%) deve sobrepor a avaliação nominal de score <= 700.

---

### CT07 - Crédito aprovado por Score Alto (Score > 700)

#### Objetivo
Validar aprovação automática para perfil com excelência de crédito.

#### Pré-Condições
- Estar na tela de Checkout (CPF com Score > 700).
- Selecionar a opção "Financiamento".
- Entrada de qualquer valor abaixo de 50%.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Clicar em "Confirmar Pedido" | O sistema aciona o motor de crédito. |
| 2 | Acompanhar o direcionamento | Pedido gerado e tela exibe o status "APROVADO". |

#### Resultados Esperados
- Aprovação limpa pelo score alto.

#### Critérios de Aceitação
- Não deve haver bloqueios de pedido para esse perfil.

---


## Módulo: Consulta de Pedidos

---

### CT08 - Consulta de pedido com sucesso

#### Objetivo
Validar se o cliente consegue consultar o status atual e detalhes de seu pedido utilizando o código identificador.

#### Pré-Condições
- O cliente possui um número de pedido válido (`order_number`).
- Estar na página de "Consulta de Pedidos" (`OrderLookup.tsx`).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Inserir o `order_number` no campo de busca | O botão de busca é ativado. |
| 2 | Clicar no botão "Buscar Pedido" | O sistema exibe um estado de carregamento ("Buscando..."). |
| 3 | Aguardar o processamento | O sistema apresenta um card detalhado com status do pedido, cor escolhida, versão, valor total, tipo de pagamento e dados da loja. |

#### Resultados Esperados
- Exibição de todos os detalhes sensíveis associados apenas mediante fornecimento do código exato do pedido.

#### Critérios de Aceitação
- Os dados exibidos (Nome, Configuração, Status, Pagamento) devem refletir exatamente o que foi salvo na base de dados no Checkout.

---

### CT09 - Consulta de pedido inexistente ou código inválido (Negativo)

#### Objetivo
Garantir que a segurança dos dados está preservada e que o sistema lida corretamente quando dados não são encontrados.

#### Pré-Condições
- Estar na página de "Consulta de Pedidos".
- Possuir um número de pedido falso, aleatório ou vazio.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1 | Deixar o campo vazio e tentar buscar | O botão "Buscar Pedido" fica desabilitado nativamente. |
| 2 | Digitar um número que não existe no banco (ex: "XXX-999") | O botão é habilitado. |
| 3 | Clicar em "Buscar Pedido" | O sistema aciona a API, recebe erro ou null, e exibe o bloco de mensagem: "Pedido não encontrado. Verifique o número do pedido e tente novamente". |

#### Resultados Esperados
- Sistema não deve estourar "crash" de aplicação e deve instruir o usuário de forma amigável sobre o problema.

#### Critérios de Aceitação
- Não haver exposição de dados de terceiros. A tela de erro deve ser clara e legível.
