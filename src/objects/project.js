import {isToday, parse} from "date-fns"

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
                const test = this.toDoList[index].dueDate;
                console.log(isToday(parse(test,'yyyy-MM-dd', new Date())));
                this.toDoList.splice(index,1);
                index--;
            }
        }
    }

    getTask(taskName){
        return this.toDoList.find( ({ name }) => name === taskName );
    }




}

export default Project;