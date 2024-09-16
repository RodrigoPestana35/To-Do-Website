const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const Task = require('./Models/Task');
const User = require('./Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
app.use(cors());

// Servir ficheiros estáticos da pasta 'public'
app.use(express.static('public'));

// Middleware para verificar autenticação
const authMidleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try{
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.id;
        next();
    } catch (error) {
        console.log('Erro ao verificar token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// Rota para obter todas as tarefas (GET)
app.get('/tasks', authMidleware, async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.user});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// Rota para criar uma nova tarefa (POST)
app.post('/tasks', authMidleware, async (req, res) => {
    try{
        const newTask = new Task({
            task: req.body.task,
            userId: req.user
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
app.put('/tasks/:id', authMidleware, async (req, res) => {
    try{
        const taskId = req.params.id;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                task: req.body.task,
                edited: true,
                editedAt: Date.now()
            },
            { new: true }
        );
        if(updatedTask){
            res.json({
                id: updatedTask._id,
                task: updatedTask.task,
                concluded: updatedTask.concluded,
                createdAt: updatedTask.createdAt,
                edited: updatedTask.edited,
                editedAt: updatedTask.editedAt,
                concludedAt: updatedTask.concludedAt
            });
            console.log('Tarefa atualizada:', updatedTask);
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
        console.log('Erro ao atualizar tarefa:', error);
    }
});

app.put('/tasks/:id/conclude', authMidleware, async (req, res) => {
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

app.delete('/tasks/:id', authMidleware, async (req, res) => {
    const idTask = req.params.id;
    try{
        const task = await Task.findByIdAndDelete(idTask);
        if (task) {
            res.json({ message: 'Task deleted', task });
            console.log('Tarefa eliminada:', task);
        } else {
            res.status(404).json({ message: 'Task not found' });
            console.log('Tarefa não encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
        console.log('Erro ao eliminar tarefa:', error);
    }
});

// Rota para fazer registo de um novo utilizador (POST)
app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
        user = new User({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json(user);
        console.log('Novo utilizador registado:');
    } catch (error) {
        console.log('Erro ao registar utilizador:', error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// Rota para fazer login (POST)

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.log('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
});

// Rota para terminar sessão (POST)
app.post('/logout', (req, res) => {
    res.json({ message: 'User logged out' });
});

// Iniciar o servidor
const connectDB = require('./db');
connectDB();

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});
