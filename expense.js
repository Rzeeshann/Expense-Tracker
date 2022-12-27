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
    console.log(response);
    const d = document.getElementById("ul");
    if (response.data.user.isPremium == true) {
      document.querySelector(".header").classList.add("premium");
    
      let pop = document.getElementById("pop");
      let btn = `<a href="./premiumExpenses.html"id="popbtn">Hit Me!!!!</a>`;
      pop.innerHTML += btn;
      document.querySelector("#premiumbtn").remove();
    }
  
    for (let i = 0; i < response.data.data.length; i++) {
      const li = `<li id="${response.data.data[i].Amount}" class="li"> <div class="lidiv">${response.data.data[i].Amount},${response.data.data[i].Description},${response.data.data[i].Category}</div>
          <button onclick = deleteExpense('${response.data.data[i].id}') class="deletebtn"> Delete </button> 
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

//Premium
const URLTOBACKEND = 'http://localhost:5000/';
const EMAILID = 'zeeshansk433@gmail.com'
const PHONENO = 9886528348
async function gopremium(event){
const token = localStorage.getItem('token')
event.preventDefault()
const response = await axios.get('http://localhost:5000/premium',{headers: {"Authorization": token}})
var options={
  "key": response.data.key_id,
  "name": "Zeeshanahamed Kagadagar",
  "order_id": response.data.order.id,
  "prefill": {
      "name": "Zeeshanahamed Kagadagar",
      "email": `${EMAILID}`,
      "contact": `${PHONENO}`
},
"theme": {
  "color": "#3399cc"
},

//This handler function will handle the success payment
"handler": function (response) {
  console.log(response);
  axios.post(`http://localhost:5000/updatetransactionstatus`, {
      orderId: options.order_id,
      paymentId: response.razorpay_payment_id,
  }, { headers: { "Authorization": token } }).then(() => {
      alert('You are a Premium User Now')
      document.querySelector('.header').classList.add('premium')
      document.querySelector('#premiumbtn').remove()
  }).catch((err) => {
     console.log(err);
  })

}
}

const rzp1 = new Razorpay(options);
rzp1.open();


rzp1.on('payment.failed', function (response) {
alert(response.error.code);
alert(response.error.description);

console.log(response)
});
}

// Forgot Password
function resetPassword(event) {
  event.preventDefault()
  console.log('Hello')
}