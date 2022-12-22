// Sign Up
// localStorage.clear()
function createUser(event) {
    event.preventDefault();
   
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let psw = document.getElementById("psw").value;
  
    let userDetails = {
      name: name,
      email: email,
      password: psw  
    };
    console.log(userDetails);
    axios
      .post("http://localhost:5000/users/signup", userDetails)
      .then((result) => {
        console.log(result);
        if (result.status == 201) {
          alert("Successfully Signed up");
          window.location.href = "./expenselogin.html";
        } else {
          throw new Error("Failed to Signup");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });
  }
//   console.log("Welcome")