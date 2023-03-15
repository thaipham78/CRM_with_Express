const updateBtn = document.querySelector("#updateContact");
const contactName = document.querySelector("#contactName");
const contactPhone = document.querySelector("#contactPhone");
const contactEmail = document.querySelector("#contactEmail");
const form = document.querySelector("#contact");

function handleCreate(e) {
  e.preventDefault();

  form.action = window.location.href;
  form.submit();
}

updateBtn.addEventListener("click", handleCreate);
