# API Challenge

## Users

### Create

Criar um usuário.

`POST http://desafio.com/v1/users`

```
body: {
  name: Fulano da Silva,
  email: f.silva@domain.com,
  password: 1234
}
```

## Resposta

```
  201 - Criado com sucesso
  400 - Erro na validação do conteúdo do body
  500 - Algum erro desconhecido do servidor
```

### Auth

Autenticar um usuário.

`POST http://desafio.com/v1/users/auth`

```
body: {
  email: f.silva@domain.com,
  password: 1234
}
```

## Resposta

```
  200 - Autenticado com sucesso
  401 - Usuário/Senha incorretos
  422 - Erro na validação do conteúdo do body
  500 - Algum erro desconhecido do servidor
```

## Leads

### Create

Criar um lead.

`POST http://desafio.com/v1/leads`

```
headers: {
  Authorization: Bearer <JWT Token> (ou methodo de login que preferir)
},
body: {
  name: String,
  email?: String,
  phone: String,
  message?: String,
}
```

## Resposta

```
  201 - Criado com sucesso
  401 - Usuário com o token inválido
  422 - Erro na validação do conteúdo do body
  500 - Algum erro desconhecido do servidor
```

### Update

Atualizar o lead.

`PATCH http://desafio.com/v1/leads/:id`

```
headers: {
  Authorization: Bearer <JWT Token> (ou methodo de login que preferir)
}
params: {
  id: String (id do lead a ser modificado)
},
body: {
  name?: String,
  email?: String,
  phone?: String,
  message?: String,
}
```

## Resposta

```
  204 - Modificado com sucesso e sem conteudo de resposta
  401 - Usuário com o token inválido
  422 - Erro na validação do conteúdo do body
  500 - Algum erro desconhecido do servidor
```

### Delete

Deletar um lead.

`DELETE http://desafio.com/v1/leads/:id`

```
headers: {
  Authorization: Bearer <JWT Token> (ou methodo de login que preferir)
}
params: {
  id: String (id do lead a ser deletado)
}
```

## Resposta

```
  204 - Deletado com sucesso e sem conteudo na resposta
  401 - Usuário com o token inválido
  422 - Erro na validação do conteúdo do body
  500 - Algum erro desconhecido do servidor
```

### Get All

Pegar todos os leads.

`GET http://desafio.com/v1/leads`

```
headers: {
  Authorization: Bearer <JWT Token> (ou methodo de login que preferir)
}
params: {
  id: String (id do lead a ser deletado)
}
```

```
  200 - Dados carregados com sucesso
  401 - Usuário com o token inválido
  500 - Algum erro desconhecido do servidor
```
