# *Tindev*: mockup de estudo para a Semana OmniStack 8.0 da [Rocketseat](https://rocketseat.com.br/)

Aplicativo desenvolvido para o aprendizado de [React](https://reactjs.org/) e [ReactNative](https://facebook.github.io/react-native/) (junto com back-end usando [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) e [MongoDB](https://www.mongodb.com/)/[Mongoose](https://mongoosejs.com/)), durante a Semana OmniStack 8.0 da empresa [Rocketseat](https://rocketseat.com.br/). A aplicação mockup se chama "Tindev", um clone do Tinder para conectar desenvolvedores.

## Estrutura do projeto

### Back-End *([Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [Socket.IO](https://socket.io/))*

Servidor rodando com o [Node.js](https://nodejs.org/en/), utilizando [Express](https://expressjs.com/) para gerenciar as rotas server side da API e suas requests/responses, [Mongoose](https://mongoosejs.com/) para gerar os models e se conectar com o banco de dados [MongoDB](https://www.mongodb.com/), e [Socket.IO](https://socket.io/) para enviar e receber mensagens com o client side pela tecnologia de [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

Além disso, foi colocado o mecanismo [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) conectado ao [Express](https://expressjs.com/) no back-end para que as URLs da API server side não fossem acessadas diretamente no browser ou no front-end, exigindo uma uma interface de conexão HTTP no client side para fazer GETs, POSTs, PUTs e DELETEs. A API do back-end foi organizada para que suas rotas e controllers seguissem o padrão RESTful.

O banco de dados [MongoDB](https://www.mongodb.com/) utilizado é uma instância gratuita na nuvem oferecida pelo [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/general/try?jmp=search&utm_source=google&utm_campaign=GS_Americas_Brazil_Search_Brand_Atlas_Desktop&utm_term=mongodb%20atlas&utm_device=c&utm_network=g&utm_medium=cpc_paid_search&utm_matchtype=e&utm_cid=1718986516&utm_asagid=66929795426&utm_adid=335229503988&gclid=CjwKCAjwkqPrBRA3EiwAKdtwkylSfyTvleINl3mqnzBTByiIK8Fl0qHqsxg-uYO47TmbuqGOnRYHvBoCbB8QAvD_BwE), produto DaaS (Database as a Service).

### Front-End *([React](https://reactjs.org/), [axios](https://github.com/axios/axios), [Socket.IO (client)](https://socket.io/))*

(Descrição em breve)

### Mobile *([ReactNative](https://facebook.github.io/react-native/), [axios](https://github.com/axios/axios), [Socket.IO (client)](https://socket.io/))*

(Descrição em breve)
