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

const trackerQuestions = {
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
    ],
  };

const askQuestions = async function(){
    await inquirer.prompt(trackerQuestions)
};

function viewDepartments() {
    db.query("SELECT * FROM DEPARTMENTS", function(err, results){
        console.log(results)
    }
)};

function viewRoles() {
    db.query("SELECT * ROLES", function(err, results){
        console.log(results)
    }
)}; 