// Import and require 'inquirer'
const inquirer = require('inquirer');

// Import and require 'connection.js' file to connect with the database
const db = require('./db/connection');

// Import the 'console.table' module
require("console.table");


// Create an array of tasks for user input
const taskList = [
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'Add Department', 'Delete Department', 'View All Roles', 'Add Role', 'Delete Role', 'View All Employees', 'Add Employee', 'Delete Employee', 'Update Employee Role', "Update Employee's Manager", 'View Employee By Department', 'View Employee by Manager', 'Exit'],
    name: 'task',
  },
];


// Create a function to initialize app
async function init() {
  try {
    const answers = await inquirer.prompt(taskList);

    switch (answers.task) {
      case 'View All Departments':
        await viewAllDepartments();
        break;
      case 'Add Department':
        await addDepartment();
        break;
      case 'Delete Department':
        await deleteDepartment();
        break;
      case 'View All Roles':
        await viewAllRoles();
        break;
      case 'Add Role':
        await addRole();
        break;
      case 'Delete Role':
        await deleteRole();
        break;
      case 'View All Employees':
        await viewAllEmployees();
        break;
      case 'Add Employee':
        await addEmployee();
        break;
      case 'Delete Employee':
        await deleteEmployee();
        break;
      case 'Update Employee Role':
        await updateEmployeeRole();
        break;
      case "Update Employee's Manager":
        await updateEmployeeManager();
        break;
      case 'View Employee By Department':
        await viewEmployeeByDepartment();
        break;
      case 'View Employee by Manager':
        await viewEmployeeByManager();
        break;
      default:
        console.log('Exiting the application: Thanks for using our system!');
        process.exit();
    }
  } catch (error) {
    console.error('Error:', error);
    // Exit the process
    process.exit();
  }
}


// Display all departments using the 'db' connection
async function viewAllDepartments() {
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM department');
    console.log('Displaying all departments successfully.');
    console.table(rows);
    init();
  } catch (error) {
    console.error('Error viewing all departments.', error);
    init();
  }
}


// Add a new department using user input and the 'db' connection
async function addDepartment() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?',
        validate: function (input) {
          if (input.trim() === '') {
            return "Department name cannot be empty.";
          }
          return true;
        },
      },
    ]);

    // Insert the department into the database
    await db.promise().query('INSERT INTO department (name) VALUES (?)', [answers.departmentName]);
    console.log('Department added successfully.');

    // Fetch all departments again after insertion
    const [departments] = await db.promise().query('SELECT * FROM department');

    // Generate the list of department choices using .map
    const departmentChoices = departments.map(department => department.name);

    // Update the task list to include the new department in choices
    taskList.forEach(task => {
      if (['Add Role', 'Delete Department', 'Add Employee', "Update Employee's Manager", 'View Employee By Department'].includes(task.name)) {
        task.choices = departmentChoices;
      }
    });

    console.table(departments);
    init();
  } catch (error) {
    console.error('Error adding department.', error);
    init();
  }
}



// Function call to initialize app
init();
