import ToDo from "./objects/todo";
import Project from "./objects/project";
import * as List from "./objects/projectList";


function checkStorage(){
    return localStorage.length > 0 ? true : false
}

function populateList(){
    if (checkStorage()){
        const savedTaskList = JSON.parse(localStorage.getItem("taskList"));
        savedTaskList.forEach(project => {
           List.addProject(Object.assign(new Project(project.name, project.description, project.toDoList),project));
        });
    }else{
        emptyStorage();
    }


}

function emptyStorage(){
    List.addProject(new Project("Inbox"));
    List.addProject(new Project("Today"));
    List.addProject(new Project("Week"));
}


function addProjectToStorage(project){
    List.addProject(project);
    localStorage.setItem("taskList", JSON.stringify(List.getAllProjects()));

}

function addTaskToStorage(projectName, task){
    let project = List.getProject(projectName);
    project.addToDo(task);
    localStorage.setItem("taskList",JSON.stringify(List.getAllProjects()));


}

function removeProjectFromStorage(projectName){
    List.removeProject(projectName);
    localStorage.setItem("taskList",JSON.stringify(List.getAllProjects()));
}

function removeTaskFromStorage(projectName, taskName){
    let project = List.getProject(projectName);
    project.removeToDo(taskName);
    localStorage.setItem("taskList", JSON.stringify(List.getAllProjects()));
}

export {checkStorage, populateList, addProjectToStorage,addTaskToStorage,removeProjectFromStorage, removeTaskFromStorage};