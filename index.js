// Import and require 'inquirer'
const inquirer = require('inquirer');
const routes = require('./db/index')

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
          routes.viewAllDepartments();
          break;
          
        case 'Add Department':
          routes.addDepartment();
          break;
          
        case 'View All Roles':
          routes.viewAllRoles();
          break;
          
        case 'Add Role':
          routes.addRole();
          break;

        case 'View All Employees':
          routes.viewAllEmployees();
          break;

        case 'Add Employee':
          routes.addEmployee();
          break;

        case 'Update Employee Role':
          routes.updateEmployeeRole();
          break;

        default:
          process.exit();
      }
    });
}

function viewAllEmployees() {
  // create a quiery to return the employee info: id, first_name, last_name, role title, department name, salary, manager full name
  
}

// Function call to initialize app
init();

