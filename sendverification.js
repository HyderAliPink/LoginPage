import { getAuth, sendEmailVerification } from "./fireBase.js";

const auth = getAuth();
const verify = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    alert("Email verification sent!");
    // ...
  });
};

const sendVerification = document.getElementById("verify");

sendVerification.addEventListener("click", () => {
  verify();
});
