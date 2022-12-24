
function addnewExpense(event) {
  event.preventDefault();

  let expenseDetails = {
    Amount: document.getElementById("amount").value,
    Description: document.getElementById("des").value,
    Category: document.getElementById("cat").value,
  };
  console.log(expenseDetails);

  axios
    .post("http://localhost:5000/expense/addexpense", expenseDetails)
    .then((response) => {
      alert("Expense Added"), console.log(response);

    })
    .catch((err) => {
      console.log(err);
    });
    showNewUseronScreen(expenseDetails)
}


function savetoLocalstorage(event) {
    event.preventDefault();
    
let userDetails = {
    Amount : document.getElementById('amount').value,
    Description: document.getElementById('des').value,
    Category :document.getElementById('cat').value
  
}

let userDetails_serialized=JSON.stringify(userDetails)  

localStorage.setItem(userDetails.Amount , userDetails_serialized)
showNewUseronScreen(userDetails)
}

function showNewUseronScreen(userDetails){
  console.log(userDetails)
 const d=document.getElementById('ul')
 const li= `<li id="${userDetails.Amount}"> '${userDetails.Amount}','${userDetails.Description}','${userDetails.Category}'
  <button onclick = editUser('${ userDetails.Amount}','${userDetails.Description}','${userDetails.Category}')> Edit </button> 
  <button onclick = deleteUser('${userDetails.Amount}')> Delete </button> 
   </li>`
d.innerHTML=d.innerHTML + li
}


window.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  axios.get("http://localhost:5000/expense/getexpense")
  .then((response) => {
    const d = document.getElementById("ul");
    for (let i = 0; i < response.data.data.length; i++) {
      const li = `<li id="${response.data.data[i].Amount}"> ${response.data.data[i].Amount},${response.data.data[i].Description},${response.data.data[i].Category}
            <button onclick = editUser('${response.data.data[i].Amount}','${response.data.data[i].Description}','${response.data.data[i].Category}')> Edit </button> 
            <button onclick = deleteUser('${response.data.data[i].Amount}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
             </li>`;
      d.innerHTML = d.innerHTML + li;
    }
  });
});
function deleteUser(amount) {
    let child = document.getElementById(amount)
    let parent=document.getElementById('ul')
    parent.removeChild(child)
    localStorage.removeItem(amount)
}

function editUser(amount, des, cat) {
    
document.getElementById('amount').value=amount;
document.getElementById('des').value=des;
document.getElementById('cat').value=cat;

deleteUser(amount);

}