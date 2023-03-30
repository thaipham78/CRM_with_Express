const updateBtn = document.querySelector("#updateCompany");
const companyName = document.querySelector("#companyName");
const companyPhone = document.querySelector("#companyPhone");
const companyEmail = document.querySelector("#companyEmail");
const form = document.querySelector("#company");

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

function verifyCompanyName() {
  // let element = document.querySelector("#companyName");
  let message;
  let status;
  let data = companyName.value;

  // Case Empty
  if (!isRequired(data)) {
    message = "Company name can not be blank !";
    status = isRequired(data);
    showErrorMessage(companyName, message, status);
    return status;
  } else {
    showErrorMessage(companyName, "", isRequired(data));
  }

  // Case Enough character
  if (!isBetween(data.length, 8, 32)) {
    message = "Company name must be at least 8 characters !";
    status = isBetween(data.length, 8, 32);
    showErrorMessage(companyName, message, status);
    return status;
  } else {
    showErrorMessage(companyName, "", isBetween(data));
  }

  return true;
}

function verifyCompanyPhone() {
  let message;
  let status;
  let data = companyPhone.value;

  // Case empty
  if (!isRequired(data)) {
    message = "Company phone can not be blank !";
    status = isRequired(data);
    showErrorMessage(companyPhone, message, status);
    return status;
  } else {
    showErrorMessage(companyPhone, "", isRequired(data));
  }

  // Case right format
  if (!isPhoneValid(data)) {
    message = "Invalid phone number !";
    status = isPhoneValid(data);
    showErrorMessage(companyPhone, message, status);
    return status;
  } else {
    showErrorMessage(companyPhone, "", isPhoneValid(data));
  }

  return true;
}

function verifyCompanyEmail() {
  let message;
  let status;
  let data = companyEmail.value;

  // Case empty
  if (!isRequired(data)) {
    message = "Company email can not be blank !";
    status = isRequired(data);
    showErrorMessage(companyEmail, message, status);
    return status;
  } else {
    showErrorMessage(companyEmail, "", isRequired(data));
  }

  // Case right format
  if (!isEmailValid(data)) {
    message = "Invalid email address !";
    status = isEmailValid(data);
    showErrorMessage(companyEmail, message, status);
    return status;
  } else {
    showErrorMessage(companyEmail, "", isEmailValid(data));
  }

  return true;
}

function handleUpdate(e) {
  e.preventDefault();
  let isNameValid = verifyCompanyName();
  let isPhoneValid = verifyCompanyPhone();
  let isEmailValid = verifyCompanyEmail();

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
      case "companyName":
        verifyCompanyName();
        break;
      case "companyPhone":
        verifyCompanyPhone();
        break;
      case "companyEmail":
        verifyCompanyEmail();
        break;
    }
  })
);

