To-Do List Web App
Descrição
Esta é uma aplicação web simples de lista de tarefas (To-Do List), onde os utilizadores podem criar, visualizar, editar, e marcar tarefas como concluídas. O objetivo do projeto é fornecer uma interface clara e intuitiva para gerir tarefas do dia a dia, com funcionalidades de autenticação de utilizador e persistência de dados em um banco de dados.

O projeto foi desenvolvido com foco em gaming e programação e visa ser escalável e sustentável a longo prazo.

Funcionalidades
Adicionar, visualizar e remover tarefas.
Marcar tarefas como concluídas, diferenciando visualmente as completas das pendentes.
Persistência de tarefas usando uma base de dados.
Filtros para tarefas concluídas e não concluídas.
Autenticação de utilizador com login e registo, utilizando JWT.
Responsivo, adaptando-se a diferentes tamanhos de ecrãs sem barras de rolagem.
Tecnologias Utilizadas
Front-End:
HTML5, CSS3, JavaScript
AJAX / Fetch API para comunicação com o back-end
Back-End:
Node.js com Express (ou Flask, dependendo da implementação)
MongoDB para persistência de dados
Autenticação:
JSON Web Tokens (JWT)
Banco de Dados:
MongoDB Atlas (via Mongoose)
Controle de Versão:
Git e GitHub
Dependências
Node.js: Ambiente de execução para o servidor.
Express: Framework para construção do back-end.
Mongoose: ODM para interagir com MongoDB.
JWT: Para autenticação de utilizador.
Cors: Para lidar com problemas de Cross-Origin Resource Sharing.
Body-parser: Para parsing de requisições HTTP.
Para instalar todas as dependências necessárias, corre o seguinte comando:

bash
Copiar código
npm install
Estrutura do Projeto
plaintext
Copiar código
├── public
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server
│   ├── app.js
│   ├── models
│   │   └── Task.js
│   └── routes
│       └── tasks.js
├── .gitignore
├── package.json
└── README.md
public/: Contém os ficheiros do front-end.
server/: Contém o código do servidor (back-end).
models/: Contém os modelos da base de dados (ex. Task.js).
routes/: Contém as rotas para a API (ex. tasks.js).
Como Executar
Clonar o repositório:
bash
Copiar código
git clone https://github.com/teu-repositorio/to-do-list-web-app.git
Instalar as dependências:
bash
Copiar código
npm install
Iniciar o servidor:
bash
Copiar código
npm start
Aceder à aplicação no browser:
arduino
Copiar código
http://localhost:3000
Melhorias Futuras
Adicionar suporte para múltiplos utilizadores com diferentes listas de tarefas.
Integração com notificações push para lembrar tarefas.
Melhorias na segurança, incluindo hashing de senhas e CSRF protection.
Contribuições
Sinta-se à vontade para abrir uma issue ou enviar um pull request com melhorias e sugestões.