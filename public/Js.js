document.getElementById('task_form').addEventListener('submit',async function(e) {
    e.preventDefault();

    var task = document.getElementById('inputTask').value;
    const taskList = document.getElementById('task_list');
    
    if(task == "") return;

    // Enviar a nova tarefa para o servidor
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task })
    });

    // Limpar o campo de input após adicionar a tarefa
    document.getElementById('inputTask').value = '';

    // Atualizar a lista de tarefas
    fetchTasks();
});

async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    if (!response.ok) throw new Error('Erro na requisição');
    const tasks = await response.json();

    const taskList = document.getElementById('task_list');
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar as novas tarefas

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        li.className = 'task';
        li.id = 'task' + task.id;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'editButton';
        editBtn.id = 'editButton' + task.id;
        editBtn.addEventListener('click', function(e) {
            e.preventDefault();
            editBtn.disabled = true;
            console.log('Editando tarefa com ID:', task.id);
            const li = document.getElementById('task' + task.id);
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
            saveBtn.id = 'saveButton' + task.id;
            saveBtn.type = 'submit';
            saveBtn.addEventListener('click', async function() {
                const newTask = input.value;
                if(newTask == ""){
                    input.style.border = '3px solid red';
                    input.placeholder = 'Campo obrigatório';
                    return;
                }
                await fetch(`http://localhost:3000/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ task: newTask })
                });
                fetchTasks(); // Atualiza a lista de tarefas após editar
            });
            li.appendChild(saveBtn);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteButton';
        deleteBtn.onclick = async function() {
            await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' });
            fetchTasks(); // Atualiza a lista de tarefas após apagar
        };

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

fetchTasks(); // Carregar as tarefas ao carregar a página