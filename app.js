const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const Task = require('./Models/Task');

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
app.use(cors());

// Servir ficheiros estáticos da pasta 'public'
app.use(express.static('public'));

let tasks = []; // Array temporário para armazenar as tarefas
let taskId = 1; // ID da tarefa

// Rota para obter todas as tarefas (GET)
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
        console.log('Tarefas:', tasks);
    } catch (error) {
        console.log('Erro ao buscar tarefas:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// Rota para criar uma nova tarefa (POST)
app.post('/tasks',async (req, res) => {
    try{
        const newTask = new Task({
            task: req.body.task
        });
        await newTask.save();
        res.status(201).json(newTask);
        console.log('Nova tarefa adicionada:', newTask);
    } catch (error) {
        console.log('Erro ao adicionar tarefa:', error);
        res.status(500).json({ message: 'Failed to add task' });
    }
});

//Rota para atualizar uma tarefa (PUT)
app.put('/tasks/:id', (req, res) => {
    try{
        const updatedTask = Task.findByIdAndUpdate(
            req.params.id,
            {
                task: req.body.task,
                edited: true,
                editedAt: Date.now()
            },
            { new: true }
        );
        res.json(updatedTask);
        console.log('Tarefa atualizada:', updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
        console.log('Erro ao atualizar tarefa:', error);
    }
});

app.put('/tasks/:id/conclude',async (req, res) => {
    const idTask = req.params.id;
    try{
        const task = await Task.findById(idTask);
        if (task) {
            task.concluded = true;
            task.concludedAt = Date.now();
            await task.save();
            res.json({ message: 'Task concluded', task });
            console.log('Tarefa concluída:', task);
        } else {
            res.status(404).json({ message: 'Task not found' });
            console.log('Tarefa não encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to conclude task' });
        console.log('Erro ao concluir tarefa:', error);
    }
});

// Iniciar o servidor
const connectDB = require('./db');
connectDB();

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});
