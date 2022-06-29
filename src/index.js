import Project from "./objects/project";
import ToDo from "./objects/todo";
import * as uiFN from "./UI";
import * as listFN from "./objects/projectList";

function initialPageLoad(){
    listFN.displayAllToDo()
    uiFN.createAddToDoBtn();
    

}


listFN.addProject(new Project("TEST1", "TESTDESC", [new ToDo("TN","TD"), new ToDo("T2","T3")]));



console.log(listFN.getProject("TEST1"));

initialPageLoad();


