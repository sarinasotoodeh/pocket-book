var forms = document.querySelectorAll('form');

for (var i = 0; i < forms.length; i++) 
{
    forms[i].addEventListener('submit', function() 
    {
        event.preventDefault(); // using global event

        var form = this;

        fetch(form.action, 
        { 
            method: 'POST', 
            body: new FormData(form) 
        })
        .then(function(response) 
        {
            return response.text();
        })
        .then(function(result) 
        {
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