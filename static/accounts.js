// This works for both login.html and signup.html because it looks for ANY form
document.querySelectorAll('form').forEach(form => 
    {
    form.addEventListener('submit', async (e) => 
        {
        // We use async so we can use await
        // Essentially allowing us to wait for server response while the other code is already running
        e.preventDefault(); 
        // This line stops the page from refreshing (preventing default action associated with event e)

        // Take the form data and send it to the server
        // form.action is automatically /login or /signup based on your HTML
        const response = await fetch(form.action, 
        { 
            method: 'POST', 
            body: new FormData(form) 
        });

        // Wait for the server's response ("success", "exists")
        const result = await response.text();

        // Logic for Signup Page
        if (form.action.includes('/signup')) 
        {
            if (result === "exists") 
            {
                alert("This UTORid is already taken. Please try another.");
            } 
            else if (result === "success") 
            {
                alert("Account created! Redirecting to login page...");
                window.location.href = "/login";
                // Brings us to the login page
            }
        } 
        
        // Logic for Login Page
        else if (form.action.includes('/login')) 
        {
            if (result === "success") 
            {
                alert("Login successful! Welcome back.");
                window.location.href = "/"; // Redirect to homepage
            } 
            else 
            {
                // Flask returns "invalid" if username/password don't match
                alert("Invalid UTORid or password. Please try again.");
            }
        }
        
        else if (form.action.includes('/add_schedule')) {
            if (result === "success") {
                const addMore = confirm("Class added! Click 'OK' to add another, or 'Cancel' to return to your schedule.");
                if (addMore) {
                    form.reset(); // Clears the inputs for the next entry
                } else {
                    window.location.href = "/"; // Redirects to home
                }
            } else {
                alert("Error adding class: " + result);
            }
        }
    });
});