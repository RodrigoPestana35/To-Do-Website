const express = require('express');
const app = express();
const port = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

let tasks = []; // Array temporário para armazenar as tarefas

// Rota para obter todas as tarefas (GET)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Rota para criar uma nova tarefa (POST)
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push({ id: tasks.length + 1, task });
    res.status(201).json({ message: 'Tarefa adicionada', task });
});

// Rota para apagar uma tarefa (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarefa removida' });
});

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});
