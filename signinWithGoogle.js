import { getAuth, signInWithPopup, GoogleAuthProvider } from "./fireBase.js";

const provider = new GoogleAuthProvider();
const signWithGoogle = () => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error, "error");

      // ...
    });
};
const signinWithGoogleBtn = document.getElementById("googleSignin");
signinWithGoogleBtn.addEventListener("click", signWithGoogle);
