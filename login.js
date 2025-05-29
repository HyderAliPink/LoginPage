import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  app,
  signInWithPopup,
  GoogleAuthProvider,
} from "./fireBase.js";

const forgotPasswordBtn = document.getElementById("forgotPassword");
forgotPasswordBtn.addEventListener("click", () => {
  alert("Password bhol gye? ab kuch nhi ho sakta");
});
export const email = document.getElementById("login-email");
export const password = document.getElementById("login-password");
const loginBtn = document.getElementById("loginBtn");
const registerbtn = document.getElementById("register");
registerbtn.addEventListener(
  "click",
  () => (window.location.href = "register.html")
);

let login = () => {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user -->", user);
    })
    .catch((error) => {
      email.value = "";
      password.value = "";
      email.value = "invaild Credentials";
      setTimeout(() => {
        email.value = "";
      }, 2000);
      console.log(error, "error");
    });
};

const currentPage = window.location.pathname;

export let status = () => {
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("singed in");
      window.location.href = "index.html";

      const uid = user.uid;
    } else {
      console.log("User is signed out");
    }
  });
};

status();

loginBtn.addEventListener("click", () => {
  login();
  // status();
});
