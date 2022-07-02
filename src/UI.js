import Project from "./objects/project";
import Todo from "./objects/todo";
import * as List from "./objects/projectList";

const content = document.querySelector(".content");
const modal = document.querySelector("#modal");
const projectModal = document.querySelector("#project-modal");
const taskModal = document.querySelector("#task-modal");
const addTaskBtn = document.querySelector("#add-task");

const todoContainer = document.querySelector(".task-container");

const projectBtn = document.querySelector(".sidebar-project");
const addProjectBtn = document.querySelector("#add-project");



function renderAllTodo(){
    const projects = List.getAllProjects();
    projects.forEach(project => {
        project.toDoList.forEach(todo => {
            appendTodo(todo);
        });
    });

}

function appendTodo(todo){
    const toDoDiv = document.createElement("div");
    const toDoName = document.createElement("h3");
    const toDoDesc = document.createElement("p");
    toDoDiv.classList.add("task");
    toDoName.textContent = todo.name;
    toDoDesc.textContent = todo.description;

    toDoDiv.appendChild(toDoName);
    toDoDiv.appendChild(toDoDesc);

    todoContainer.appendChild(toDoDiv);
}

function renderAllProjects(){  
    //Append Projects DOM to Sidebar 
    const projects = List.getAllProjects();
    projects.forEach(project => {
        console.log(project);
        appendProject(project); 
    });
    
    
}

function appendProject(project){
    const projectList = document.createElement("li");
    const projectName = document.createElement("h5");
    const projectContainer = document.querySelector(".projects-container");

    projectName.classList.add("project-tab");

    projectName.textContent = project.name;

    projectList.appendChild(projectName);

    projectContainer.appendChild(projectList);



    
}

function createAddToDoBtn(){
    const toDoBtn = document.createElement("button");
    toDoBtn.textContent = "+ Add Task";
    toDoBtn.id ="addTask";
    todoContainer.appendChild(toDoBtn);
}

function showTaskModal(){

    modal.style.display = "block";
    taskModal.style.display = "block";
}

function showProjectModal(){
    modal.style.display = "block";
   projectModal.style.display = "block";
}

function hideTaskModal(){
    modal.style.display = "none";
    taskModal.style.display = "none";
    projectModal.style.display = "none";
}

function clearContent(){
    while (todoContainer.firstChild){
        todoContainer.removeChild(todoContainer.lastChild);
    }
}

document.addEventListener("click", function(e){
    if(e.target && e.target.id == "addTask"){
        //Open Add Task modal.
        console.log("TASK ADDED");
        showTaskModal();
    } 
    
    if(e.target.id == "modal"){
        hideTaskModal();
    }

    if(e.target.classList[0] == "project-tab"){   
        clearContent();
        let project = List.getProject(e.target.textContent);

        project.toDoList.forEach(todo => {
            
            appendTodo(todo);
        });
        
    }

    if(e.target.classList[0] == "inbox"){
        clearContent();
        renderAllTodo();
    }
});

addTaskBtn.addEventListener("click" ,() =>{
    const newTask = new Todo("T3", "DESC");
    List.getProject("TEST1").addToDo(newTask);
    appendTodo(newTask);
    hideTaskModal();

});



projectBtn.addEventListener("click", () =>{
    showProjectModal();
});

addProjectBtn.addEventListener("click",() =>{
    
    const newProject = new Project("Test5", "Descritption");
    List.addProject(newProject);
    appendProject(newProject);
    hideTaskModal();


});





export {renderAllTodo,renderAllProjects,createAddToDoBtn};