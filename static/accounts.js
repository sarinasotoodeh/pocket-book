var forms = document.querySelectorAll('form');
// DOM model (document object)
// querySelector is a DOM method
// returns all elements that have a <form> element on the webpage
    // it returns a node list of forms (there are 2)

// Go through all the forms; in this case there are 2
for (var i = 0; i < forms.length; i++) 
{
    forms[i].addEventListener('submit', function() 
    // Take the current form in the loop
    // Register a function whenever the form is submitted
    {
        event.preventDefault(); // using global event
        // Stop browser from navigating away and reloading the page

        var form = this;
        // Where 'this' is the <form> element that triggered the event

        fetch(form.action, 
        { 
            //Fetch sends an HTTP request
            // form.action is the url that the form submits to
            method: 'POST', 
            body: new FormData(form) 
            // Collect all input fields and make them form data
        })
        .then(function(response) 
        {
            //Wait for the server to respond (so only do this after, hence then)
            return response.text();
            //Using the response from the function (form data)
        })
        .then(function(result) 
        {
            //Then we take what is returned by the server
            // Did we submit, fail, etc
            ///.. self explanatory rest of code
            if (form.action.includes('/signup')) 
            {
                if (result === "exists") 
                {
                    alert("This UTORid is already taken.");
                } 
                else if (result === "success") 
                {
                    alert("Account created!");
                    window.location.href = "/login";
                }
            } 
            else if (form.action.includes('/login')) 
            {
                if (result === "success") 
                {
                    alert("Login successful!");
                    window.location.href = "/";
                } 
                else 
                {
                    alert("Invalid login.");
                }
            } 
            else if (form.action.includes('/add_schedule')) 
            {
                if (result === "success") 
                {
                    var addMore = confirm("Add another?");
                    if (addMore) 
                    {
                        form.reset();
                    } 
                    else 
                    {
                        window.location.href = "/";
                    }
                } 
                else 
                {
                    alert("Error: " + result);
                }
            }
        });
    });
}