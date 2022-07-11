import Project from "./objects/project";
import Todo from "./objects/todo";
import * as List from "./objects/projectList";
import * as Storage from "./storage";

function createEventListeners(){
    const modalAddTaskBtn = document.querySelector("#modal-add-task");
    const addTaskBtn = document.querySelector("#add-task")
    const projectBtn = document.querySelector(".sidebar-project");
    const addProjectBtn = document.querySelector("#add-project");
    const modal = document.querySelector("#modal");

    addTaskBtn.addEventListener("click", showTaskModal);
    modalAddTaskBtn.addEventListener("click" ,addTaskInput);

    projectBtn.addEventListener("click", showProjectModal);
    addProjectBtn.addEventListener("click",addProjectInput);


    document.addEventListener("click", function(e){

        if(e.target.id == "modal"){
            //Close modal when clicking off modal content box
            hideModal();
        }
    
        if(e.target.classList.contains("project-tab")){   

            clearContent();       
            clearSidebarActiveState()

            addTaskBtn.style.display = "block";
            e.target.classList.add("active");   
            let project = List.getProject(e.target.firstChild.textContent);
    
    
            project.toDoList.forEach(todo => {
                appendTodo(todo);
            });
            
        }
    
        if(e.target.classList.contains("day") || e.target.classList.contains("week")){
            addTaskBtn.style.display = 'none';
            clearContent();
            clearSidebarActiveState();
            e.target.classList.add("active"); 
            let tasks = [];
            if (e.target.classList.contains("day")){
                tasks = List.getAllTasksDateToday();
            }else{
                tasks = List.getAllTasksDateWeek();
            }
            tasks.forEach(task => {
                appendTodo(task);
            });
        }

    
        if(e.target.classList.contains("remove-project")){
            Storage.removeProjectFromStorage(e.target.parentElement.firstChild.textContent);
            e.target.parentElement.remove();  
            let sidebar = document.querySelector(".active");
            if(sidebar == null){
                clearContent();
                let inboxTab = document.querySelector(".inbox");
                inboxTab.classList.add("active");
                List.getProject("Inbox").toDoList.forEach(todo => {
                    appendTodo(todo);
                });
            }
        }
    
        if(e.target.classList.contains("remove-task")){
            let projectName = document.querySelector(".active").firstChild.textContent;
            let taskName = e.target.parentElement.firstChild.textContent;
            Storage.removeTaskFromStorage(projectName, taskName);
            let project = List.getProject(projectName);
            // project.removeToDo(taskName);
            clearContent();
            project.toDoList.forEach(todo => {
                appendTodo(todo);
            });
            
    
        }
    });
    


}

function appendTodo(todo){
    //Takes a single todo and appends to the task container div.

    const todoContainer = document.querySelector(".task-container");
    const toDoDiv = document.createElement("div");
    const toDoTitleDiv = document.createElement("div");
    const closeBtn = document.createElement("span");

    const toDoName = document.createElement("h3");
    const toDoDesc = document.createElement("p");
    const toDoDue = document.createElement("p");
    const activeTab = document.querySelector(".active").firstChild.textContent;
    
    toDoDiv.classList.add("task");
    toDoTitleDiv.classList.add("task-title");
    closeBtn.classList.add("remove-task");

    toDoName.textContent = todo.name;
    toDoDesc.textContent = todo.description;
    closeBtn.innerHTML = "&times"; 
    toDoDue.textContent = todo.dueDate;
    if(todo.urgency == 3){
        toDoDiv.classList.add("u3");
    }

    toDoTitleDiv.appendChild(toDoName);

    if(activeTab != "Today" && activeTab != "This Week" ){
        toDoTitleDiv.appendChild(closeBtn);
    }


    toDoDiv.appendChild(toDoTitleDiv);
    toDoDiv.appendChild(toDoDesc);
    toDoDiv.appendChild(toDoDue);


    todoContainer.appendChild(toDoDiv);
}

function initialPageLoad(){  
    //Append Projects DOM to Sidebar 
    Storage.populateList();
    const projects = List.getAllProjects();
    projects.forEach(project => {
        if(project.name !="Inbox" && project.name !="Today" && project.name != "Week"){
            appendProject(project); 
        }
    });

    List.getProject("Inbox").toDoList.forEach(todo => {
        appendTodo(todo);
    });

    createEventListeners();


    
    
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

function showTaskModal(){
    const modal = document.querySelector("#modal");
    const projectModal = document.querySelector("#project-modal");
    const taskModal = document.querySelector("#task-modal");

    //Show modal for task input while hiding project input modal
    projectModal.style.display = "none";
    modal.style.display = "block";
    taskModal.style.display = "block";
}

function showProjectModal(){
    const modal = document.querySelector("#modal");
    const projectModal = document.querySelector("#project-modal");
    const taskModal = document.querySelector("#task-modal");
    //Show project input modal while hiding task input modal.
    taskModal.style.display = "none";
    modal.style.display = "block";
    projectModal.style.display = "block";
}

function hideModal(){
    const modal = document.querySelector("#modal");
    const projectModal = document.querySelector("#project-modal");
    const taskModal = document.querySelector("#task-modal");
    //Hide all modals
    modal.style.display = "none";
    taskModal.style.display = "none";
    projectModal.style.display = "none";
}

function clearContent(){
    const todoContainer = document.querySelector(".task-container");
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

    //Check if task name is in use then creates new task add to storage. Then append to content div.
    if(List.getProject(projectName).getTask(taskName.value) == undefined){
        let newTask = new Todo(taskName.value, taskDescription.value, taskDate.value, taskUrgency.value);
        Storage.addTaskToStorage(projectName, newTask);
        appendTodo(newTask);
        hideModal();
    }else{
        alert("Task name needs to be different");
    }



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
        hideModal();
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

export {initialPageLoad};