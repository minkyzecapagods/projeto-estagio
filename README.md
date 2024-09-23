# Chatbot e Validação de Documentos

Este projeto implementa um chatbot interativo e funcionalidades de validação de documentos (CPF, CNPJ, CEP) usando APIs externas.

## Estrutura do Projeto

### 1. HTML

- **Estrutura Básica**:
  - container principal para o chatbot.
  - Área de entrada para mensagens do usuário.
  - Elementos para exibir mensagens enviadas e recebidas.

### 2. CSS

- **Estilização**:
  - Estilos para o container do chatbot.
  - Estilização de mensagens de entrada e saída.
  - Animações para transições visuais.

### 3. JavaScript

#### Elementos do DOM

- Seleção de entradas de chat, botão de envio e chatbox.

#### Funções

1. **createChatLi(message, className)**:
   - Cria um item de chat (mensagem) e o adiciona à lista de mensagens.
   - Recebe a mensagem e a classe (outgoing ou incoming) como parâmetros.

2. **generateResponse(incomingChatLi)**:
   - Envia a mensagem do usuário para a API OpenAI e exibe a resposta.
   - Atualiza o conteúdo da mensagem após receber a resposta.

3. **handleChat()**:
   - Processa a entrada do usuário, adiciona a mensagem à lista e inicia o processo de geração de resposta.
   - Reseta o campo de entrada após o envio.

4. **CNPJValido(cnpj)**:
   - Valida um CNPJ.
   - Verifica o tamanho e os dígitos verificadores.

5. **CPFValido(cpf)**:
   - Valida um CPF.
   - Checa se o CPF possui 11 dígitos e se não contém sequências iguais.

6. **CPFormat(cpf)**:
   - Formata um CPF para o padrão `XXX.XXX.XXX-XX`.

7. **CEPFormat(cep)**:
   - Formata um CEP para o padrão `XXXXX-XXX`.

8. **invalidarCampo(elementoInvalido)**:
   - Adiciona uma classe de erro a um campo de entrada inválido.

9. **CEPAuto(cep, esp, elemento)**:
   - Realiza uma busca automática de endereço com base no CEP.
   - Preenche os campos de endereço se o CEP for válido.

10. **CNPJFormat(cnpj)**:
    - Formata um CNPJ para o padrão `XX.XXX.XXX/0001-XX`.

11. **IEFormat(ie)**:
    - Formata uma Inscrição Estadual (IE) para um padrão específico.

12. **CNPJAuto(valor)**:
    - Busca informações de uma empresa usando o CNPJ.
    - Preenche os campos de informações da empresa se o CNPJ for válido.

13. **telFormat(tel)**:
    - Formata um número de telefone para o padrão `(XX) XXXXX-XXXX`.

14. **selectOnlyThis(id)**:
    - Seleciona apenas uma opção de checkbox entre várias.

#### Eventos

- Escuta eventos de entrada para aplicar formatações e validações.
- Controla a exibição de campos dependendo das seleções (ex: classificação, registro).

#### Formulário

- Comportamento ao botão de envio e reset do formulário ao submeter.

## Como Usar

1. Clone este repositório.
2. Abra o arquivo `index.html` em um navegador.
3. Interaja com o chatbot e utilize as funcionalidades de validação de documentos.