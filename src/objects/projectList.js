import * as uiFN from "../UI"

let projects = [];

function addProject(project){
    projects.push(project);
}

function getProjects(){
    return projects;
}

function getProject(projName){
    let p;
    projects.forEach(project => {
        if (projName === project.name){
            p = project
        }
    });
    return p;
}

function displayAllToDo(){
    projects.forEach(project => {
        project.toDoList.forEach(todo => {
            uiFN.renderTodo(todo);
        });
    });
}

function removeProject(projName){

}

export {addProject, getProject, getProjects, displayAllToDo, removeProject};