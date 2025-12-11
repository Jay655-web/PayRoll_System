// const Employee = require("../../backend/models/Employee");
import { API_URL } from "./config.js";

async function loadEmployees(){
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/employees`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await response.json();
    const tbody = document.querySelector("#employeeTable tbody");

    data.forEach(emp => {
        console.log(emp);


        const row = `
            <tr>
                <td>${emp.fullname}</td>
                <td>${emp.employeeId}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>${emp.salary}</td>
                <td>${emp.dateOfJoin ? emp.dateOfJoin.split("T")[0] : ""}</td>

                <td class="upbtn">
                    <button class="editBtn" data-id="${emp._id}" style="color:white; cursor:pointer; font-weight:bold; padding:5px 9px; border:none; background-color:cadetblue;">✏️ Edit</button>
                    <button class="deleteBtn" data-id="${emp._id}" style="color:white; cursor:pointer; font-weight:bold; padding:5px 9px; border:none; background-color:rgb(206, 119, 119);">🗑 Delete</button>
                </td>

            </tr>
        `;
        tbody.innerHTML += row;
    });

    setTimeout(() => {
        document.querySelectorAll(".editBtn").forEach(btn => {
            btn.addEventListener("click", openEditPopup);
        });

        document.querySelectorAll(".deleteBtn").forEach(btn => {
            btn.addEventListener("click", deleteEmployee);
        });
    }, 300);

    console.log(token);
}

//Edit employee
async function openEditPopup(e) {
    const id = e.target.dataset.id;
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/employees/${id}`, {
        headers: { "Authorization": "Bearer " + token }
    });

    if(!response.ok){
        const errorData = await response.json().catch(()=>({
            message: "UN error"
        }));
        alert(errorData.message);
        return;
    }

    const emp = await response.json();
    console.log(emp);

    // Populate popup fields
    document.getElementById("empName").value = emp.fullname;
    document.getElementById("empEmail").value = emp.email;
    document.getElementById("empDepartment").value = emp.department;
    document.getElementById("empPosition").value = emp.position;
    document.getElementById("empSalary").value = emp.salary;
    document.getElementById("empDate").value = emp.dateOfJoin ? emp.dateOfJoin.split("T")[0] : "";

    document.getElementById("saveEmployee").setAttribute("data-id", id);
    document.getElementById("saveEmployee").setAttribute("data-mode", "edit");

    document.getElementById("employeePopup").style.display = "flex";
}

//Delete Employee
async function deleteEmployee(e) {
    const id = e.target.dataset.id;
    const confirmDelete = confirm("Are you sure you want to delete this employee?");

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });

    const data = await response.json();

    if (response.ok) {
        alert("Employee deleted successfully!");
        location.reload();
    } else {
        alert(data.message);
    }
}


loadEmployees();


//To open the Popup
document.getElementById("addEmployee").addEventListener("click", () => {
    document.getElementById("employeePopup").style.display = "flex";
});

//To close the popup
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("employeePopup").style.display = "none";
});

document.getElementById("saveEmployee").addEventListener("click", async () => {

    const fullname = document.getElementById("empName").value;
    const email = document.getElementById("empEmail").value;
    const department = document.getElementById("empDepartment").value;
    const position = document.getElementById("empPosition").value;
    const salary = document.getElementById("empSalary").value;
    const date = document.getElementById("empDate").value;

    const token = localStorage.getItem("token");

    const mode = document.getElementById("saveEmployee").getAttribute("data-mode");
    const id = document.getElementById("saveEmployee").getAttribute("data-id");

    let url = `${API_URL}/api/employees`;
    let method = "POST";

    if (mode === "edit") {
        url = `${API_URL}/api/employees/${id}`;
        method = "PUT";
    }

    // const response = await fetch("http://localhost:5000/api/employees", {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            fullname,
            email,
            department,
            position,
            salary,
            dateOfJoin: date
        })
    });

    const data = await response.json();

    if(response.ok){
        alert(mode === "edit" ? "Emplopyee updated successfully!" : "Emplopyee added successfully!");

        setTimeout(() => {
            document.getElementById("employeePopup").style.display = "none";
            location.reload();
        }, 1000);
        
    }else{
        alert("data.message");
    }
});

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