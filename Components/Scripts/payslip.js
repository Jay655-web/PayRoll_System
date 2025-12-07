
document.getElementById("paybtn").addEventListener("click", loadPayslip);

async function loadPayslip(){
    const token = localStorage.getItem("token");
        
    const id = document.getElementById("employeeId").value;
    const period = document.getElementById("period").value;

    const response = await fetch(`http://localhost:5000/api/payslip/${id}/${period}`, {
        method:"GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();
    console.log(data);
        
    if (!response.ok){
        document.getElementById("output").innerText = data.message;
        return;
    }
        
    const payslip = data.payslip;


        
    //Want to add a text change so that when the slip updates with the correct values.
    const month = document.getElementById("period");
    const name = document.getElementById("employee_name");
    const empId = document.getElementById("employee_id");
    const position = document.getElementById("employee_position");
    const department = document.getElementById("employee_department");

    const basicSalary = document.getElementById("basicSalary");
    const allowances = document.getElementById("allowances");
    const deduction = document.getElementById("deduction");
    const netpay = document.getElementById("netpay");


    name.innerText = payslip.employee.fullname;
    empId.innerText = payslip.employee._id;
    position.innerText = payslip.employee.position;
    department.innerText = payslip.employee.department;
        
    basicSalary.innerText = payslip.basicSalary;
    allowances.innerText = payslip.allowances;
    deduction.innerText = payslip.deduction;
    netpay.innerText = payslip.netSalary;
    month.innerText = payslip.payPeriod;

    const emp_month = document.getElementById("month");
    emp_month.textContent = payslip.payPeriod;

    const output = document.getElementById("output");
    output.style.display = "flex";
    console.log("push");

    // document.getElementById("output").innerText = JSON.stringify(data, null, 2);

}


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