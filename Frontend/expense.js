function addnewExpense(event) {
  event.preventDefault();

  const token = localStorage.getItem("token")
  console.log(token);

  let expenseDetails = {
    Amount: document.getElementById("amount").value,
    Description: document.getElementById("des").value,
    Category: document.getElementById("cat").value,
  };


  axios
    .post("http://localhost:5000/expense/addexpense", expenseDetails, {headers: {Authorization: token}})
    .then((response) => {
      alert("Expense Added"), 
      console.log(token);
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

function showNewUseronScreen(expenseDetails){
console.log(expenseDetails);
 const d=document.getElementById('ul')
 const li= `<li id="${expenseDetails.Amount}"> '${expenseDetails.Amount}','${expenseDetails.Description}','${expenseDetails.Category}'
 
  <button onclick = deleteExpense('${expenseDetails.Amount}')> Delete </button> 
   </li>`
d.innerHTML=d.innerHTML + li
}


window.addEventListener("DOMContentLoaded", (event) => {
  const token = localStorage.getItem('token')
  event.preventDefault();
  
  axios.get("http://localhost:5000/expense/getexpense/", {headers: {"Authorization": token}})
  .then((response) => {
    const d = document.getElementById("ul");
    for (let i = 0; i < response.data.data.length; i++) {
      const li = `<li id="${response.data.data[i].Amount}"> ${response.data.data[i].Amount},${response.data.data[i].Description},${response.data.data[i].Category}
            
            <button onclick = deleteExpense('${response.data.data[i].id}') style="color:white;background-color:rgb(24,31,46)"> Delete </button> 
             </li>`;
      d.innerHTML = d.innerHTML + li;
    }
  });
});

function deleteExpense(expenseId) {
 console.log(expenseId)
  const token = localStorage.getItem('token')
 
  axios.delete(`http://localhost:5000/expense/deleteexpense/${expenseId}`, {headers: {"Authorization": token}})
  .then(response=>{
      console.log(response)
      removeUserfromScreen(expenseId)
  })
  .catch(err=>console.log(err))
}

function removeUserfromScreen(expenseId){
const id = `expense-${expenseId}`
document.getElementById(id).remove()
}
// function deleteUser(amount) {
//     let child = document.getElementById(amount)
//     let parent=document.getElementById('ul')
//     parent.removeChild(child)
//     localStorage.removeItem(amount)
// }

function editUser(amount, des, cat) {
    
document.getElementById('amount').value=amount;
document.getElementById('des').value=des;
document.getElementById('cat').value=cat;

deleteUser(amount);

}