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

function renderList(filterToApply){ // filterToApply puede ser active, completed, all
    const tasksNode = document.querySelector('#task-list');
    tasksNode.innerHTML = '';

    let tasksToShow = testData;

    if(filterToApply === 'active') {
        tasksToShow = testData.filter(function(task) {
           return !task.isCompleted;
        });
    }

    if(filterToApply === 'completed') {
        tasksToShow = testData.filter(function(task) {
            return task.isCompleted;
        });
    }


    tasksToShow.forEach(function (task) {
        const taskHtml = buildTask(task);
        tasksNode.append(taskHtml);
    });
}



const formNode = document.querySelector('#add-task');
formNode.addEventListener('submit', function (event){
    event.preventDefault();
    const description = document.forms['add-task']['description'].value;
    const newTask = {
        id: new Date().getTime(),
        isCompleted: false,
        description,
    }
    const taskHtml = buildTask(newTask);
    const tasksNode = document.querySelector('#task-list');
    tasksNode.append(taskHtml);
    formNode.reset();
});

renderList();



// Filters 
const filterButtons = document.querySelectorAll('.filter__option');
filterButtons.forEach(function(filterButton){
    filterButton.addEventListener('click', function(){
        const filterToApply = this.getAttribute('data-filter');
        renderList(filterToApply);
    });
})


