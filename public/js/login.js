const loginBtn = document.querySelector("#loginBtn");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const form = document.querySelector("#login");

function handleCreate(e) {
  e.preventDefault();
// console.log(manage_users.value);

  // console.log(window.location.href);
  // console.log(form)
  form.submit();
  //   let result = await response.json();
  //   console.log(inputted_companyName);
  //   console.log(inputted_companyPhone);
  //   console.log(inputted_companyEmail);
}

loginBtn.addEventListener("click", handleCreate);
