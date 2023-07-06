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

const isDropdownRequired = (value) => (value.selectedIndex <= 0 ? false : true);

const isChoicesRequired = (choices) => {
  let result;
  choices.forEach((choice) => {
    if (choice) {
      result = true;
    }
  });
  if (result) {
    return true;
  } else {
    return false;
  }
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

function showErrorMessage(element, message, status, cssList) {
  let messagePlaceHolder = element.nextElementSibling;
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

function verifyName(selector, errMessage) {
  let message;
  let status;
  let data = selector.value;

  // Case Empty
  if (!isRequired(data)) {
    message = errMessage.empty;
    status = isRequired(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isRequired(data), ["success", "error"]);
  }

  // Case Enough character
  if (!isBetween(data.length, 8, 32)) {
    message = errMessage.longEnough;
    status = isBetween(data.length, 8, 32);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isBetween(data), ["success", "error"]);
  }
  return true;
}

function verifyPhone(selector, errMessage) {
  let message;
  let status;
  let data = selector.value;

  // Case empty
  if (!isRequired(data)) {
    message = errMessage.empty;
    status = isRequired(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isRequired(data), ["success", "error"]);
  }

  // Case right format
  if (!isPhoneValid(data)) {
    message = errMessage.invalid;
    status = isPhoneValid(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isPhoneValid(data), ["success", "error"]);
  }

  return true;
}

function verifyEmail(selector, errMessage) {
  let message;
  let status;
  let data = selector.value;

  // Case empty
  if (!isRequired(data)) {
    message = errMessage.empty;
    status = isRequired(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isRequired(data), ["success", "error"]);
  }

  // Case right format
  if (!isEmailValid(data)) {
    message = errMessage.invalid;
    status = isEmailValid(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isEmailValid(data), ["success", "error"]);
  }

  return true;
}

function verifyPassword(selector, errMessage) {
  let message;
  let status;
  let data = selector.value;

  // Case Empty
  if (!isRequired(data)) {
    message = errMessage.empty;
    status = isRequired(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isRequired(data), ["success", "error"]);
  }

  //Case password  secure
  if (!isPasswordSecure(data)) {
    message = errMessage.invalid;
    status = isPasswordSecure(data.length, 8, 32);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isPasswordSecure(data), [
      "success",
      "error",
    ]);
  }

  return true;
}

function verifyRole(selector, errMessage) {
  let message;
  let status;
  let data = selector;
  // Case Empty
  if (!isDropdownRequired(data)) {
    message = errMessage.empty;
    status = isDropdownRequired(data);
    showErrorMessage(selector, message, status, ["success", "error"]);
    return status;
  } else {
    showErrorMessage(selector, "", isDropdownRequired(data), [
      "success",
      "error",
    ]);
  }
  return true;
}

function verifyPermission(selectorList, label, errMessage) {
  let message;
  let status;

  let permission_list = [...selectorList];
  permission_list = permission_list.map((item) => item.checked);

  if (!isChoicesRequired(permission_list)) {
    message = errMessage.empty;
    status = isChoicesRequired(permission_list);
    showErrorMessage(label, message, status, ["success", "checkBoxError"]);
    return false;
  } else {
    showErrorMessage(label, "", isChoicesRequired(permission_list), [
      "success",
      "checkBoxError",
    ]);
  }

  return true;
}

function getCookie(name) {
  const cookieData = document.cookie;

  const cookieValue = cookieData
    .split("; ")
    .find((cookie) => cookie.startsWith(name + "="));

  if (cookieValue) {
    // The cookie exists.
    const cookieValueWithoutQuotes = cookieValue.substring(name.length + 1);
    return cookieValueWithoutQuotes;
  }
}

function loadLoginALert(serverLoginStatus) {
  let clientLoginStatus = getCookie("isLoginIn");
  let loginAlert = document.querySelector("#login-alert");

  if (!clientLoginStatus && serverLoginStatus) {
    loginAlert.style.display = "block";
    setTimeout(() => {
      loginAlert.style.display = "none";
    }, 1000);
    let cookieName = "isLoginIn";
    document.cookie = `${cookieName}=${serverLoginStatus}`;
  }
}

function removeQueryString(urlSTring) {
  // Split the URL on the question mark.
  const [, queryString] = urlSTring.split("?");

  // Return the URL without the query string.
  return urlSTring.replace("?" + queryString, "");
}

function showOperationAlert(selector) {
  // Get the value of the "name" parameter.
  let queryString = new URLSearchParams(window.location.search);
  let add = queryString.get("add");
  let update = queryString.get("update");

  if (add) {
    selector.textContent = "Add Successfully";
    selector.style.display = "block";
    setTimeout(() => {
      selector.style.display = "none";
      const newUrl = removeQueryString(window.location.href);
      history.pushState({}, "", newUrl);
    }, 1000);
  } else if (update) {
    selector.textContent = "Update Successfully";
    selector.style.display = "block";
    setTimeout(() => {
      selector.style.display = "none";
      const newUrl = removeQueryString(window.location.href);
      history.pushState({}, "", newUrl);
    }, 1000);
  } else {
    selector.style.display = "none";
    const newUrl = removeQueryString(window.location.href);
    history.pushState({}, "", newUrl);
  }
}

function showDelAlert(selector) {
  console.log("g");
  selector.textContent = "Delete Successfully";
  selector.style.display = "block";
  setTimeout(() => {
    selector.style.display = "none";
  }, 1000);
}

export {
  verifyName,
  verifyPhone,
  verifyEmail,
  verifyPassword,
  verifyRole,
  verifyPermission,
  getCookie,
  loadLoginALert,
  showOperationAlert,
  showDelAlert
};
