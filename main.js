(()=>{"use strict";const e=class{constructor(e,t,n=[]){this.name=e,this.description=t,this.toDoList=n}addToDo(e){this.toDoList.push(e)}removeToDo(e){for(let t=0;t<this.toDoList.length;t++)this.toDoList[t].name==e&&(this.toDoList.splice(t,1),t--)}};let t=[];function n(e){t.push(e)}function o(){return t}function c(e){return t.find((({name:t})=>t===e))}document.querySelector(".content");const a=document.querySelector("#modal"),s=document.querySelector("#project-modal"),i=document.querySelector("#task-modal"),l=document.querySelector("#add-task"),r=document.querySelector(".task-container"),d=document.querySelector(".sidebar-project"),u=document.querySelector("#add-project");function m(e){const t=document.createElement("div"),n=document.createElement("div"),o=document.createElement("span"),c=document.createElement("h3"),a=document.createElement("p"),s=document.createElement("p");t.classList.add("task"),n.classList.add("task-title"),o.classList.add("remove-task"),c.textContent=e.name,a.textContent=e.description,o.innerHTML="&times",s.textContent=e.dueDate,console.log(e.taskUrgency),3==e.urgency&&t.classList.add("u3"),n.appendChild(c),n.appendChild(o),t.appendChild(n),t.appendChild(a),t.appendChild(s),r.appendChild(t)}function p(e){const t=document.createElement("li"),n=document.createElement("span"),o=document.querySelector(".projects-container");n.innerHTML="&times",n.classList.add("remove-project"),t.classList.add("project-tab"),t.textContent=e.name,t.appendChild(n),o.appendChild(t)}function y(){a.style.display="none",i.style.display="none",s.style.display="none"}function h(){for(;r.firstChild;)r.removeChild(r.lastChild)}document.addEventListener("click",(function(e){if(e.target&&"addTask"==e.target.id&&(s.style.display="none",a.style.display="block",i.style.display="block"),"modal"==e.target.id&&y(),e.target.classList.contains("project-tab")&&(h(),function(){let e=document.querySelector(".sidebar > div > ul > li.active");null!=e&&e.classList.remove("active")}(),e.target.classList.add("active"),c(e.target.firstChild.textContent).toDoList.forEach((e=>{m(e)}))),e.target.classList.contains("remove-project")&&(function(e){for(let n=0;n<t.length;n++)e===t[n].name&&(t.splice(n,1),n--)}(e.target.parentElement.firstChild.textContent),localStorage.setItem("taskList",JSON.stringify(o())),e.target.parentElement.remove(),null==document.querySelector(".active")&&(h(),o().forEach((e=>{e.toDoList.forEach((e=>{m(e)}))})),document.querySelector(".inbox").classList.add("active"))),e.target.classList.contains("remove-task")){let t=document.querySelector(".active").firstChild.textContent,n=e.target.parentElement.firstChild.textContent,o=c(t);o.removeToDo(n),h(),o.toDoList.forEach((e=>{m(e)}))}})),l.addEventListener("click",(function(){const e=document.querySelector("#task-name"),t=document.querySelector("#task-description"),n=document.querySelector("#task-due"),a=document.querySelector("#task-urgency");let s=document.querySelector(".sidebar > div > ul > li.active").firstChild.textContent,i=new class{constructor(e,t,n,o){this.name=e,this.description=t,this.dueDate=n,this.urgency=o}}(e.value,t.value,n.value,a.value);!function(e,t){c(e).addToDo(t),localStorage.setItem("taskList",JSON.stringify(o()))}(s,i),m(i),y()})),d.addEventListener("click",(()=>{i.style.display="none",a.style.display="block",s.style.display="block"})),u.addEventListener("click",(function(){const t=document.querySelector("#project-name"),a=document.querySelector("#project-description");if(void 0===c(t.value)){const c=new e(t.value,a.value);n(c),localStorage.setItem("taskList",JSON.stringify(o())),p(c),y()}else alert("Project Already Exists")})),console.log(localStorage.getItem("taskList")),localStorage.length>0?JSON.parse(localStorage.getItem("taskList")).forEach((t=>{n(Object.assign(new e(t.name,t.description,t.toDoList),t))})):(n(new e("Inbox")),n(new e("Today")),n(new e("Week"))),o().forEach((e=>{"Inbox"!=e.name&&"Today"!=e.name&&"Week"!=e.name&&p(e)}))})();