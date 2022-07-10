import Project from "./objects/project";
import Todo from "./objects/todo";
import * as List from "./objects/projectList";
import * as Storage from "./storage";


const content = document.querySelector(".content");
const modal = document.querySelector("#modal");
const projectModal = document.querySelector("#project-modal");
const taskModal = document.querySelector("#task-modal");
const addTaskBtn = document.querySelector("#add-task");

const todoContainer = document.querySelector(".task-container");

const projectBtn = document.querySelector(".sidebar-project");
const addProjectBtn = document.querySelector("#add-project");





function renderAllTodo(){
    //Gets all todos from project list and calls the append function to appends to task container
    const projects = List.getAllProjects();
    projects.forEach(project => {
        project.toDoList.forEach(todo => {
            appendTodo(todo);
        });
    });

}

function appendTodo(todo){
    //Takes a single todo and appends to the task container div.

    const toDoDiv = document.createElement("div");
    const toDoTitleDiv = document.createElement("div");
    const closeBtn = document.createElement("span");

    const toDoName = document.createElement("h3");
    const toDoDesc = document.createElement("p");
    const toDoDue = document.createElement("p");

    
    toDoDiv.classList.add("task");
    toDoTitleDiv.classList.add("task-title");
    closeBtn.classList.add("remove-task");
    

    toDoName.textContent = todo.name;
    toDoDesc.textContent = todo.description;
    closeBtn.innerHTML = "&times"; 
    toDoDue.textContent = todo.dueDate;
    console.log(todo.taskUrgency);
    if(todo.urgency == 3){
        toDoDiv.classList.add("u3");

    }

    
    toDoTitleDiv.appendChild(toDoName);
    toDoTitleDiv.appendChild(closeBtn);

    toDoDiv.appendChild(toDoTitleDiv);
    toDoDiv.appendChild(toDoDesc);
    toDoDiv.appendChild(toDoDue);


    todoContainer.appendChild(toDoDiv);
}

function renderAllProjects(){  
    //Append Projects DOM to Sidebar 
    console.log(localStorage.getItem("taskList"));
    Storage.populateList();
    const projects = List.getAllProjects();
    projects.forEach(project => {
        if(project.name !="Inbox" && project.name !="Today" && project.name != "Week"){
            appendProject(project); 
        }
        
    });
    
    
}

function appendProject(project){
    // Append single project to sidebar
    const projectList = document.createElement("li");
    const closeSpan = document.createElement("span");
    const projectContainer = document.querySelector(".projects-container");
    
    closeSpan.innerHTML = "&times";
    closeSpan.classList.add("remove-project");
    projectList.classList.add("project-tab");
    projectList.textContent = project.name;
    projectList.appendChild(closeSpan);

    projectContainer.appendChild(projectList);



    
}

function createAddToDoBtn(){
    const toDoBtn = document.createElement("button");
    toDoBtn.textContent = "+ Add Task";
    toDoBtn.id ="addTask";
    todoContainer.appendChild(toDoBtn);
}

function showTaskModal(){
    //Show modal for task input while hiding project input modal
    projectModal.style.display = "none";
    modal.style.display = "block";
    taskModal.style.display = "block";
}

function showProjectModal(){
    //Show project input modal while hiding task input modal.
    taskModal.style.display = "none";
    modal.style.display = "block";
    projectModal.style.display = "block";
}

function hideTaskModal(){
    //Hide all modals
    modal.style.display = "none";
    taskModal.style.display = "none";
    projectModal.style.display = "none";
}

function clearContent(){
    //Clears all tasks
    while (todoContainer.firstChild){
        todoContainer.removeChild(todoContainer.lastChild);
    }
}

function addTaskInput(){
    //Get task input values.
    const taskName = document.querySelector("#task-name");
    const taskDescription = document.querySelector("#task-description");
    const taskDate = document.querySelector("#task-due");
    const taskUrgency = document.querySelector("#task-urgency");

    //Get active project tab name.
    let projectName = document.querySelector(".sidebar > div > ul > li.active").firstChild.textContent;

    //Create new task add to storage. Then append to content div.
    let newTask = new Todo(taskName.value, taskDescription.value, taskDate.value, taskUrgency.value);
    Storage.addTaskToStorage(projectName, newTask);
    appendTodo(newTask);
    hideTaskModal();
}

function addProjectInput(){
    //Get project input values
    const projectName = document.querySelector("#project-name");
    const projectDescription = document.querySelector("#project-description");

    //Check if project exists already before creating and appending
    if(List.getProject(projectName.value) === undefined){
        const newProject = new Project(projectName.value, projectDescription.value);
        // addToLocalStorage(newProject);
        // List.addProject(newProject);
        Storage.addProjectToStorage(newProject);
        appendProject(newProject);
        hideTaskModal();
    }else{
        alert("Project Already Exists");
    }

    
}

function clearSidebarActiveState(){
    //Clear any sidebar tab that is currently active
    let sidebar = document.querySelector(".sidebar > div > ul > li.active");
    if(sidebar != null){  
        sidebar.classList.remove("active");
    }
}


document.addEventListener("click", function(e){
    if(e.target && e.target.id == "addTask"){
        //Open Add Task modal.
        showTaskModal();
    } 
    
    if(e.target.id == "modal"){
        hideTaskModal();
    }

    if(e.target.classList.contains("project-tab")){   
        
        clearContent();       
        clearSidebarActiveState()
    
        e.target.classList.add("active");   
        let project = List.getProject(e.target.firstChild.textContent);


        project.toDoList.forEach(todo => {
            appendTodo(todo);
        });
        
    }

    // if(e.target.classList.contains("inbox")){
    //     clearContent();
    //     clearSidebarActiveState()
    
    //     e.target.classList.add("active");    
    //     renderAllTodo();
    // }

    if(e.target.classList.contains("remove-project")){
        Storage.removeProjectFromStorage(e.target.parentElement.firstChild.textContent);
        e.target.parentElement.remove();  
        let sidebar = document.querySelector(".active");
        if(sidebar == null){
            clearContent();
            renderAllTodo();
            let inboxTab = document.querySelector(".inbox");
            inboxTab.classList.add("active");
        }
    }

    if(e.target.classList.contains("remove-task")){
        let projectName = document.querySelector(".active").firstChild.textContent;
        let taskName = e.target.parentElement.firstChild.textContent;

        let project = List.getProject(projectName);
        project.removeToDo(taskName);
        clearContent();
        project.toDoList.forEach(todo => {
            appendTodo(todo);
        });
        

    }
});

addTaskBtn.addEventListener("click" , addTaskInput);



projectBtn.addEventListener("click", () =>{
    showProjectModal();
});

addProjectBtn.addEventListener("click",addProjectInput);




export {renderAllTodo,renderAllProjects,createAddToDoBtn};