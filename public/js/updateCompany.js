const createBtn = document.querySelector("#updateCompany");
const companyName = document.querySelector("#companyName");
const companyPhone = document.querySelector("#companyPhone");
const companyEmail = document.querySelector("#companyEmail");
const form =document.querySelector("#company");

 function  handleUpdate(e) {
  e.preventDefault();

form.action=window.location.href;
form.submit();

}

createBtn.addEventListener("click", handleUpdate);
