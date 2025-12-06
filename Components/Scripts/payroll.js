async function runPayroll() {
    const token = localStorage.getItem("token");
    const period = document.getElementById("period").value;

    const employeeSelect = document.getElementById("selection");
    const employeeId = employeeSelect.value;

    const basicSalary = parseFloat(document.getElementById("salary").value) || 0;
    const allowances = parseFloat(document.getElementById("allowances").value) || 0;
    const deductions = parseFloat(document.getElementById("deductions").value) || 0;
    
    const netSalary = basicSalary + allowances - deductions;

    const response = await fetch("http://localhost:5000/api/payroll/run", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeId,
            payPeriod: period,
            basicSalary,
            allowances,
            deductions,
            netSalary
        })
    });

    const data = await response.json();

    if(response.ok){
        document.getElementById("message").innerText = "Payroll run successful!";

        const preview = document.querySelector(".preview");
        preview.innerHTML = `
            <h3>Payroll Preview</h3>
            <p><strong>Basic Salary:</strong> ₵${basicSalary.toFixed(2)}</p>
            <p><strong>Total Allowances:</strong> ₵${allowances.toFixed(2)}</p>
            <p><strong>Total Deductions:</strong> ₵${deductions.toFixed(2)}</p>
            <p><strong>Net Salary:</strong> ₵${netSalary.toFixed(2)}</p>
        `;

    }else{
        document.getElementById("message").innerText = data.message;
    }   
}

async function loadEmployees() {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/employees", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const employees = await response.json();

    const select = document.getElementById("selection");
    employees.forEach(emp => {
        const option = document.createElement("option");
        option.value = emp._id;  
        option.textContent = emp.fullname;
        select.appendChild(option);
    });
}

loadEmployees();

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
