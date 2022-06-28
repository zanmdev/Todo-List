class Project {
 
    constructor(projName, projDesc, todos = []){
        this.name = projName
        this.description = projDesc
        this.toDoList = todos;
    }

    addToDo(todo){
        this.toDoList.push(todo);
    }


}

export default Project;