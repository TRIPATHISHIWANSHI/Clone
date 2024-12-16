document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault();
  var errorEmail = document.getElementsByClassName("errorEmail")[0];
  var errorPassword = document.getElementsByClassName("errorPassword")[0];
  var errorUsername = document.getElementsByClassName("errorUsername")[0];
  var emailID = document.getElementById("emailID").value;
  var pwd = document.getElementById("password").value;
  var userName = document.getElementById("userName").value;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailID)) {
    errorEmail.style.display = "block";
    errorEmail.style.color = "red";
    errorEmail.textContent = "Please enter a valid email address.";
  } else {
    errorEmail.style.display = "none";
  }

  // Password validation
  if (pwd.length < 8) {
    errorPassword.style.display = "block";
    errorPassword.style.color = "red";
    errorPassword.textContent = "Password must be at least 8 characters.";
  } else {
    errorPassword.style.display = "none";
  }

  // Username validation (hardcoded to "emilys")
  if (userName !== "emilys") {
    errorUsername.style.display = "block";
    errorUsername.style.color = "red";
    errorUsername.textContent = 'Please enter the valid Username "emilys".';
  } else {
    errorUsername.style.display = "none";
  }

  // Prepare login data
  const loginData = {
    username: userName, // Hardcoded "emilys" or as entered
    password: pwd, // User-entered password
    email: emailID, // User-entered email (optional)
    expiresInMins: 30, // Optional token expiration time
  };

  //console.log(loginData);
  //console.log(JSON.stringify(loginData));
  try {
    // Send login request to API
    const resp = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    console.log(resp);

    const data = await response.json(); // Log the response body
    console.log(data);

    // Handle successful response
    if (resp.ok) {
      console.log("Login Successful:", data);

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);

      // Redirect to the home page
      window.location.href = "/home"; // Replace with actual route
    } else {
      // Handle errors returned by the server
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again later.");
  }
});
