import Project from "./objects/project";
import ToDo from "./objects/todo";
import * as uiFN from "./UI";
import * as listFN from "./objects/projectList";

function initialPageLoad(){

    uiFN.renderAllProjects();

}




listFN.addProject(new Project("Inbox", "TESTDESC"));

initialPageLoad();


