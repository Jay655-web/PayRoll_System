const express = require("express");
const cors = require("cors");
const path = require("path");
require("./config/keepAlive");

require("dotenv").config({ path: path.join(__dirname, ".env") });
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Connect to MongoDB
console.log('Using env file:', path.join(__dirname, '.env'));
// console.log('MONGO_URI (from env):', process.env.MONGO_URI ? '[REDACTED]' : process.env.MONGO_URI);
connectDB();

//Middlewares
app.use(cors(
    {
        origin:[
            // 'http://127.0.0.1:5500',
            // 'https://pay-roll-system-3vvbpz9yt-jay655-webs-projects.vercel.app',
            // 'https://jay655-web.github.io/PayRoll_System/',
            // 'https://pay-roll-system2-ujki-dr0dvwgg8-jay655-webs-projects.vercel.app',
            "https://pay-roll-system2-ujki-dr0dvwgg8-jay655-webs-projects.vercel.app",
            "https://payrollsystemamali.netlify.app/"
        ],
        method: "GET,POST,PUT,DELETE",
        credentials: true
    }
));
app.use(express.json());

// Simple request logger (helps debug routing issues)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} -> ${req.method} ${req.url}`);
    if (req.method === 'POST' || req.method === 'PUT') {
        console.log('Body:', req.body);
    }
    next();
});

// Route
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/payroll", require("./routes/payrollRoutes"));
app.use("/api/payslip", require("./routes/payslipRoutes"));


app.get("/", (req, res) => {
    res.send("Payroll API is running...ohk");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

