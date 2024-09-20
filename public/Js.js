const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'registerAndLogin.html';
}

document.getElementById('task_form').addEventListener('submit', async function (e) {
    e.preventDefault();

    var task = document.getElementById('inputTask').value;
    const taskList = document.getElementById('task_list');

    if (task == "") return;

    // Enviar a nova tarefa para o servidor
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify({ task: task })
    });

    if (response.ok) {
        // Limpar o campo de input após adicionar a tarefa
        document.getElementById('inputTask').value = '';
        // Atualizar a lista de tarefas
        fetchTasks();
    } else {
        console.error('Erro ao adicionar tarefa:', response);
    }
});

async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks', {
        headers: {
            'x-auth-token': token
        }
    });
    const tasks = await response.json();
    console.log('TAREFAS AQUI:', tasks);

    const taskList = document.getElementById('task_list');
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar as novas tarefas

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        li.className = task.concluded ? 'concludedTask' : 'task';
        li.id = 'task' + task._id;

        if (!task.concluded) {
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'editButton';
            editBtn.id = 'editButton' + task._id;
            editBtn.addEventListener('click', function (e) {
                e.preventDefault();
                editBtn.disabled = true;
                console.log('Editando tarefa com ID:', task._id);
                const li = document.getElementById('task' + task._id);
                li.innerHTML = '';
                const input = document.createElement('input');
                input.type = 'text';
                input.value = task.task;
                input.className = 'inputTask';
                input.reaquired = true;
                li.appendChild(input);
                const saveBtn = document.createElement('button');
                saveBtn.textContent = 'Save';
                saveBtn.className = 'editButton';
                saveBtn.id = 'saveButton' + task._id;
                saveBtn.type = 'submit';
                saveBtn.addEventListener('click', async function () {
                    const newTask = input.value;
                    if (newTask == "") {
                        input.style.border = '3px solid red';
                        input.placeholder = 'Campo obrigatório';
                        return;
                    }
                    await fetch(`http://localhost:3000/tasks/${task._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': token
                        },
                        body: JSON.stringify({ task: newTask })
                    });
                    fetchTasks(); // Atualiza a lista de tarefas após editar
                });
                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.className = 'editButton';
                cancelBtn.id = 'cancelButton' + task._id;
                cancelBtn.addEventListener('click', function () {
                    fetchTasks();
                });
                li.appendChild(saveBtn);
                li.appendChild(cancelBtn);
            });

            const concludeBtn = document.createElement('button');
            concludeBtn.textContent = 'Conclude';
            concludeBtn.className = 'deleteButton';
            concludeBtn.onclick = async function () {
                await fetch(`http://localhost:3000/tasks/${task._id}/conclude`, { 
                    method: 'PUT',
                    headers: {
                        'x-auth-token': token
                    }
                 });
                fetchTasks(); // Atualiza a lista de tarefas após apagar
            };

            if(task.edited){
                const editedAt = new Date(task.editedAt);
                const editedAtString = editedAt.toLocaleString();
                const p = document.createElement('p');
                p.textContent = `Edited at: ${editedAtString}`;
                li.appendChild(p);
            }

            li.appendChild(editBtn);
            li.appendChild(concludeBtn);
        } else {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'deleteButton';
            deleteBtn.onclick = async function () {
                await fetch(`http://localhost:3000/tasks/${task._id}`, { 
                    method: 'DELETE',
                    headers: {
                        'x-auth-token': token
                    }
                });
                fetchTasks(); // Atualiza a lista de tarefas após apagar
            };
            li.appendChild(deleteBtn);
        }
        taskList.appendChild(li);
    });
}

document.getElementById('logoutButton').addEventListener('click', function () {
    localStorage.removeItem('token');
    window.location.href = 'registerAndLogin.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'registerAndLogin.html';
    }
})

fetchTasks(); // Carregar as tarefas ao carregar a página