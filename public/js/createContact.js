const createBtn = document.querySelector("#createContact");
const contactName = document.querySelector("#contactName");
const contactPhone = document.querySelector("#contactPhone");
const contactEmail = document.querySelector("#contactEmail");
const form = document.querySelector("#contact");

const isRequired = (value) => (value === "" ? false : true);

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isPhoneValid = (phone) => {
  const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return re.test(phone);
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

function showErrorMessage(element, message, status) {
  let messagePlaceHolder = element.nextElementSibling;
  if (!status) {
    messagePlaceHolder.textContent = message;
    messagePlaceHolder.classList.remove("success");
    messagePlaceHolder.classList.add("error");
  }
  if (status) {
    messagePlaceHolder.textContent = message;
    messagePlaceHolder.classList.remove("error");
    messagePlaceHolder.classList.add("success");
  }
}

function verifyName() {
  // let element = document.querySelector("#companyName");
  let message;
  let status;
  let data = contactName.value;

  // Case Empty
  if (!isRequired(data)) {
    message = "Contact name can not be blank !";
    status = isRequired(data);
    showErrorMessage(contactName, message, status);
    return status;
  } else {
    showErrorMessage(contactName, "", isRequired(data));
  }

  // Case Enough character
  if (!isBetween(data.length, 8, 32)) {
    message = "Contact name must be at least 8 characters !";
    status = isBetween(data.length, 8, 32);
    showErrorMessage(contactName, message, status);
    return status;
  } else {
    showErrorMessage(contactName, "", isBetween(data));
  }

  return true;
}

function verifyPhone() {
  let message;
  let status;
  let data = contactPhone.value;

  // Case empty
  if (!isRequired(data)) {
    message = "Contact phone can not be blank !";
    status = isRequired(data);
    showErrorMessage(contactPhone, message, status);
    return status;
  } else {
    showErrorMessage(contactPhone, "", isRequired(data));
  }

  // Case right format
  if (!isPhoneValid(data)) {
    message = "Invalid phone number !";
    status = isPhoneValid(data);
    showErrorMessage(contactPhone, message, status);
    return status;
  } else {
    showErrorMessage(contactPhone, "", isPhoneValid(data));
  }

  return true;
}

function verifyEmail() {
  let message;
  let status;
  let data = contactEmail.value;

  // Case empty
  if (!isRequired(data)) {
    message = "Contact email can not be blank !";
    status = isRequired(data);
    showErrorMessage(contactEmail, message, status);
    return status;
  } else {
    showErrorMessage(contactEmail, "", isRequired(data));
  }

  // Case right format
  if (!isEmailValid(data)) {
    message = "Invalid email address !";
    status = isEmailValid(data);
    showErrorMessage(contactEmail, message, status);
    return status;
  } else {
    showErrorMessage(contactEmail, "", isEmailValid(data));
  }

  return true;
}

function handleCreate(e) {
  e.preventDefault();
  // form.submit();
  let isNameValid = verifyName();
  let isPhoneValid = verifyPhone();
  let isEmailValid = verifyEmail();

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
      case "contactName":
        verifyName();
        break;
      case "contactPhone":
        verifyPhone();
        break;
      case "contactEmail":
        verifyEmail();
        break;
    }
  })
);
