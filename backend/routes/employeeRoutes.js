const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getEmployeeById } = require("../controllers/employeeController");

const {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");

//All routes are protected
router.post("/", authMiddleware, createEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", auth, getEmployeeById);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;
