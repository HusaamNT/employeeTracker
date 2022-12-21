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
    const [array] = await db.query(`SELECT * FROM department;`)
    console.log(array)
    const list = array.map(item => ({value: item.id, name: item.name}))
    return await inquirer.prompt([{
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
        type: "list",
        name: "roleDepartmentId",
        message: "Department ID:",
        choices: list
    }
    ])
}

const employeeInfo = async function () {
    const [arrayR] = await db.query(`SELECT * FROM role;`)
    const [arrayE] = await db.query(`SELECT * FROM employee;`)
    console.table(arrayE)
    console.table(arrayR)
    const listEmployee = arrayE.map(it => ({value: it.id, name: it.first_name}))
    const listRole = arrayR.map(item => ({value: item.id, name: item.title}))
    return await inquirer.prompt([{
        type: "input",
        name: "first_name",
        message: "First Name:"
    },
    {
        type: "input",
        name: "last_name",
        message: "Second Name:"
    },
    {
        type: "list",
        name: "role_id",
        message: "Role ID:",
        choices: listRole
    },
    {
        type: "list",
        name: "manager_id",
        message: "Manager ID:",
        choices: listEmployee
    }
    ])
}

//create function to preserve department count and role count so invalid values can be spotted

async function viewDepartments() {
    const [results] = await db.query("SELECT * FROM department;")
    console.table(results);
    startQuestions()
};

async function viewRoles() {
    const [results] = await db.query("SELECT * FROM role;")
    console.table(results);
    startQuestions()
};

async function viewEmployees() {
    const [results] = await db.query("SELECT * FROM employee;")
    console.table(results);
    startQuestions()
};

async function addDepartment() {
    departmentInfo();
    db.query(`INSERT INTO department (name)
    VALUES(${departmentName})
    `)
}

async function addRole() {
    console.log("hello from addRole!!!")
    const answers = await roleInfo();
    console.log(answers);
    const [result] = await db.query(`INSERT INTO role (title, salary, department_id) values (?,?,?)`,[answers.title, answers.salary, answers.roleDepartmentId])
    startQuestions()
}

async function addEmployee() {
    const answers = await employeeInfo();
    console.log(answers);
    const [result] = await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)`,[answers.first_name, answers.last_name, answers.role_id, answers.manager_id])
    startQuestions()
}

async function editEmployee() {
console.log("In development!");
startQuestions();
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
        addDepartment()
    } else if (input === "Add an employee") {
        addEmployee()
    } else if (input === "Add a role") {
        addRole()
    }else if (input === "Update an employee role") {
        editEmployee()
    }
};

async function startQuestions() {
    getDb()
    const inputs = await trackerQuestions()
    await checkInput(inputs)
}

startQuestions()