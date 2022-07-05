class Project {

    constructor(projName, projDesc, todos = []){
        this.name = projName
        this.description = projDesc
        this.toDoList = todos;
    }

    addToDo(todo){
        this.toDoList.push(todo);
    }

    removeToDo(todoName){
        for (let index = 0; index < this.toDoList.length; index++) {
            const element = this.toDoList[index];
            if (element.name == todoName) {
                this.toDoList.splice(index,1);
                index--;
            }
        }
    }


}

export default Project;