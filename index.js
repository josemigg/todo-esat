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


function buildTask(task, includeDeleteButton) {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'tasks__task';
    taskContainer.innerHTML = `<input type="checkbox" ${task.isCompleted ? 'checked' : ''} />${task.description}`
    console.log(includeDeleteButton)
    if(includeDeleteButton){
        taskContainer.innerHTML+= '<button type="button" class="delete">Borrar</button>';

        const deleteNode = taskContainer.querySelector('[type="button"]');
        deleteNode.addEventListener('click',function(){
            taskContainer.remove();
        });
    }

    const checkboxNode = taskContainer.querySelector('[type="checkbox"]');
    checkboxNode.addEventListener('click', function(){
        const index = testData.findIndex(function(taskInArray){
            return taskInArray.id === task.id;
        });
        
        const taskToChange =  testData[index];
        taskToChange.isCompleted = !taskToChange.isCompleted;
    });
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
        const taskHtml = buildTask(task, filterToApply === 'completed');
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
    testData.push(newTask);
    const taskHtml = buildTask(newTask);
    const tasksNode = document.querySelector('#task-list');
    tasksNode.append(taskHtml);
    formNode.reset();
});




// Filters 
const filterButtons = document.querySelectorAll('.filter__option');
const filterActiveClass = 'filter__option--selected';
filterButtons.forEach(function(filterButton){
    filterButton.addEventListener('click', function() {
        if(this.classList.contains(filterActiveClass)){
            return;
        }

        const filterToApply = this.getAttribute('data-filter');
        renderList(filterToApply);

        // remove class 
        document.querySelector(`.${filterActiveClass}`).classList.remove(filterActiveClass)
        this.classList.add(filterActiveClass);

        if(filterToApply === 'completed'){
            document.querySelector('#add-task').classList.add('hidden');
        } else {
            document.querySelector('#add-task').classList.remove('hidden');
        }


    });
})

renderList();