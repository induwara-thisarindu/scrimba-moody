/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyBLnam52ubBLduiXpfchQA9PXM0VpAJiBg",
    authDomain: "moody-ae0c9.firebaseapp.com",
    projectId: "moody-ae0c9",
    storageBucket: "moody-ae0c9.appspot.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      showLoggedInView()
      // ...
    } else {
      // User is signed out
      showLoggedOutView()
    }
  });

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Signed in with Google")
        }).catch((error) => {
          console.error(error.message)
        });
}

function authSignInWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            clearAuthFields()
            // ...
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authCreateAccountWithEmail() {
   const email = emailInputEl.value;
   const password = passwordInputEl.value;

   createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        clearAuthFields()
        // ...
    })
    .catch((error) => {
        console.error(error.message)
    })
}

function authSignOut() {
    signOut(auth).then(() => {
        }).catch((error) => {
            console.error(error.message);
        });
}


/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}

function clearInputField(field) {
	field.value = ""
}

function clearAuthFields() {
	clearInputField(emailInputEl)
	clearInputField(passwordInputEl)
}