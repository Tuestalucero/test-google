//import "./app/firebase.js";
//console.log("hello world")

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth, onGetTasks } from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";
//import { setupPosts } from "./app/postList.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/logout.js'
import './app/postList.js'

import {getFirestore, collection} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js" //para CRUD
import { saveTask, getTasks, deleteTask, getTask, updateTask} from "./app/firebase.js";

let editStatus = false;
let id = '';
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
   const correo = user.email;
   //console.log(correo)
  
    try {

      //Ingresa titulo, descripcion y usuario a firesetore:
      const taskForm = document.getElementById("task-form");
      taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = taskForm["task-title"];
        const description = taskForm["task-description"];
       
        
        if(editStatus){
            updateTask(id, {
              title: title.value,
              description: description.value,
              userMail: user.email
            });
            editStatus = false;
            id = "";
          taskForm["btn-task-form"].innerText = "Publicar";
          document.getElementById("titulo_card").innerText = '¡Relata tus experiencias de viajes!';
          document.getElementById("nombre_card").innerText = 'Título:';
          document.getElementById("descripcion_card").innerText = 'Tu historia:';
          document.getElementById("body-tarjeta").style.backgroundColor = '#5bbfd3a8';
          document.getElementById("titulo_card").style.color = '#4a16aa';

        }else{
          saveTask(title.value, description.value, user.email);
        }   
        taskForm.reset()
      });


    } catch (error){
      console.log(error)
    }

    console.log(correo)
    
    const tasksContainer = document.getElementById("tasks-container");
    //
    onGetTasks((querySnapshot)=>{
    let html = '';   
    querySnapshot.forEach(doc => {
    //console.log(doc.data()); 
    const task = doc.data();   
    if (task.userMail == correo){
    html += `
          <li id="fondo_card" class="list-group-item list-group-item-action mt-2 p-3 border border-light border-start-0 rounded-end"">
          <h5>${task.title}</h5>
          <p>${task.description}</p>
          <div>
           <button id="boton_borrar" class="btn btn-delete text-light" data-id="${doc.id}">
           Borrar
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
            Editar
          </button>
          </div>
          </li>
          `;
    }  
    });
    tasksContainer.innerHTML = html;
   
   //eliminar
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
    //console.log(btnsDelete); //se uso para probar
    btnsDelete.forEach(btn =>{
        btn.addEventListener('click', (event) =>{
          deleteTask(event.target.dataset.id)
        })

    })

    //editar:
    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach(btn =>{
      //console.log(btn)
      btn.addEventListener('click', async (event) =>{ 
       const doc = await getTask(event.target.dataset.id);
       const task = doc.data()
       const taskForm2 = document.getElementById("task-form");
       taskForm2['task-title'].value = task.title;
       taskForm2['task-description'].value = task.description; 
       editStatus = true;
       //console.log(editStatus);
       id = doc.id
       taskForm2['btn-task-form'].innerText = 'Actualizar';
       document.getElementById("titulo_card").innerText = 'Actualiza tu publicación';
       document.getElementById("titulo_card").style.color = 'white';
       document.getElementById("nombre_card").innerText = 'Nuevo título:';
       document.getElementById("descripcion_card").innerText = 'Nueva descripción:';
       document.getElementById("body-tarjeta").style.backgroundColor = '#a75bd3a8';
      })

    })  
});


  }else{
    const vacio = "";
    //setupPosts(vacio);
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = '<h3 class="text-white">Inicia sesion para ver tus publicaciones</h1>'
    loginCheck(user);
  }

});