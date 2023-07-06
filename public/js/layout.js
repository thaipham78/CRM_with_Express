let logOutBTn = document.querySelector("#logout");

function pageLoading(status) {
  const loadingSpinner = document.querySelector(".loader");
  let container = document.querySelector(".container-fluid");

  if (status == "on") {
    loadingSpinner.style.display = "block";
    container.style.opacity = "0.1";
  }
  if (status == "off") {
    loadingSpinner.style.display = "none";
    container.style.opacity = "1";
  } else {
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function setBreadcumbActive() {
  let breadcumb = document.querySelector(".breadcrumb");

  // Create a regular expression that matches the query string.
  // Create a regular expression that matches the query params.
  const regex = /(\?)([^?=&]+)=[^&]*/gi;
  // Replace the query params with an empty string.
  let intitUrl = window.location.href.replace(regex, "");
  let url = intitUrl.replace("http://localhost:3000", "home").split("/");
  let filtered = url.filter((ele) => ele);
  filtered.map((ele, index) => {
    if (ele == "home") {
      filtered[index] = { label: ele, href: "/" };
    } else {
      filtered[index] = { label: ele, href: "/" + ele };
    }
  });
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
  let currentItem = breadcumb.lastElementChild;
  currentItem.classList.add("active");
}

function setActiveTab() {
  let tabs = document.querySelectorAll(".nav .nav-link");
  tabs.forEach((tab) => {
    if (tab.href == window.location.href) {
      tab.classList.add("active-tab");
    } else {
      tab.classList.remove("active-tab");
    }
  });
}

function logOut(event) {
  event.preventDefault();
  document.cookie = "isLoginIn=;";
  location.href = "http://localhost:3000/auth/logout";
}

pageLoading("on");

window.addEventListener("load", (event) => {
  pageLoading("off");
  console.log("The page has fully loaded");
});

setBreadcumbActive();

setActiveTab();

logOutBTn.addEventListener("click", logOut);


