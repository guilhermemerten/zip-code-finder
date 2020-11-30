
# Zip Code Finder

Esse projeto tem como objetivo implementar uma API REST para consultas de CEPs.
Dado determinado CEP, caso seja encontrado, irá retornar a **rua**, **bairro**, **cidade**, **estado** e **CEP**.

## Tecnologias e requisitos
No desenvolvimento foram utilizados as seguintes tecnologias:

 - **Node.js** e **Typescript** e suas libs.
 - **MySql**
 - **Docker** e **Docker Compose** 

Foi utilizado o Node.js e Typescript por ser a tecnologia que tenho tido mais contato ultimamente.

Como banco de dados foi escolhido o MySQL, para experimentar a parte de ORM com Node.js, nesse banco são armazenados os CEPs e os Usuários.

Para instalação e configuração da aplicação e do ambiente utilizei o Docker (para build da imagem da API) e o Docker Compose para rodar a API e o MySQL.

## Arquitetura e padrões de código

Nesse projeto foi seguido o padrão de Clean Architecture, desacoplando o máximo possível as camadas com um código seguindo os padrões SOLID.

O projeto é dividido nas seguintes camadas:

**Infra:** Essa é a camada mais externa da aplicação, é aonde são incluídas as dependências de libs e frameworks. 

Essa camada é responsável pelo funcionamento do programa, implementando o servidor e os componentes que dependem de alguma lib ou framework.

**Domain:** Nessa camada ficam as regras de negócios (**use cases**) e os objetos de negócios (**entities**), os use cases comunicam-se com a camada externa através de **gateways** que são interfaces (contratos) que devem ser respeitados.

A implementação dos gateways, chamados de **adapters**, ficam na camada de **infra** e através da *injeção de dependências* são passados para o **use case** no construtor.

**Controllers:** Essa camada é responsável por receber um request executar um ou mais use cases e montar o response.

Cada controller possui apenas uma responsabilidade, e são executados através do método **handle**. 

São instanciados através de uma factory implementada na camada de infra, essa factory realiza a injeção dos adapters necessários para o controller.

![Architecture](docs/architecture.png?raw=true)

No código foram os usados os padrões para nomenclatura:
**kebab-case**: nome dos arquivos .ts, json, js, etc...
**cameCase**: nome de variáveis e constantes no typescript.
**PascalCase**: nome de Classes e Interfaces.

Por convenção procurei deixar o código em **inglês**, porém a documentação em **português**.

## Instalação

**Docker**
É necessário ter o **Docker** e o **Docker Compose** instalado na máquina, após isso acessar a raiz do projeto e executar os seguintes comandos:

    docker build --no-cache --rm -f Dockerfile -t zip-code-finder . 
    docker tag zip-code-finder zip-code-finder:1.0.0
    docker-compose up

Os comandos acima irão gerar uma imagem docker da API com a tag 1.0.0 e subir ela e o banco MySQL com o compose.

Recomendo sempre que for subir o compose, antes rodar o comando 
`docker-compose down 
  `
Isso irá limpar os containers do MySQL e da API.

**Local**

É necessário ter o **Node.js**, o gerenciador de pacotes **NPM**, o **Docker** e **Docker Compose** instalados.
Remover o serviço zip-code-finder do arquivo **docker-compose.yml* na raiz do projeto e executar:

    docker-compose up
    npm install
    npm run build
    npm run start:dev

## Acessando a API

A API possui os seguintes endpoints:

**(POST) /user/auth**

Endpoint responsável por autenticar o usuário e gerar um token JWT necessário para realizar a consulta de CEP. Esse token tem o tempo de expiração de **5 minutos**.

É necessário passar no body da requisição o **userName** e **password**. 

A API consulta o usuário e o password informado na tabela **user** do MySQL.  Ao subir o MySQL é inserido o usuário **user**, com a senha **password** para testes. 
Esses dados e os dados dos ceps podem ser encontrados e alterados no arquivo **sql/init.sql**.
Para criptografar a senha do usuário foi utilizado o bcrypt com um salt de 10 (  **bcrypt.hashSync('password', 10)** )

**(GET)/zipcode/find/:CEP**

Endpoint responsável por realizar a busca do CEP informado. 

O CEP deve ser informado no **formato de apenas números** no **path** da requisição. 

Também é necessário passar o token jwt, gerado através da api acima, no header **x-access-token**.

Caso não seja encontrado o CEP informado, é feita a tentativa de buscar os ceps similares substituindo os numeros da esquerda para direita por 0, até ficar apenas o 1 dígito. 

Por exemplo: 
É informado o CEP **99567-999**. Se esse não for encontrado, é tentado buscar os seguintes CEPs, nessa prioridade: **99567-990, 99567-900, 99567-000, 99560-000, 99500-000, 99000-000 e 90000-000**.

Assim como o usuário, os CEPs são mocados e inseridos no banco MySQL ao criar o container, os dados de mock ficam no arquivo **init.sql** dentro da pasta **sql** do projeto. 

**(GET)/swagger**
Essa rota expõem uma interface para o Swagger da API.

**(GET)/healthcheck**
Essa rota expõem um endpoint para verificar a saúde da aplicação. Se estiver rodando, irá retornar um código http 200.

**(GET)/statistics**
Essa rota expõem um endpoint para retornar dados referentes às estatísticas de consumo da API, como consumo de memória e processamento.

## Testes

Foram criados testes unitários e end2end para o projeto. 
Para executá-los é preciso ter o Node 10 e o pacote NPM instalado na máquina.
Acessar a raiz do projeto e executar os comandos via terminal:

    npm install
    npm run test

Serão exibidos os resultados no terminal, também será gerado um relatório de coverage na pasta **coverage** na raiz do projeto.

## Como funciona uma requisição web?

Ao acessar um site na web, como por exemplo: http://www.netshoes.com.br ocorre o seguinte fluxo:

 - O browser solicita o IP do endereço digitado para um servidor DNS.
 - O browser com esse endereço IP e a porta digitada (default 80 para http e 443 para https) tenta estabelecer uma conexão TCP com o servidor.
 - Ao estabelecer a conexão é feita uma requisição HTTP solicitando a página do endereço digitado.
 - O servidor responde o conteúdo, geralmente HTML, o browser renderiza-o na tela para o usuário.
 - Com o HTML renderizado em tela, outras requisições são realizadas para solicitar assets e dados, como css, imagens, pdfs e dados de apis.
