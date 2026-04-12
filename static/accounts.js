/**
 * accounts.js
 * Handles AJAX form submissions for Login and Signup.
 * Supports auto-login by redirecting straight to home on success.
 */

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop the page from refreshing/reloading

        // 1. Prepare the data from the form fields
        const formData = new FormData(form);

        try {
            // 2. Send the request to the server (/login or /signup)
            const response = await fetch(form.action, { 
                method: 'POST', 
                body: formData 
            });

            // 3. Get the text response from Flask ("success", "exists", or "invalid")
            const result = await response.text();

            // --- SIGNUP LOGIC ---
            if (form.action.includes('/signup')) {
                if (result === "exists") {
                    alert("This UTORid is already taken. Please choose another.");
                } else if (result === "success") {
                    alert("Account created! Logging you in...");
                    // Auto-login: go straight to the homepage
                    window.location.href = "/"; 
                } else {
                    alert("An error occurred during signup. Please try again.");
                }
            } 
            
            // --- LOGIN LOGIC ---
            else if (form.action.includes('/login')) {
                if (result === "success") {
                    // Redirect to homepage where Jinja2 will now see the cookies
                    window.location.href = "/"; 
                } else {
                    alert("Invalid UTORid or password. Please try again.");
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Could not connect to the server. Is your Flask app running?");
        }
    });
});