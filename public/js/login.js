const loginBtn = document.querySelector("#loginBtn");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const form = document.querySelector("#login");



function handleCreate(e) {
  e.preventDefault();
  form.submit();
}

function showAlert(status){
  let errorMessage=document.querySelector(".err-message");
  console.log(status,"V")
  if(status!=undefined && !status){
    errorMessage.style.display = "block";
  }
  else{
    errorMessage.style.display = "none";
  }
}

loginBtn.addEventListener("click", handleCreate);
