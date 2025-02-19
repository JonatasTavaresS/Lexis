# 📚 Lexis 

Lexis é um sistema de gerenciamento de bibliotecas desenvolvido com **Express** e **TypeScript**. O sistema permite a gestão de livros, usuários e empréstimos, facilitando a administração e controle das bibliotecas.

## ⬇️ Clonando o repositório
Você pode baixar ou clonar o projeto de duas formas:

- **Usando Git**
  ```sh
  git clone git@github.com:JonatasTavaresS/Lexis.git
  ```

- **Usando GitHub CLI**
  ```sh
  gh repo clone JonatasTavaresS/Lexis
  ```

> 💡 *Ou baixe o arquivo ZIP diretamente pelo GitHub e extraia no seu computador.*

## ⚙️ Requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/pt/download) (v14 ou superior)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com)

## 🌱 Configuração do Ambiente

1. **Criar o Arquivo `.env` a Partir do Arquivo `.env.template` 📝**

    Antes de iniciar o projeto, você precisa configurar as credenciais do banco de dados e outras variáveis de ambiente. Para fazer isso, siga os passos abaixo:

    Navegue até a pasta do projeto:
    ```sh
    cd Lexis/backend
    ```

    Crie o arquivo `.env` com base no `.env.template`:
    ```sh
    cp .env.template .env
    ```

    Abra o arquivo `.env` e edite com as suas credenciais do banco de dados MySQL e outras variáveis necessárias:
    ```sh
    nano .env
    ```

    Exemplo de conteúdo do `.env` para MySQL:
    ```ini
    DB_DIALECT=mysql
    DB_NAME=lexis_db
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=myuser
    DB_PASSWORD=mypassword
    ```

2. **Instalar as Dependências 🔧**
    ```sh
    npm install
    ```

3. **Inicie o Servidor 🌍**
    ```sh
    npm run dev
    ```
    O servidor estará disponível em [localhost:3000](http://localhost:3000).

## 🦭 Subindo o Projeto com Podman

Se você prefere usar o Podman para rodar o projeto em um contêiner, siga as instruções abaixo.

1. **Instalar o Podman ✅**

    Siga as intruções de instalaão na página oficial do [Podman](https://podman.io/docs/installation) de acordo com o seu sistema operacional.

2. **Construir a Imagem do Contêiner 🔄**

    Navegue até a pasta do backend e construa a imagem do contêiner com o Podman:
    ```sh
    cd Lexis/backend
    podman build -t lexis-backend .
    ```

3. **Subir o contêiner 🆙**

    Após a imagem ser construída, rode o contêiner com o Podman:
    ```sh
    podman run -p 3000:3000 lexis-backend
    ```
    Isso vai fazer o contêiner rodar no [localhost:3000](http://localhost:3000).

## 📊 Documentação da API

A documentação da API está disponível através do *Swagger* em:
- http://localhost:3000/api-docs
