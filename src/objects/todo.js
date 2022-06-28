class ToDo {
 
    constructor(toDoName, toDoDescription, toDoDueDate, urgentLvl,toDoNotes = []){
        this.name = toDoName
        this.description = toDoDescription
        this.dueDate = toDoDueDate;
        this.urgency = urgentLvl;
        this.notes = toDoNotes;
    }

    addNote(note){
        this.notes.push(note);
    }

}

export default ToDo;