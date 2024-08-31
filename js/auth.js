// auth.js

// Hide spinner on page load
window.addEventListener('load', function () {
    document.getElementById('spinner').style.display = 'none';

    // Check if a user is logged in
    var currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        var storedData = JSON.parse(currentUser);
        displayUsername(storedData.username);
    }
});

// Toggle between login and signup forms
function toggleForm() {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

// Dark mode toggle
document.getElementById('toggleDarkMode').addEventListener('click', function () {
    var body = document.body;
    body.classList.toggle('dark-mode');
    this.textContent = body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Sign Up Functionality with Unique Email and Username
function signUp(event) {
    event.preventDefault();
    var username = document.getElementById('signupUsername').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Check if email or username already exists
    var isUsernameExists = false;
    var isEmailExists = false;

    Object.keys(localStorage).forEach(function (key) {
        if (key !== 'currentUser') {
            var storedData = JSON.parse(localStorage.getItem(key));
            if (storedData.email === email) {
                isEmailExists = true;
            }
            if (storedData.username === username) {
                isUsernameExists = true;
            }
        }
    });

    if (isEmailExists) {
        alert('Email already exists. Please log in or use a different email.');
        return;
    }
    if (isUsernameExists) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    // Store user data
    localStorage.setItem(email, JSON.stringify({ email: email, username: username, password: password }));
    alert('Sign up successful. Please log in.');
    toggleForm();
}

// Login Functionality
function logIn(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var storedData = JSON.parse(localStorage.getItem(email));

    if (storedData && storedData.password === password) {
        alert('Login successful!');
        localStorage.setItem('currentUser', JSON.stringify(storedData));
        displayUsername(storedData.username);
        window.location.href = "index.html"; // Redirect to home or another page
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Display Username in Navbar
function displayUsername(username) {
    document.getElementById('displayedUsername').textContent = username;
    document.getElementById('usernameDisplay').style.display = 'block';
    document.getElementById('loginSignupLink').style.display = 'none';
}

// Logout Functionality
function logOut() {
    localStorage.removeItem('currentUser');
    document.getElementById('usernameDisplay').style.display = 'none';
    document.getElementById('loginSignupLink').style.display = 'block';
    alert('You have logged out successfully.');
}
