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
        body: JSON.stringify({ task: taskInput })
    });

    // Limpar o campo de input após adicionar a tarefa
    document.getElementById('task-input').value = '';

    // Atualizar a lista de tarefas
    fetchTasks();
});

async function fetchTasks() {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar as novas tarefas

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';
        deleteBtn.onclick = async function() {
            await fetch(`http://localhost:3000/tasks/${task.id}`, { method: 'DELETE' });
            fetchTasks(); // Atualiza a lista de tarefas após apagar
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}