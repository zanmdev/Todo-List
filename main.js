(()=>{"use strict";const t=class{constructor(t,e,n=[]){this.name=t,this.description=e,this.toDoList=n}addToDo(t){this.toDoList.push(t)}},e=class{constructor(t,e,n,o,c=[]){this.name=t,this.description=e,this.dueDate=n,this.urgency=o,this.notes=c}addNote(t){this.notes.push(t)}};let n=[];function o(t){n.push(t)}function c(){return n}function s(t){let e;return n.forEach((n=>{t===n.name&&(e=n)})),e}document.querySelector(".content");const d=document.querySelector("#modal"),i=document.querySelector("#project-modal"),a=document.querySelector("#task-modal"),r=document.querySelector("#add-task"),l=document.querySelector(".task-container"),u=document.querySelector(".sidebar-project"),p=document.querySelector("#add-project");function m(){c().forEach((t=>{t.toDoList.forEach((t=>{h(t)}))}))}function h(t){const e=document.createElement("div"),n=document.createElement("h3"),o=document.createElement("p");e.classList.add("task"),n.textContent=t.name,o.textContent=t.description,e.appendChild(n),e.appendChild(o),l.appendChild(e)}function y(t){const e=document.createElement("li"),n=document.createElement("h5"),o=document.querySelector(".projects-container");n.classList.add("project-tab"),n.textContent=t.name,e.appendChild(n),o.appendChild(e)}function E(){d.style.display="none",a.style.display="none",i.style.display="none"}function T(){for(;l.firstChild;)l.removeChild(l.lastChild)}document.addEventListener("click",(function(t){t.target&&"addTask"==t.target.id&&(console.log("TASK ADDED"),d.style.display="block",a.style.display="block"),"modal"==t.target.id&&E(),"project-tab"==t.target.classList[0]&&(T(),s(t.target.textContent).toDoList.forEach((t=>{h(t)}))),"inbox"==t.target.classList[0]&&(T(),m())})),r.addEventListener("click",(()=>{const t=new e("T3","DESC");s("TEST1").addToDo(t),h(t),E()})),u.addEventListener("click",(()=>{d.style.display="block",i.style.display="block"})),p.addEventListener("click",(()=>{const e=new t("Test5","Descritption");o(e),y(e),E()})),o(new t("TEST1","TESTDESC",[new e("TN","TD"),new e("T2","T3")])),o(new t("PROJ2","TESTDESC",[new e("T6","TD"),new e("T8","T3")])),m(),c().forEach((t=>{console.log(t),y(t)}))})();