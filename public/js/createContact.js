const createBtn = document.querySelector("#createContact");
const contactName = document.querySelector("#contactName");
const contactPhone = document.querySelector("#contactPhone");
const contactEmail = document.querySelector("#contactEmail");
const form = document.querySelector("#contact");

function handleCreate(e) {
  e.preventDefault();
  form.submit();
}

createBtn.addEventListener("click", handleCreate);
