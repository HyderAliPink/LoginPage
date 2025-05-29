const password = document.getElementById("register-password");
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNMOPQRSTUVWXYZ";
const number = "123456789";
const symbol = "!@#$%^*&";
const generatePass = document.getElementById("generatePass");

let passkeyLength = 15;

function passwordGenerator() {
  let passkey = "";
  const includeLetters = document.getElementById("abc");
  const includeNumbers = document.getElementById("number");
  const includeSymbols = document.getElementById("special");

  for (let i = 0; i < passkeyLength; i++) {
    let spec = Math.floor(Math.random() * 7);
    let abc = Math.floor(Math.random() * 51);
    let num = Math.floor(Math.random() * 8);

    passkey = passkey += symbol[spec];
    passkey = passkey += number[num];
    passkey = passkey += alphabet[abc];
  }
  let lastOutputPass = passkey.slice(0, passkeyLength);

  const resultShow = document.getElementById("passwordoutput");

  //   alert(`SAVE & USE ${lastOutputPass}`);
  //   return lastOutputPass;
  const randomPassOutput = document.getElementById("randomPassOutput");
  randomPassOutput.value = lastOutputPass;
  console.log(lastOutputPass);
}
// passwordGenerator();

generatePass.addEventListener("click", () => {
  passwordGenerator();
  randomPassOutput.style.display = "block";
});
