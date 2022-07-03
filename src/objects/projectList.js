import * as uiFN from "../UI"

let projects = [];

function addProject(project){
    projects.push(project);
}

function getAllProjects(){
    return projects;
}

function getProject(projName){
    for (let index = 0; index < projects.length; index++) {

        if (projName === projects[index].name){
            return projects[index];
        }
    }
}

function hasProject(projName){
    for (let index = 0; index < projects.length; index++) {

        if (projName === projects[index].name){
            return projects[index];
        }
    }
    return false;
}


function removeProject(projName){

}

export {addProject, getProject, getAllProjects, hasProject,removeProject};