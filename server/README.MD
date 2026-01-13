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