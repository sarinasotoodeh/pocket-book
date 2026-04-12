const signupForm = document.querySelector('form[action="/signup"]'); // Selection by action
if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const response = await fetch('/signup', { method: 'POST', body: formData });
        const result = await response.text();

        if (result === "exists") {
            alert("This UTORid is already taken.");
        } else if (result === "success") {
            const popup = document.getElementById('popup');
            popup.innerText = 'Account created! Redirecting...';
            popup.style.display = 'block';
            setTimeout(() => { window.location.href = '/'; }, 3000);
        }
    });
}

const loginForm = document.querySelector('form[action="/login"]');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const response = await fetch('/login', { method: 'POST', body: formData });
        const result = await response.text();

        if (result === "user_not_found") {
            alert("UTORid not found. Please sign up first.");
        } else if (result === "wrong_password") {
            alert("Incorrect password. Please try again.");
        } else if (result === "success") {
            const popup = document.getElementById('popup');
            popup.innerText = 'Welcome back! Redirecting...';
            popup.style.display = 'block';
            setTimeout(() => { window.location.href = '/'; }, 2000);
        }
    });
}