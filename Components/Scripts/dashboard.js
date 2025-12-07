const token = localStorage.getItem("token");

if(!token){
    window.location.href = "./login.html";
}

console.log(token);

document.getElementById("welcome").innerText = "Welcome to the Dashboard!";

//error on line 7 check it later.
//it was a difference in spelling

document.getElementById("runpay").addEventListener("click", ()=> {
    window.location.href = "./Payroll.html";
})
document.getElementById("runpay2").addEventListener("click", ()=> {
    window.location.href = "./Payroll.html";
})

//THIS WILL BE THE FUNCTIONALITY OF THE NAVBAR BUTTONS
//DASHBOARD
document.getElementById("nav_dashboard").addEventListener("click", ()=> {
    window.location.href = "./Dashboard.html";
})
//EMPLOYEE
document.getElementById("nav_employee").addEventListener("click", ()=> {
    window.location.href = "./Employees.html";
})
//PAYROLL RUN 
document.getElementById("nav_payroll").addEventListener("click", ()=> {
    window.location.href = "./Payroll.html";
})
//PAYSLIPS
document.getElementById("nav_payslip").addEventListener("click", ()=> {
    window.location.href = "./Payslip.html";
})
//SETTINGS
document.getElementById("nav_setting").addEventListener("click", ()=> {
    window.location.href = "./Setting.html";
})

function logout(){
    localStorage.removeItem("token");
    window.location.href = "./LoginPage.html";
}

document.getElementById("logout").addEventListener("click", logout);