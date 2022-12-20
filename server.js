const mysql = require('mysql2/promise');
const inquirer = require("inquirer");
const fs = require("fs");
const { title } = require('process');

let db
const getDb = async () => {
    db = await mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'employee_db'
        }
    );
    console.log(`Connected to the employee_db database.`)
}

const trackerQuestions = async function () {
    return await inquirer.prompt({
        type: "list",
        name: "employeeTracker",
        message: "What would you like to view today?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
        ]
    })
};

const departmentInfo = async function () {
    await inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "Department name:"
    })
}

const roleInfo = async function () {
    await inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Role title:"
    },
    {
        type: "number",
        name: "salary",
        message: "Salary:"
    },
    {
        type: "number",
        name: "roleDepartmentId",
        message: "Department ID:"
    }
    ])
}

const employeeInfo = async function () {
    await inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "First Name:"
    },
    {
        type: "input",
        name: "secondName",
        message: "Second Name:"
    },
    {
        type: "number",
        name: "RoleId",
        message: "Role ID:"
    },
    {
        type: "number",
        name: "employeeDepartmentId",
        message: "Department ID:"
    }
    ])
}

async function viewDepartments() {
    const [results, _] = await db.query("SELECT * FROM department;")
    console.log(results)
};

function viewRoles() {
    db.query("SELECT * ROLE", function (err, results) {
        console.log('ROLE RESULTS', results)
    },
        startQuestions()
    )
};

function viewEmployees() {
    db.query("SELECT * EMPLOYEE", function (err, results) {
        console.log('EMPLOYEE RESULTS', results)
    },
        startQuestions()
    )
};

async function addDepartment() {
    departmentInfo();
    db.query(`INSERT INTO department (name)
    VALUES(${departmentName})
    `)
}

async function addRole() {
    roleInfo();
    db.query(`INSERT INTO ROLE (title, salary, department_id)
    VALUES("${title}", "${salary}", "${roleDepartmentId}")
    `)
}

async function addEmployee() {
    employeeInfo();
    db.query(`INSERT INTO EMPLOYEE (firstName, secondName, role_id, department_id)
    VALUES("${firstName}", "${secondName}", "${RoleId}", "${employeeDepartmentId}")
    `)
}

async function checkInput(inputs) {
    console.log('INPUTS', inputs)
    const input = inputs.employeeTracker;
    console.log('INPUT', input)
    if (input === "View all departments") {
        await viewDepartments()
    } else if (input === "View all roles") {
        viewRoles()
    } else if (input === "View all employees") {
        viewEmployees()
    } else if (input === "Add a department") {
        addEmployee()
    } else if (input === "Add a employee") {
        addDepartment()
    } else if (input === "Add a role") {
        addRole()
    }
};

async function startQuestions() {
    getDb()
    const inputs = await trackerQuestions()
    await checkInput(inputs)
}

startQuestions()