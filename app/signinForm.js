import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signInForm = document.querySelector("#iniciar");

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signInForm["correo_inicio"].value;
  const password = signInForm["password_inicio"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials) //se deberia de comentar para no verlo en consola

    // Close the login modal
    const modal = bootstrap.Modal.getInstance(signInForm.closest('#unirse'));
    modal.hide();

    // reset the form
    signInForm.reset();

    // show welcome message
    showMessage("Bienvenidx " + userCredentials.user.email);
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      showMessage("Contraseña incorrecta", "error")
    } else if (error.code === 'auth/user-not-found') {
      showMessage("Usuario no encontrado", "error")
    } else {
      showMessage("Algo salio mal", "error") //si todo esta ok podrias cambiarlo como Tu email o pass estan equivocados
    }
  }
});