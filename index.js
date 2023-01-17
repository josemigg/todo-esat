const testData = [
    {
        id: 10,
        description: 'Hacer la compra',
        isCompleted: false,
    },
    {
        id: 2,
        description: 'Hacer la cama',
        isCompleted: false,
    },
    {
        id: 28,
        description: 'Hacer el proyecto about me',
        isCompleted: true,
    }
]


function buildTask(task) {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'tasks__task';
    taskContainer.innerHTML = `<input type="checkbox" ${task.isCompleted ? 'checked' : ''} />${task.description}`
    return taskContainer;
}

function renderList(){
    const tasksNode = document.querySelector('#task-list');
    testData.forEach(function (task) {
        const taskHtml = buildTask(task);
        tasksNode.append(taskHtml);
    });
}


renderList();