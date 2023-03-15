const createBtn = document.querySelector("#createCompany");
const companyName = document.querySelector("#companyName");
const companyPhone = document.querySelector("#companyPhone");
const companyEmail = document.querySelector("#companyEmail");
const form =document.querySelector("#company");

 function  handleCreate(e) {
  e.preventDefault();
  let inputted_companyName=companyName.value;
  let inputted_companyPhone=companyPhone.value;
  let inputted_companyEmail=companyEmail.value;
//   formData.set('name', inputted_companyName);
//   formData.set('phone', inputted_companyPhone);
//   formData.set('name', inputted_companyEmail);

let data={
    name:inputted_companyName,
    phone:inputted_companyPhone,
    email:inputted_companyEmail
}


// console.log(window.location.href);
// console.log(form)
form.submit();
//   let result = await response.json();
//   console.log(inputted_companyName);
//   console.log(inputted_companyPhone);
//   console.log(inputted_companyEmail);
}

createBtn.addEventListener("click", handleCreate);
