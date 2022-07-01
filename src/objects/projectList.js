import * as uiFN from "../UI"

let projects = [];

function addProject(project){
    projects.push(project);
}

function getAllProjects(){
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

// function displayAllToDo(){
//     projects.forEach(project => {
//         project.toDoList.forEach(todo => {
//             //uiFN.renderTodo(todo);
//         });
//     });
// }
// function displayAllProjects(){
//     projects.forEach(project => {
//        // uiFN.renderProjects(project);
//     });
// }

function removeProject(projName){

}

export {addProject, getProject, getAllProjects, removeProject};