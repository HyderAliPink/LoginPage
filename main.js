import {
  getAuth,
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  db,
} from "./fireBase.js";
const auth = getAuth();
const user = auth.currentUser;
const inputEmail = document.getElementById("newEmail");
const emailUpdateBtn = document.getElementById("updateEmailBtn");



// ------------------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    window.location.href = "loader.html";
  }
});

const updatedProfile = document
  .getElementById("updatedProfile")
  ?.addEventListener("click", () => {
    window.location.href = "updateProfile.html";
  });

getAuth();

if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  const uid = user.uid;
}
//-------------------------------------

const deleteCurrentUser = document.getElementById("delete-account");
const logoutBtn = document.getElementById("logout");
const loginBtn = document.getElementById("login");
const updateEmailIndex = document.getElementById("updateEmail");
updateEmailIndex?.addEventListener("click", () => {
  window.location.href = "updateEmail.html";
});

let deletefn = () => {
  const user = auth.currentUser;
  console.log(user);

  deleteUser(user)
    .then(() => {
      console.log("user deleted");
    })
    .catch((error) => {
      console.log("failure", error);
    });
};

// import { getAuth, reauthenticateWithCredential } from "firebase/auth";

// const auth = getAuth();
// const user = auth.currentUser;

// TODO(you): prompt the user to re-provide their sign-in credentials

onAuthStateChanged(auth, (user) => {
  // console.log(user.displayName);
  // console.log(user.photoURL);
  if (user && window.location.pathname.includes("updateEmail.html")) {
    const oldEmail = prompt("Enter your old email");
    const password = prompt("Enter your old password");

    const credential = EmailAuthProvider.credential(oldEmail, password);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        console.log("Reauthentication successful. Proceeding to email update.");

        const newEmailInput = document.getElementById("newEmailInput");
        const emailUpdateBtn = document.getElementById("emailUpdateBtn");

        emailUpdateBtn.addEventListener("click", () => {
          const newEmail = newEmailInput.value;
          console.log("Attempting to update to:", newEmail);

          updateEmail(auth.currentUser, newEmail)
            .then(() => {
              console.log("Email updated successfully!");
            })
            .catch((error) => {
              console.error(
                "Failed to update email:",
                error.code,
                error.message
              );
            });
        });
      })
      .catch((error) => {
        // console.error("Reauthentication failed:", error.code, error.message);
      });
  }

  const greetUser = document.getElementById("greetingText");
  const profilePhoto = document.getElementById("profileImage");
  if (user.displayName && window.location.pathname.includes("index.html")) {
    greetUser.innerHTML = `Sahab ${user.displayName}`;
  } else if (window.location.pathname.includes("index.html")) {
    greetUser.innerHTML = "user";
  }
  if (
    window.location.pathname.includes(
      "index.html" || window.location.pathname.includes("updateProfile.html")
    )
  ) {
    profilePhoto.src = `${user.photoURL}`;
  }

  if (user) {
    // console.log("logged in");
    const uid = user.uid;
  } else {
    console.log("User is not logged");
    window.location.href = "loader.html";
  }
});

logoutBtn?.addEventListener("click", () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      alert("Sign out successful");
      window.location.href = "login.html";
    })
    .catch((error) => alert("user not logged in"));
});

deleteCurrentUser?.addEventListener("click", () => {
  deletefn();
  const auth = getAuth();
  signOut(auth).then(() => {
    // alert("Sign out successful");
    window.location.href = "loader.html";
  });
});

// let displayName = userGreet.displayName;
