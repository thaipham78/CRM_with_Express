const loginBtn = document.querySelector("#loginBtn");
const name = document.querySelector("#accounName");
const password = document.querySelector("#password");
const form = document.querySelector("#login");
import { verifyName, verifyPassword } from "./utils/index.js";

function handleCreate(e) {
  e.preventDefault();
  // let isNameValid = verifyName(name, {
  //   empty: "Username can not be blank !",
  //   longEnough: "Username must be at least 8 characters !",
  // });
  // let isPasswordValid = verifyPassword(password, {
  //   empty: "Password can not be blank !",
  //   invalid:
  //     "Password must contain : at least 8 characters, 1 uppercase character , 1 lower character , 1 special character",
  // });
  // if (isNameValid && isPasswordValid) {
  //   form.submit();
  // }
  form.submit();
}

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// form.addEventListener(
//   "input",
//   debounce(function (e) {
//     console.log(e.target.id);
//     switch (e.target.id) {
//       case "accounName":
//         verifyName(name, {
//           empty: "Username can not be blank !",
//           longEnough: "Username must be at least 8 characters !",
//         });
//         break;
//       case "password":
//         verifyPassword(password, {
//           empty: "Password can not be blank !",
//           invalid:
//             "Password must contain : at least 8 characters, 1 uppercase character , 1 lower character , 1 special character",
//         });
//         break;
//     }
//   })
// );
loginBtn.addEventListener("click", handleCreate);



function showFailMessage(status) {
  let errorMessage = document.querySelector(".err-message");
  if (status != undefined && !status) {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
}


export { showFailMessage };
