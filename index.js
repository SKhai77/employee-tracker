// Import and require 'inquirer'
const inquirer = require('inquirer');
// const routes = require('./db/index');
const db = require('./db/connection');

require("console.table");


// Create an array of tasks for user input
const taskList = [
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee', 'Update Employee Role', 'View Employee By Department', 'View Employee by Manager', 'Exit'],
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

        case 'View Employees by Department':
          viewEmployeeByDepartment();
          break;

        case 'View Employee by Manager':
          ViewEmployeeByManager();
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
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter last name:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role:',
      choices: ['1: Accountant Manager', '2: Accountant', '3: Legal Team Lead', '4: Lawyer', '5: Lead Engineer', '6: Software Engineer', '7: Sales Lead', '8: Salesperson'],
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the department:',
      choices: ['1: Engineering', '2: Finance', '3: Legal', 'Sales'],
    },
  ])
  .then((answers) => {
    db.query(`INSERT INTO employee set ?`, {first_name: answers.first_name, last_name: answers.last_name, role_id: parseInt(answers.role_id), manager_id: parseInt(answers.manager_id)}, (error, response) => {
      console.table(response)
      if (error) throw error;
      console.log('Employee added successfully.');
      // Function call to initialize app
      init();
    })
  })
};

function updateEmployeeRole() {
  db.query('SELECT * FROM department', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

function viewEmployeeByDepartment() {
  db.query('SELECT d.name AS department, e.first_name, e.last_name, r.title AS role FROM employee e JOIN role r ON e.role_id = r.role_id JOIN department d ON r.department_id = d.department_id ORDER BY d.name, e.last_name, e.first_name', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

function ViewEmployeeByManager() {
  db.query('SELECT * FROM department', (error, response) => {
    console.table(response)
    // Function call to initialize app
    init();
  })
};

// Function call to initialize app
init();


