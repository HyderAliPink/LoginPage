// import { getAuth, updateProfile } from "./fireBase.js";
import { getAuth, onAuthStateChanged, updateProfile } from "./fireBase.js";
const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  //   const auth = getAuth();

  const displayNameInput = document.getElementById("displayName");
  const profilePhoto = document.getElementById("photoURL");
  const updatedProfileBtn = document.getElementById("updateProfilebtn");
  const greet = document.getElementById("greetingText");
  const message = document.getElementById("message");
  const errorWaliDiv = document.getElementById("error");

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      greet.innerHTML = "Please log in.";
      return;
    }
    greet.innerHTML = `Hey There! ${user.displayName || "User"}`;

    displayNameInput.value = user.displayName || "";
    profilePhoto.value = user.photoURL || "";

    updatedProfileBtn.addEventListener("click", () => {
      updateProfile(user, {
        displayName: displayNameInput.value,
        photoURL: profilePhoto.value,
      })
        .then(() => {
          message.classList.remove("hidden");
          errorWaliDiv.classList.add("hidden");
          greet.innerHTML = `Hey There! ${displayNameInput.value}`;

          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Update error:", error);
          message.classList.add("hidden");
          errorWaliDiv.classList.remove("hidden");
        });
    });
  });
});

// const displayNameInput = document.getElementById("displayName");
// const userProfileinput = document.getElementById("photoURL");

// updateProfile(auth.currentUser, {
//   displayName: displayNameInput.value,
//   photoURL: userProfileinput.value,
// })
//   .then(() => {

//   })
//   .catch((error) => {
//     // An error occurred
//     // ...
//   });
