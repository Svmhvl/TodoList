let addButton = document.getElementById("add")

let tasks = []

function getFromLocalStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))

    tasks = retrievedTasks ?? []
}

getFromLocalStorage()

//delete the html placeholder and add new elements from the array
function addTheCards(){
    
    document.getElementById("delete-default").innerHTML = ""
    let index = 0
    for (task of tasks){
        let content = 
            `<div class="task ${task.isDone ? 'done' : ''}"> 
            <div id="left-side">

                <h1 id="task-name">${task.title}</h1>
                <h2 id="task-time"><i class="fa-solid fa-calendar-days" style="margin-left:5px ;margin-right: 10px;"></i>${task.date}</h2>

            </div>    
            <div id="right-side">

                <button id="update" onclick="updateTask(${index})"><i class="fa-solid fa-pencil"></i></button>
                ${task.isDone ? `<button id="isdone2" onclick="toggleCompletion(${index})"><i class="fa-solid fa-x"></i></button>` : `<button id="isdone" onclick="toggleCompletion  (${index})"><i class="fa-solid fa-check"></i></button>`}
                <button id="delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button> 
            </div>

        </div>`

    document.getElementById("delete-default").innerHTML += content
    index++
}
}

addTheCards()

//add each time a new object to the array so it can be displayed
addButton.addEventListener('click', function(){
    let date = new Date().toJSON().slice(0, 10);
    let task = prompt("Add your task to the list: ","defaultText");
        if( task != null){
            let taskObj = {
                title: task,
                date: date,
                isDone: false
            }
            tasks.push(taskObj)
            setToLocalStorage()
            addTheCards()
        }

           
})

function deleteTask(index){
    let task = tasks[index]
    let warning = confirm("Are you sure you want to delete " + task.title)
        if(warning != false){
            tasks.splice(index, 1)
            setToLocalStorage()
            addTheCards()  
        }
    
}

function updateTask(index){
    let task = tasks[index]
    let newTask = prompt("Update your task: " , task.title)
    let newDate = new Date().toJSON().slice(0, 10);
    if(newTask != false){
        task.title = newTask
        task.date = newDate
        task.isDone = false
        setToLocalStorage()
        addTheCards()
    }

}


function toggleCompletion(index){
    let task = tasks[index]
    task.isDone = !task.isDone
    setToLocalStorage()
    addTheCards()
}

function setToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}