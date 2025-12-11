import { API_URL } from "./config.js";

document.getElementById("signupForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const firstname = document.getElementById("first_name").value;
    const lastname = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const con_password = document.getElementById("confirm_password").value;

    const fullname = `${firstname} ${lastname}`;

    console.log(firstname, lastname, fullname, email, password, con_password)
    
    if(password===con_password){
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                fullname,
                email,
                password,
            })
        });

        const data = await response.json();

        if(response.ok){
            document.getElementById("message").innerText = "SignUp Success!";
            console.info("Signup Successful");
            window.location.href = "./LoginPage.html";
        }else{
            document.getElementById("message").innerText = data.message;
        }

    } else {
        document.getElementById("message").innerText = "Please check the Password!";
    }

});