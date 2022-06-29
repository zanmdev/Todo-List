const content = document.querySelector(".content");


function renderTodo(todo){
    const toDoDiv = document.createElement("div");
    const toDoName = document.createElement("h3");
    const toDoDesc = document.createElement("p");

    toDoName.textContent = todo.name;
    toDoDesc.textContent = todo.description;

    toDoDiv.appendChild(toDoName);
    toDoDiv.appendChild(toDoDesc);

    content.appendChild(toDoDiv);
}

function renderProjects(){
}

function createAddToDoBtn(){
    const toDoBtn = document.createElement("button");
    toDoBtn.textContent = "+ Add Task";
    content.appendChild(toDoBtn);
}



export {renderTodo,renderProjects,createAddToDoBtn};