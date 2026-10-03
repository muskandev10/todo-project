const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    const savedEmail = localStorage.getItem("userEmail");

    const savedPassword = localStorage.getItem("userPassword");

    if (email !== savedEmail || password !== savedPassword) {
        alert("Invalid email or password!");
        return;
    }

    alert("Login successful!");
   
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";

});