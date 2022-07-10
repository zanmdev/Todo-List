import {parse ,isToday, isThisWeek} from "date-fns";

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

function getAllTasksDateToday(){
    const todayTasks = [];
    projects.forEach(project => {
        project.toDoList.forEach(todo => {
            if (isToday((parse(todo.dueDate,'yyyy-MM-dd', new Date())))){
                todayTasks.push(todo);
            }
        });
    });
    return todayTasks;
}

function getAllTasksDateWeek(){
    const thisWeekTasks = [];
    projects.forEach(project => {
        project.toDoList.forEach(todo => {
            if (isThisWeek((parse(todo.dueDate,'yyyy-MM-dd', new Date())))){
                thisWeekTasks.push(todo);
            }
        });
    });
    return thisWeekTasks;
}

export {addProject, getProject, getAllProjects,removeProject,getAllTasksDateToday,getAllTasksDateWeek};