# API REST task
API REST desenvolvida para realizar desafio do curso da rocketseat, no caso ja tinha um projeto exatamente similar a unica feature nova foi a importação de um CSV

Obs: Foi criado somente o ambiente de desenvolvimento

## Importante
Para iniciar a aplicação é necessário ter o Docker instalado em sua máquina (utilizando a versão 24.0.7 ou a mais recente)
Para o funcionamento correto da aplicação é necessário definir um arquivo .env com todas as variaveis de ambiente definidas no arquivo de exemplo .env.aplicacao

Para realizar login na aplicação após executar a aplicação em ambiente de desenvolvimento temos o seguinte usuário
```sh

Usuário: 960680153277@gmail.com
senha: 123456

```

Para instalar as dependencias execute o comando:
```sh
npm install
```

Iniciar a aplicação em ambiente de desenvolvimento (antes de rodar o comando certifique-se que esta com o docker instalado e iniciado). Ao iniciar o comando será criado as devidas configurações e iniciados os testes em memória necessários para a execução da aplicação

Segui estes passos para antes de executar a aplicação
- [x] mata a porta 3333 (caso esteja sendo utilizado em outra aplicação da sua maquina)
- [x] executa o docker
- [x] cria o bd
- [x] criar o conteudo de bd
- [x] criar os dados necessarios para os testes
- [x] executar testes unitarios
- [x] executar testes end two end (como são poucos testes end two end opitei por executar também ao iniciar a aplicação em desenvolvimento)
- [x] executar a aplicação

```sh
npm run dev
```


## Testes

Para iniciar os Testes Unitários
```sh
npm run test
```

Parta iniciar os Testes end two end
```sh
npm run test:e2e
```

Para iniciar os Testes Unitários e os Testes end two end com uma interface
```sh
npm run test:ui
```

## Requisitos funcionais
- [X] Usuário deve criar task
- [X] Usuário deve editar task
- [X] Usuário deve remover task
- [X] Usuário deve concluir uma task
- [X] Usuário deve logar na aplicação

## Requisitos não funcionais
- [X] A senha de todos os usuários devem estar criptografada
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [X] Todos os usuários devem ser identificado por um JWT (JSON Web Token)


## Ferramentas utilizadas no projeto

- fastify (utilizado no servidor)
- fastify JWT (utilizado para validação de json web token)
- fastify cors (não necessário neste caso, mas utilizado mesmo assim)
- zod (utilizado para validação de campos)
- bcryptjs (utilizado para criptografar senhas)
- kill port (para matar porta, caso esteja sendo usada locamente)
- vitest (utilizado para testes unitários)
- supertest (utilizado para testes end two end)
- prisma (utilizado como ORM)