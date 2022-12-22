

  // Log In

function login(event) {
    event.preventDefault();
  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let details = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:5000/users/login", details)
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          alert("Successfully Logged in");
          localStorage.setItem("token", response.data.token);
          window.location.href = "./expense.html";
        } else {
          throw new Error("Failed to login");
        }
      })
      .catch((err) => alert(err.message));
  }






function savetoLocalstorage(event) {
    event.preventDefault();
    
let userDetails = {
    My_Expense_Amount : document.getElementById('amount').value,
    Description: document.getElementById('des').value,
    category :document.getElementById('cat').value
  
}

let userDetails_serialized=JSON.stringify(userDetails)  

localStorage.setItem(userDetails.My_Expense_Amount , userDetails_serialized)
showNewUseronScreen(userDetails)
}

function showNewUseronScreen(userDetails){
 const d=document.getElementById('ul')
 const li= `<li id="${userDetails. My_Expense_Amount}"> '${userDetails.My_Expense_Amount}','${userDetails.Description}','${userDetails.category}'
  <button onclick = editUser('${ userDetails.My_Expense_Amount}','${userDetails.Description}','${userDetails.category}')> Edit </button> 
  <button onclick = deleteUser('${userDetails.My_Expense_Amount}')> Delete </button> 
   </li>`
d.innerHTML=d.innerHTML + li
}



function deleteUser(amount) {
    let child = document.getElementById(amount)
    let parent=document.getElementById('ul')
    parent.removeChild(child)
    localStorage.removeItem(amount)
}

function editUser(amount) {
    
amount=document.getElementById('amount').value
description=document.getElementById('des').value
category=document.getElementById('cat').value

deleteUser(amount)

}