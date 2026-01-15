Fluxo de autenticação



AuthController
Usuario cadastra -> Faz registro e retorna token para o client


Usuario loga -> POST - Autentica e retorna token por cookie

Usuario desloga -> POST - Invalida o token


POST - register
    email: String
    name: String
    password: String
    active: bool
    id: String uuid


PUT - update
    email: String
    login: String
    name: String
    password: String
    active: bool
    id: String uuid

POST - refresh-token
    accessToken: String JWT


TaskController
POST - add
    idUser: String uuid - Param
    id: String uuid
    title: String
    description: String
    finished: boolean
    created_at: Date

PUT - update
    idUser: String uuid - Param verificar
    id: String uuid - Param verificar
    title: String
    description: String
    finished: boolean
    created_at: Date

DELETE - delete - Param: id_task

GET - id - Param: id_user

GET - description - Param: description


GET - Date - Param: Date 



ORDEM PRISMA

npx prisma migrate dev --name init db

npx prisma generate



MELHORAR TIPOS e adaptar tipos para o prisma, melhorar a arquitetura dos repositories inmemory/prisma





## Autenticação

Vamos entender melhor como esta nosso fluxo de autenticação do sistema

Primeiro o usuário se cadastra no nosso sistema client envia os dados -> backend gera token e accessToken valida os dados -> salva informações no banco de dados
-> backend adiciona o refreshToken como um cookie httpOnly e retorna o accessToken e os dados publicos do usuario para o client;


Melhora para o futuro -> Implementar refresh token no banco de dados

Melhorar a porra do tratamento de erros