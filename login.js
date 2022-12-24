
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
