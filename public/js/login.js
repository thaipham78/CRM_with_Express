const loginBtn = document.querySelector("#loginBtn");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const form = document.querySelector("#login");

function handleCreate(e) {
  e.preventDefault();
  form.submit();
}

loginBtn.addEventListener("click", handleCreate);
