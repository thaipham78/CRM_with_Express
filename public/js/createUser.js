const createBtn = document.querySelector("#createUser");
const userName = document.querySelector("#userName");
const password = document.querySelector("#userPassword");
const role = document.querySelector("#userRole");
const manage_users = document.querySelector("#manageUsers");
const manage_companies = document.querySelector("#manageCompanies");
const manage_contacts = document.querySelector("#manageContacts");
const contactLabel = document.querySelector("#contactLabel");
import {
  verifyName,
  verifyPassword,
  verifyRole,
  verifyPermission,
} from "./utils/index.js";

const form = document.querySelector("#user");

function handleCreate(e) {
  e.preventDefault();
  let isNameValid = verifyName(userName, {
    empty: "Username can not be blank !",
    longEnough: "Username must be at least 8 characters !",
  });
  let isPasswordValid = verifyPassword(password, {
    empty: "Password can not be blank !",
    invalid:
      "Password must contain : at least 8 characters, 1 uppercase character , 1 lower character , 1 special character",
  });
  let isRoleValid = verifyRole(role, {
    empty: "Role can not be blank !",
  });
  let isPermissionValid = verifyPermission(
    [manage_users, manage_companies, manage_contacts],
    contactLabel,
    {
      empty: "Permission can not be blank !",
    }
  );
  if (isNameValid && isPasswordValid && isRoleValid && isPermissionValid) {
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
      case "userName":
        verifyName(userName, {
          empty: "Username can not be blank !",
          longEnough: "Username must be at least 8 characters !",
        });
        break;
      case "userPassword":
        verifyPassword(password, {
          empty: "Password can not be blank !",
          invalid:
            "Password must contain : at least 8 characters, 1 uppercase character , 1 lower character , 1 special character",
        });
        break;
    }
  })
);
