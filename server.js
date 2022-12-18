const mysql = require('mysql2');
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

const trackerQuestions = async function(){
    await inquirer.prompt({
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
})};

async function startQuestions(){
    await trackerQuestions()
    checkInput()
}

function viewDepartments() {
    db.query("SELECT * FROM DEPARTMENT", function(err, results){
        console.log(results)
    },
    startQuestions()
)};

function viewRoles() {
    db.query("SELECT * ROLE", function(err, results){
        console.log(results)
    },
    startQuestions()
)}; 

function viewEmployees() {
    db.query("SELECT * EMPLOYEE", function(err, results){
        console.log(results)
    },
    startQuestions()
)}; 

function checkInput(inputs){
    const input = inputs.employeeTracker;
    if (input === "View all departments"){
        viewDepartments()
    }else if (input === "View all roles"){
        viewRoles()
    }else if (input === "View all employees"){
        viewEmployees()
    }
}

startQuestions()