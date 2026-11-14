# API Cifra de Vernan

Integrantes: João Victor Yudi Mizuno

Matéria: Segurança da Informação

Orientador: Daniel Cintra Cugler

IFSP Campus Boituva

## Descrição do Projeto

Este projeto é um trabalho realizado para a matéria de Segurança da Informação, que foi requisitada uma API RESTfull que pudesse criptografar e decriptografar mensagem por meio da Cifra de Vernam.

### Tecnologias Utilizadas

- Linguagem: TypeScript
- BackEnd: Node.js + Express
- Hospedagem da API: Render - Disponível no link: [https://ci-cifra-vernan.onrender.com](https://ci-cifra-vernan.onrender.com)
- Documentação das Rotas: Swagger - Disponível no link: [https://ci-cifra-vernan.onrender.com/api-docs](https://ci-cifra-vernan.onrender.com/api-docs)

## Como funciona?

A API aplica a Cifra de Vernam e converte a mensagem em binário com uma chave, e vice versa. As etapas do métodos por trás da API são:

1. Ao receber a mensagem, cada caractere do texto e da chave é convertido para seu código da tabela ASCII, em **8 bits**.
2. Aplica-se o XOR (OU exclusivo) bit a bit entre cada caractere do texto e o caractere correspondente da chave.
3. O resultado é a sequência de bits cifrada.

```
O resultado da mensagem criptografada não é entregue em texto, pois, ao realizar a aplicação do XOR, alguns caracteres são convertidos para outros que não são ilustraveis no campo de texto!
```

## Como utilizar

A API pode ser utilizada de forma:

- Remota - Pelo link do Render: [https://ci-cifra-vernan.onrender.com](https://ci-cifra-vernan.onrender.com)
- Local, sendo necessário baixar o repositório e realizar o passo a passo abaixo

1. Garantir que o node.js esteja instalado:

```
    node -v
```

- Se ele não estiver instalado, ele pode ser instalado neste link: [https://nodejs.org/pt-br](https://nodejs.org/pt-br)

2. Baixar as depedências do projeto:

```
    npm install
```

Após isso, a API estará rodando na porta 80, o localhost, o próprio terminal fornecerá o link da API: [http:localhost:80](http:localhost:80)

---

### Rotas da API

### `POST /cifrar`

Cifra uma mensagem e retorna o resultado em **binário (8 bits por caractere)**.

**Requisição [JSON]**

```json
{
  "textoClaro": "Mensagem",
  "chave": "abcdefgh"
}
```

**Resposta (200) [JSON]**

```json
{
  "texto": "0010110000000111000011010001011100000100000000010000001000000101"
}
```

---

### `POST /decifrar`

Recebe a mensagem cifrada em binário e retorna o texto original.

**Requisição [JSON]**

```json
{
  "textoCifrado": "0010110000000111000011010001011100000100000000010000001000000101",
  "chave": "abcdefgh"
}
```

**Resposta (200) [JSON]**

```json
{
  "texto": "Mensagem"
}
```