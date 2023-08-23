// Import and require 'mysql2'
const mysql = require('mysql2');

// Import and require 'inquirer'
const inquirer = require('inquirer');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // Add MySQL password here
    password: 'mypass',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'quit'],
    name: 'task',
  },
];

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      switch (answers.task) {
        case 'View All Employees':
          viewEmployees()
          break;
        case 'Add Employee':
          break;
        case 'Update Employee Role':
          break;
        case 'View All Roles':
          break;
        case 'Add Role':
          break;
        case 'View All Departments':
          break;
        case 'Add Department':
          break;
        default:
          process.exit()
      }
    });
}

function viewEmployees() {
  // create a quiery to return the employee info: id, first_name, last_name, role title, department name, salary, manager full name
}

// Function call to initialize app
init();

