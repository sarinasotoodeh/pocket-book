// This works for both login.html and signup.html because it looks for ANY form
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop the page from refreshing

        // 1. Pack up the form data and send it to the server
        // form.action is automatically /login or /signup based on your HTML
        const response = await fetch(form.action, { 
            method: 'POST', 
            body: new FormData(form) 
        });

        // 2. Wait for the server's plain-text response ("success", "exists", etc.)
        const result = await response.text();

        // 3. Logic for Signup Page
        if (form.action.includes('/signup')) {
            if (result === "exists") {
                alert("This UTORid is already taken. Please try another.");
            } else if (result === "success") {
                alert("Account created! Redirecting to login page...");
                window.location.href = "/login";
            }
        } 
        
        // 4. Logic for Login Page
        else if (form.action.includes('/login')) {
            if (result === "success") {
                alert("Login successful! Welcome back.");
                window.location.href = "/"; // Redirect to homepage
            } else {
                // Flask returns "invalid" if username/password don't match
                alert("Invalid UTORid or password. Please try again.");
            }
        }
    });
});