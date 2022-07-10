let projects = [];

function addProject(project){
    projects.push(project);
}

function getAllProjects(){
    return projects;
}

function getProject(projName){
    return projects.find( ({ name }) => name === projName );
}


function removeProject(projName){
    for (let index = 0; index < projects.length; index++) {
        if(projName === projects[index].name){
            projects.splice(index, 1);
            index--;
        }
    }
}

export {addProject, getProject, getAllProjects,removeProject};