# To-Do List Web App

Este é um aplicativo web de lista de tarefas construído com Node.js, Express, e MongoDB. Ele permite que os usuários criem, editem e excluam tarefas, além de autenticar usuários usando JWT.

## Dependências

- **Node.js**: Ambiente de execução para o servidor.
- **Express**: Framework para construção do back-end.
- **Mongoose**: ODM para interagir com MongoDB.
- **JWT**: Para autenticação de utilizador.
- **Cors**: Para lidar com problemas de Cross-Origin Resource Sharing.
- **Body-parser**: Para parsing de requisições HTTP.

Para instalar todas as dependências necessárias, execute o seguinte comando:

```sh
npm install

Estrutura do Projeto
├── public
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── Models
│   ├── Task.js
│   └── User.js
├── app.js
├── db.js
├── .gitignore
├── package.json
└── README.md
public/: Contém os ficheiros do front-end.
models/: Contém os modelos da base de dados (ex. Task.js).
Como Executar
Clonar o repositório
git clone https://github.com/teu-repositorio/to-do-list-web-app.git
Configurar o Banco de Dados
Certifique-se de ter o MongoDB instalado e em execução. Crie um arquivo .env na raiz do projeto e adicione a string de conexão do MongoDB:
<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>###</vscode_annotation> Iniciar o Servidor
npm start
O servidor estará em execução em http://localhost:3000.

Endpoints da API
Autenticação
POST /register: Registra um novo usuário.
POST /login: Autentica um usuário e retorna um token JWT.
Tarefas
GET /tasks: Retorna todas as tarefas do usuário autenticado.
POST /tasks: Cria uma nova tarefa.
PUT /tasks/:id: Atualiza uma tarefa existente.
DELETE /tasks/:id: Exclui uma tarefa.
Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -am 'Adiciona nova feature').
Faça o push para a branch (git push origin feature/nova-feature).
Crie um novo Pull Request.
Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.