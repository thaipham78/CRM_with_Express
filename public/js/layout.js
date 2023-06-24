let intitUrl = window.location.href;
let url = intitUrl.replace("http://localhost:3000", "home").split("/");

let filtered = url.filter((ele) => ele);
filtered.map((ele, index) => {
  if (ele == "home") {
    filtered[index] = { label: ele, href: "/" };
  } else {
    filtered[index] = { label: ele, href: "/" + ele };
  }
});

let breadcumb = document.querySelector(".breadcrumb");
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
filtered.forEach((item) => {
  const liElement = document.createElement("li");
  liElement.setAttribute("class", "breadcrumb-item");
  const aElement = document.createElement("a");
  aElement.setAttribute("href", item.href);
  let formatLabel = capitalizeFirstLetter(item.label);
  const textnode = document.createTextNode(formatLabel);
  aElement.appendChild(textnode);
  liElement.appendChild(aElement);
  breadcumb.appendChild(liElement);
});

function setBreadcumbActive() {
  let currentItem = breadcumb.lastElementChild;
  currentItem.classList.add("active");
}
setBreadcumbActive();

// tabs selectors
let tabs = document.querySelectorAll(".nav .nav-link");
console.log(tabs);
// console.log(intitUrl);

function setActiveTab() {
  tabs.forEach((tab) => {
    if (tab.href == intitUrl) {
      tab.classList.add("active-tab");
    } else {
      tab.classList.remove("active-tab");
    }
  });
}

setActiveTab();

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
let loginAlert = document.querySelector("#login-alert");
let isLoginIn = getCookie("isLoginIn");

function tracking() {
  setTimeout(() => {
    loginAlert.style.display = "none";
  }, 500);
}

function showAlert(status) {
  if (!isLoginIn && status) {
    console.log("ffc");
    loginAlert.style.display = "block";
    tracking();
    let cookieName = "isLoginIn";
    document.cookie = `${cookieName}=${status}`;
  }
}

function logOut(event) {
  event.preventDefault();
  document.cookie = "isLoginIn=;";
  location.href = "http://localhost:3000/auth/logout";
}
