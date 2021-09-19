### Fontend React para consumir a API de autenticação Rails criada com device-token-auth

O frontend permite:

1. Criar usuários;
2. Receber confirmação por e-mail;
3. Fazer login;
4. Alterar senha baseado em instruções enviadas por e-mail;
5. Alterar informações do usuário;
6. Criar artigos;
7. Visualizar artigos;
8. Editar artigos;
9. Deletar artigos;
10. Fazer logout. 

#### O projeto da API

`$ git clone https://github.com/jkayro/blog-auth-api.git`

#### O projeto do forntend

`$ git clone https://github.com/jkayro/blog-auth-client.git`

`cd blog-auth-client`

`$ yarn install`

#### Projeto em produção

<https://eloquent-austin-a87d15.netlify.app/>


_OBS.: O sistema pode demorar uns 15 segundos para iniciar pois a API fica dormindo no Heroku depois de um tempo sem acesso._

.