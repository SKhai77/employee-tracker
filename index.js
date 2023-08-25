// Import and require 'inquirer'
const inquirer = require('inquirer');
// const routes = require('./db/index');
const db = require('./db/connection');

// Create an array of tasks for user input
const taskList = [
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee', 'Update Employee Role', 'Exit'],
    name: 'task',
  },
];

// Create a function to initialize app
function init() {
  inquirer
    .prompt(taskList)
    .then((answers) => {
      switch (answers.task) {

        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        default:
          process.exit();
      }
    });
}

function viewAllDepartments() {
  db.query('SELECT * FROM department', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

function addDepartment() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])

  db.query('INSERT INTO department (name) VALUES (?)', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();

  })
};

function viewAllRoles() {
  db.query('SELECT * FROM role', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

function addRole() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the role:',
      },
    ])

  db.query('INSERT INTO role', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

function viewAllEmployees() {
  db.query('SELECT * FROM employee', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

function addEmployee() {
  db.query('SELECT * FROM department', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init()
  })
};

function updateEmployeeRole() {
  db.query('SELECT * FROM department', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init()
  })
};

// Function call to initialize app
init();


