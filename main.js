(()=>{"use strict";const e=class{constructor(e,t,n=[]){this.name=e,this.description=t,this.toDoList=n}addToDo(e){this.toDoList.push(e)}removeToDo(e){}},t=class{constructor(e,t,n,o,c=[]){this.name=e,this.description=t,this.dueDate=n,this.urgency=o,this.notes=c}addNote(e){this.notes.push(e)}};let n=[];function o(e){n.push(e)}function c(){return n}function s(e){return n.find((({name:t})=>t===e))}document.querySelector(".content");const a=document.querySelector("#modal"),i=document.querySelector("#project-modal"),d=document.querySelector("#task-modal"),r=document.querySelector("#add-task"),l=document.querySelector(".task-container"),u=document.querySelector(".sidebar-project"),m=document.querySelector("#add-project");function p(){c().forEach((e=>{e.toDoList.forEach((e=>{y(e)}))}))}function y(e){const t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("span"),c=document.createElement("h3"),s=document.createElement("p"),a=document.createElement("p");t.classList.add("task"),n.classList.add("task-title"),c.textContent=e.name,s.textContent=e.description,o.innerHTML="&times",a.textContent=e.dueDate,n.appendChild(c),n.appendChild(o),t.appendChild(n),t.appendChild(s),t.appendChild(a),l.appendChild(t)}function h(e){const t=document.createElement("li"),n=document.createElement("span"),o=document.querySelector(".projects-container");n.innerHTML="&times",n.classList.add("remove-project"),t.classList.add("project-tab"),t.textContent=e.name,t.appendChild(n),o.appendChild(t)}function v(){a.style.display="none",d.style.display="none",i.style.display="none"}function E(){for(;l.firstChild;)l.removeChild(l.lastChild)}document.addEventListener("click",(function(e){e.target&&"addTask"==e.target.id&&(console.log("TASK ADDED"),i.style.display="none",a.style.display="block",d.style.display="block"),"modal"==e.target.id&&v(),"project-tab"==e.target.classList[0]&&(E(),document.querySelector(".sidebar > div > ul > li.active").classList.remove("active"),e.target.classList.add("active"),s(e.target.firstChild.textContent).toDoList.forEach((e=>{y(e)}))),e.target.classList.contains("inbox")&&(E(),document.querySelector(".sidebar > div > ul > li.active").classList.remove("active"),e.target.classList.add("active"),p()),e.target.classList.contains("remove-project")&&(function(e){for(let t=0;t<n.length;t++)e===n[t].name&&(n.splice(t,1),t--)}(e.target.parentElement.firstChild.textContent),e.target.parentElement.remove())})),r.addEventListener("click",(function(){const e=document.querySelector("#task-name"),n=document.querySelector("#task-description"),o=document.querySelector("#task-due"),c=document.querySelector("#task-urgency"),a=document.querySelector("#task-notes");let i=s(document.querySelector(".sidebar > div > ul > li.active").firstChild.textContent),d=new t(e.value,n.value,o.value,c.value,a.value);console.log(i),i.addToDo(d),y(d),v()})),u.addEventListener("click",(()=>{d.style.display="none",a.style.display="block",i.style.display="block"})),m.addEventListener("click",(function(){const t=document.querySelector("#project-name"),n=document.querySelector("#project-description");if(void 0===s(t.value)){const c=new e(t.value,n.value);o(c),h(c),v()}else alert("Project Already Exists")})),o(new e("Inbox","TESTDESC")),o(new e("TEST1","TESTDESC",[new t("TN","TD"),new t("T2","T3")])),o(new e("PROJ2","TESTDESC",[new t("T6","TD"),new t("T8","T3")])),p(),c().forEach((e=>{"Inbox"!=e.name&&h(e)}))})();