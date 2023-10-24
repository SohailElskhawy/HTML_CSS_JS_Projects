let taskNumber = 0;
document.addEventListener('DOMContentLoaded', ()=>{
    const tasksPlaceEl = document.querySelector('.taskPlace');
    const savedTasks = window.localStorage.getItem('tasks');
    if (savedTasks){
        tasksList = savedTasks.split('-');
        tasksList.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';
            taskDiv.id = taskNumber;
            const taskCheckbox = document.createElement('input');
            taskCheckbox.type = 'checkbox';
            const isChecked = localStorage.getItem(`task_${task}`);
            if (isChecked == 'true'){
                taskCheckbox.checked = true;
            }
            taskCheckbox.addEventListener('change', ()=>{
                localStorage.setItem(`task_${task}`, taskCheckbox.checked.toString());
            })
            const taskName = document.createElement('h3');
            taskName.className = 'taskText';
            taskName.innerHTML = task;
            taskName.setAttribute('contenteditable', true)
            const removeButton = document.createElement('button');
            removeButton.innerHTML = 'X';
            removeButton.setAttribute('onclick', `removeTask('${taskDiv.id}')`);
            taskDiv.appendChild(taskCheckbox);
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(removeButton);
            tasksPlaceEl.appendChild(taskDiv);
            document.querySelector('#taskName').value = ''
            taskNumber += 1
        });
    }
    const taskTitleEl = document.querySelector('.tasksTitle');
    taskTitleEl.addEventListener('input', ()=>{
        localStorage.setItem('taskTitle', taskTitleEl.innerHTML);
    });
    taskTitleEl.innerHTML = localStorage.getItem('taskTitle');

});

function addTask(){
    const tasksPlaceEl = document.querySelector('.taskPlace');
    const taskValue = document.querySelector('#taskName').value;
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = taskNumber;
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.addEventListener('change', ()=>{
        localStorage.setItem(`task_${taskValue}`, taskCheckbox.checked.toString());
    })
    const taskName = document.createElement('h3');
    taskName.className = 'taskText';
    taskName.innerHTML = taskValue;
    taskName.setAttribute('contenteditable', true)
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'X';
    removeButton.setAttribute('onclick', `removeTask('${taskDiv.id}')`);
    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskName);
    taskDiv.appendChild(removeButton);
    tasksPlaceEl.appendChild(taskDiv);
    document.querySelector('#taskName').value = ''
    taskNumber += 1
    saveTasks();
}


function removeTask(task){
    const tasksPlaceEl = document.querySelector('.taskPlace');
    const taskDivs = tasksPlaceEl.querySelectorAll('.task');
    for (let i = 0; i < taskDivs.length; i++) {
        if (taskDivs[i].id == task){
            tasksPlaceEl.removeChild(taskDivs[i]);
        }
    }
    saveTasks();
}


function saveTasks(){
    const allTasksEl = document.querySelectorAll('.taskText');
    const tasksList = [];
    for (let i = 0; i<allTasksEl.length; i++){
        if (!tasksList.includes(allTasksEl[i].innerHTML)){
            tasksList.push(allTasksEl[i].innerHTML);
        }
    }
    const tasksString = tasksList.join('-');
    window.localStorage.setItem('tasks', tasksString)
}