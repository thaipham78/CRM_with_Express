const createBtn = document.querySelector("#createCompany");
const companyName = document.querySelector("#companyName");
const companyPhone = document.querySelector("#companyPhone");
const companyEmail = document.querySelector("#companyEmail");
const form = document.querySelector("#company");
import { verifyName, verifyPhone, verifyEmail } from "./utils/index.js";

function handleCreate(e) {
  e.preventDefault();
  let isNameValid = verifyName(companyName, {
    empty: "Company name can not be blank !",
    longEnough: "Company name must be at least 8 characters !",
  });
  let isPhoneValid = verifyPhone(companyPhone, {
    empty: "Company Phone can not be blank !",
    invalid: "Invalid phone number !",
  });
  let isEmailValid = verifyEmail(companyEmail, {
    empty: "Company Email can be not be blank !",
    invalid: "Invalid email address !",
  });

  if (isNameValid && isPhoneValid && isEmailValid) {
    form.submit();
  }
}

createBtn.addEventListener("click", handleCreate);

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

//Form field instant validation
form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "companyName":
        verifyName(companyName, {
          empty: "Company name can not be blank !",
          longEnough: "Company name must be at least 8 characters !",
        });
        break;
      case "companyPhone":
        verifyPhone(companyPhone, {
          empty: "Company Phone can not be blank !",
          invalid: "Invalid phone number !",
        });
        break;
      case "companyEmail":
        verifyEmail(companyEmail, {
          empty: "Company Email can be not be blank !",
          invalid: "Invalid email address !",
        });
        break;
    }
  })
);
