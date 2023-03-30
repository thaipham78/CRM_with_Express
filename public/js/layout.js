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
