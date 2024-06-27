/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

const displayNameInputEl = document.getElementById("display-name-input")
const photoURLInputEl = document.getElementById("photo-url-input")
const optionsbtn = document.getElementById("options")
const updateProfileButtonEl = document.getElementById("update-profile-btn")
const updateProfileSection = document.getElementById("profile-update")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)

optionsbtn.addEventListener("click", showUpdateProfile)
updateProfileButtonEl.addEventListener("click", authUpdateProfile)

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
      showLoggedInView()
      showProfilePicture(userProfilePictureEl, user)
      showUserGreeting(userGreetingEl, user)
    } else {
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
          alert(error.message) // Display error to user
        });
}

function authSignInWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message)
            alert(error.message) // Display error to user
        })
}

function authCreateAccountWithEmail() {
   const email = emailInputEl.value;
   const password = passwordInputEl.value;

   createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        clearAuthFields()
    })
    .catch((error) => {
        console.error(error.message)
        alert(error.message) // Display error to user
    })
}

function authSignOut() {
    signOut(auth).then(() => {
        }).catch((error) => {
            console.error(error.message);
            alert(error.message) // Display error to user
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

function showProfilePicture(imgElement, user) {
    const photoURL = user.photoURL;

    if (photoURL) {
       imgElement.src = photoURL;
    } else {
        imgElement.src = "assets/images/placeholder.png"
    }
}

function showUserGreeting(element, user) {
    const displayName = user.displayName;

    if (displayName) {
        const userFirstName = displayName.split(" ")[0]
        
        element.textContent = `Hey ${userFirstName}, how are you?`
    } else {
        element.textContent = `Hey friend, how are you?`
    }
}

function showUpdateProfile() {
    updateProfileSection.classList.toggle('show-update')
}

function authUpdateProfile() {
    const newDisplayName = displayNameInputEl.value
    let newPhotoURL

    if (photoURLInputEl.value === "") {
        newPhotoURL = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    } else {
        newPhotoURL = photoURLInputEl.value
    }

    updateProfile(auth.currentUser, {
        displayName: newDisplayName, photoURL: newPhotoURL
      }).then(() => {
            console.log('Profile updated')
            clearInputField(displayNameInputEl)
            clearInputField(photoURLInputEl)
        }).catch((error) => {
            console.error(error.message)
            alert(error.message) // Display error to user
        });
}
