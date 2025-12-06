const PayrollRun = require("../models/PayrollRun");
const Employee = require("../models/Employee");

//Salary Calculation LOgic

const calculateSalary = (employee) => {
    let basicSalary = employee.basicSalary;
    let allowances = employee.allowances || 0;
    let deduction = employee.deduction || 0;

    let netSalary = basicSalary + allowances - deduction;

    return {
        basicSalary,
        allowances,
        deduction, 
        netSalary
    };
}; 

exports.runPayroll = async (req, res) => {
    console.log("Payroll request body:", req.body);
    try{
        const {employeeId, payPeriod, basicSalary, allowances, deductions, netSalary} = req.body;
        if(!employeeId || !payPeriod){
            return res.status(400).json({
                message: "Please provide Employee and Period"
            });
        }

        const employee = await Employee.findById(employeeId);
        if(!employee){
            return res.status(404).json({
                message: "No employees found"
            });
        }

        const payroll = await PayrollRun.create({
            employee: employeeId,
            payPeriod,
            basicSalary,
            allowances,
            deduction: deductions,
            netSalary
        });

        res.status(201).json({
            message: "Run completed successfully", payroll
            // data: processed
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Payroll processing error"
        });
    }
};