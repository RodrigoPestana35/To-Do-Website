const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
app.use(cors());

// Servir ficheiros estáticos da pasta 'public'
app.use(express.static('public'));

let tasks = []; // Array temporário para armazenar as tarefas
let taskId = 1; // ID da tarefa

// Rota para obter todas as tarefas (GET)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para criar uma nova tarefa (POST)
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push({ id: taskId, task: task });
    taskId++;
    res.status(201).json({ message: 'Tarefa adicionada', task });
});

// Rota para apagar uma tarefa (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarefa removida' });
});

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});
