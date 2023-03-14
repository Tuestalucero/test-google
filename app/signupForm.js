import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const Registrar = document.querySelector("#registrar");

Registrar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = Registrar["registrar-email"].value;
  const password = Registrar["registrar-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential) //ponerlo como comentario para que no se vea en consola

    // Close the signup modal
    const signupModal = document.querySelector('#unirse2');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // resetear el formulario
    signUpForm.reset();

    // show welcome message
    showMessage("Bienvenidx " + userCredential.user.email);

  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage("Email en uso", "error")
    } else if (error.code === 'auth/invalid-email') {
      showMessage("Email invalido", "error")
    } else if (error.code === 'auth/weak-password') {
      showMessage("Password corto", "error")
    } else if (error.code) {
      showMessage("Algo salio mal", "error")
    }
  }

});