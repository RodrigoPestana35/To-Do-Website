document.getElementById('task_form').addEventListener('submit', function(e) {
    e.preventDefault();

    var task = document.getElementById('task').value;
    const taskList = document.getElementById('task_list');
    
    if(task == "") return;

    var li = document.createElement('li');
    li.textContent = task;
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.style.backgroundColor = 'red';
    deleteButton.style.marginLeft = '10px';
    deleteButton.onclick = function() {
        taskList.removeChild(li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    document.getElementById('task').value = "";
});