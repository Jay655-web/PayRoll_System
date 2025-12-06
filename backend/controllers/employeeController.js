const Employee = require("../models/Employee");
const Counter = require("../models/counter");

//Auto Increment
async function getNextElementById(){
    const counter = await Counter.findByIdAndUpdate(
        {_id: "employeeId"},
        {$inc: {seq:1}},
        {new: true, upsert: true}
    );

    return counter.seq;
}

exports.createEmployee = async (req, res) => {
    try{

        const employeeId = await getNextElementById();

        const newEmployee = await Employee.create({
            employeeId,
            ...req.body
            // fullname, 
            // email,
            // department,
            // position,
            // salary,
            // dateOfJoin
        });

        res.json({
            message: "Employee created successfully",
            employee: newEmployee
        });
    } catch(error){
        res.status(500).json({
            message: "Error creating employee"
        });
    }
};


//CRUD Operations
//Create Employee
// exports.createEmployee = async (req, res) => {
//     try {
//         const newEmployee = new Employee(req.body);
//         await newEmployee.save();
//         res.json({
//             message: "Employee created successfully", employee: newEmployee 
//         });
//     } catch (error){
//         res.status(500).json({
//             message: "Error creating employee", error
//         });
//     }
// };

//Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({
            fullname: 1 
        });
        res.json(employees);
    } catch (error){
        res.status(500).json({
            message: "Error fetching employees"
        });
    }
};


//Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const updated = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json({
            message: "Employee updated successfully", updated
        });
    } catch(error){
        res.status(500).json({
            message: "Error updating employee"
        });
    }
};

//Delete Employee
exports.deleteEmployee = async (req, res) => {
    try{
        await Employee.findByIdAndDelete(req.params.id);
        res.json({
            message: "Employee deleted successfully"
        });
    } catch(error){
        res.status(500).json({
            message: "Error deleting employee"
        });
    }
};