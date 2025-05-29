import {
  createUserWithEmailAndPassword,
  getAuth,
  app,
  onAuthStateChanged,
} from "./fireBase.js";
const forgotPasswordBtn = document.getElementById("forgotPassword");
forgotPasswordBtn.addEventListener("click", () => {
  alert("Password bhol gye? ab kuch nhi ho sakta");
});

const email = document.getElementById("register-email");
const password = document.getElementById("register-password");
const signUpBtn = document.getElementById("signUpBtn");
const loader = document.getElementById("loader");
const loginbtn = document.getElementById("login");

const auth = getAuth(app);
const registerDiv = document.getElementById("reisterDiv");
let curentStatus = () => {
  const user = auth.currentUser;
  const currentPage = window.location.pathname;

  onAuthStateChanged(auth, (user) => {
    if (user && !currentPage.includes("index.html")) {
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else if (!user && !currentPage.includes("register.html")) {
      console.log("user not found");
      setTimeout(() => {
        window.location.href = "register.html";
      }, 3000);
      // window.location.href = "register.html";
    }
  });
};

curentStatus();

let register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user -->", user);
      email.value = "";
      password.value = "";
      // alert("success!");
      window.location.href = "loader.html";
    })
    .catch((error) => {
      console.log("error -->", error);
      const myError = error;
      email.value = "";
      password.value = "";

      if (error.code === "auth/email-already-in-use") {
        email.value = "This email is already Registered";
      } else {
        email.value = "Please enter email address";
      }
      console.log(error, "error");
      setTimeout(() => {
        email.value = "";
      }, 2000);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
signUpBtn.addEventListener("click", register);
loginbtn.addEventListener("click", () => (window.location.href = "login.html"));
// register()
