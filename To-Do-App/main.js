let taskNumber = 0;
function addTask(){
    const tasksPlaceEl = document.querySelector('.taskPlace');
    const taskValue = document.querySelector('#taskName').value;
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.id = taskNumber;
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
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
}


function removeTask(task){
    const tasksPlaceEl = document.querySelector('.taskPlace');
    const taskDivs = tasksPlaceEl.querySelectorAll('.task');
    for (let i = 0; i < taskDivs.length; i++) {
        if (taskDivs[i].id == task){
            tasksPlaceEl.removeChild(taskDivs[i]);
        }
    }
}
