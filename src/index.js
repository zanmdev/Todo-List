import Project from "./objects/project";
import ToDo from "./objects/todo";
import * as uiFN from "./UI";
import * as listFN from "./objects/projectList";

function initialPageLoad(){
    uiFN.renderAllTodo();

    uiFN.createAddToDoBtn();
    uiFN.renderAllProjects();

}





listFN.addProject(new Project("TEST1", "TESTDESC", [new ToDo("TN","TD"), new ToDo("T2","T3")]));
listFN.addProject(new Project("PROJ2", "TESTDESC", [new ToDo("T6","TD"), new ToDo("T8","T3")]));
initialPageLoad();


