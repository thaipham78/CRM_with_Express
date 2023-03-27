const createBtn = document.querySelector("#createUser");
const userName = document.querySelector("#userName");
const password = document.querySelector("#userPassword");
const role = document.querySelector("#userRole");
const manage_users = document.querySelector("#manageUsers");
const manage_companies = document.querySelector("#manageCompanies");
const manage_contacts = document.querySelector("#manageContacts");
const permissionchoices =  document.querySelector(".choice");
const contactLabel=document.querySelector("#contactLabel");

const form = document.querySelector("#user");

const isRequired = (value) => (value === "" ? false : true);

const isDropdownRequired = (value) =>
  (value.selectedIndex<=0? false : true);

const isChoicesRequired = (choices) => {
  let result;
  console.log(choices);
  choices.forEach((choice) => {
    if (choice) {
      result = true;
    }
  });
  if(result){
    return true;
  }
  else{
    return false;
  }
};

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

function showErrorMessage(element, message, status,cssList) {
  let messagePlaceHolder = element.nextElementSibling;
  console.log(status, "ccvv");
  if (!status) {
    messagePlaceHolder.textContent = message;
    messagePlaceHolder.classList.remove(cssList[0]);
    messagePlaceHolder.classList.add(cssList[1]);
  }
  if (status) {
    messagePlaceHolder.textContent = message;
    messagePlaceHolder.classList.remove(cssList[1]);
    messagePlaceHolder.classList.add(cssList[0]);
  }
}

function verifyName() {
  // let element = document.querySelector("#companyName");
  let message;
  let status;
  let data = userName.value;

  // Case Empty
  if (!isRequired(data)) {
    message = "Company name can not be blank !";
    status = isRequired(data);
    console.log(isRequired(data));
    showErrorMessage(userName, message, status,["success","error"]);
    return status;
  } else {
    showErrorMessage(userName, "", isRequired(data),["success","error"]);
  }

  // Case Enough character
  if (!isBetween(data.length, 8, 32)) {
    message = "User name must be at least 8 characters !";
    status = isBetween(data.length, 8, 32);
    console.log(status);
    showErrorMessage(userName, message, status,["success","error"]);
    return status;
  } else {
    showErrorMessage(userName, "", isBetween(data),["success","error"]);
  }

  return true;
}

function verifyPassword() {
  let message;
  let status;
  let data = password.value;

  // Case Empty
  if (!isRequired(data)) {
    message = "Password can not be blank !";
    status = isRequired(data);
    console.log(isRequired(data));
    showErrorMessage(password, message, status,["success","error"]);
    return status;
  } else {
    showErrorMessage(password, "", isRequired(data),["success","error"]);
  }

  //Case password  secure
  if (!isPasswordSecure(data)) {
    message =
      "Password must contain : at least 8 characters, 1 uppercase character , 1 lower character , 1 special character";
    status = isPasswordSecure(data.length, 8, 32);
    console.log(status);
    showErrorMessage(password, message, status,["success","error"]);
    return status;
  } else {
    showErrorMessage(password, "", isPasswordSecure(data),["success","error"]);
  }

  return true;
}

function verifyRole() {
  let message;
  let status;
  let data = role;
  console.log(data,"vvvv78");
  // Case Empty
  if (!isDropdownRequired(data)) {
    message = "Role can not be blank !";
    status = isDropdownRequired(data);
    console.log(isDropdownRequired(data),"vvv8");
    showErrorMessage(role, message, status,["success","error"]);
    return status;
  } else {
    showErrorMessage(role, "", isDropdownRequired(data),["success","error"]);
  }

  return true;
}

function verifyPermission() {
  let message;
  let status;
  const permission_list = [
    manage_users.checked,
    manage_companies.checked,
    manage_contacts.checked,
  ];

  // console.log(manage_users.checked,"ffffc");
  if (!isChoicesRequired(permission_list)) {
    message = "Permission can not be blank !";
    status = isChoicesRequired(permission_list);
    console.log(status);
    showErrorMessage (contactLabel, message, status,["success","checkBoxError"]);
    return false;
  } else {
    showErrorMessage(contactLabel, "", isChoicesRequired(permission_list),["success","checkBoxError"]);
  }

  return true;
}

function handleCreate(e) {
  e.preventDefault();
  let isNameValid = verifyName();
  let isPasswordValid = verifyPassword();
  let isRoleValid = verifyRole();
  let isPermissionValid = verifyPermission();
  // let isEmailValid = verifyCompanyEmail();

  // console.log(isNameValid, isPhoneValid, isEmailValid);
  console.log(verifyPermission(),"ff");
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
        verifyName();
        break;
      case "userPassword":
        verifyPassword();
        break;
    }
  })
);
