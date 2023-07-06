const updateBtn = document.querySelector("#updateContact");
const contactName = document.querySelector("#contactName");
const contactPhone = document.querySelector("#contactPhone");
const contactEmail = document.querySelector("#contactEmail");
const form = document.querySelector("#contact");
import { verifyName, verifyPhone, verifyEmail } from "./utils/index.js";

function handleUpdate(e) {
  e.preventDefault();
  // form.submit();
  let isNameValid = verifyName(contactName, {
    empty: "Contact name can not be blank !",
    longEnough: "Contact name must be at least 8 characters !",
  });
  let isPhoneValid = verifyPhone(contactPhone, {
    empty: "Contact phone can not be blank !",
    invalid: "Invalid phone number !",
  });
  let isEmailValid = verifyEmail(contactEmail, {
    empty: "Contact email can be not be blank !",
    invalid: "Invalid email address !",
  });

  if (isNameValid && isPhoneValid && isEmailValid) {
    form.action = window.location.href;
    form.submit();
  }
}

updateBtn.addEventListener("click", handleUpdate);

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
      case "contactName":
        verifyName(contactName, {
          empty: "Contact name can not be blank !",
          longEnough: "Contact name must be at least 8 characters !",
        });
        break;
      case "contactPhone":
        verifyPhone(contactPhone, {
          empty: "Contact phone can not be blank !",
          invalid: "Invalid phone number !",
        });
        break;
      case "contactEmail":
        verifyEmail(contactEmail, {
          empty: "Contact email can be not be blank !",
          invalid: "Invalid email address !",
        });
        break;
    }
  })
);
