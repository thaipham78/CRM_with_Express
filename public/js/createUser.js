const createBtn = document.querySelector("#createUser");
const name = document.querySelector("#userName");
const password = document.querySelector("#userPassword");

const manage_users = document.querySelector("#manageUsers");
const manage_companies = document.querySelector("#manageCompanies");
const manage_contacts = document.querySelector("#manageContacts");

const form = document.querySelector("#user");

function handleCreate(e) {
  e.preventDefault();
console.log(manage_users.value);

  // console.log(window.location.href);
  // console.log(form)
  form.submit();
  //   let result = await response.json();
  //   console.log(inputted_companyName);
  //   console.log(inputted_companyPhone);
  //   console.log(inputted_companyEmail);
}

createBtn.addEventListener("click", handleCreate);
