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


// Function to delete a department using the 'db' connection
async function deleteDepartment() {
  try {
    const departments = await db.promise().query('SELECT * FROM department');
    const departmentChoices = departments[0].map(department => ({
      name: department.name,
      value: department.id,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department do you want to delete?',
        choices: departmentChoices,
      },
    ]);

    await db.promise().query('DELETE FROM department WHERE id = ?', [answers.departmentId]);
    console.log('Department deleted successfully.');
    viewAllDepartments();
  } catch (error) {
    console.error('Error deleting department.', error);
    init();
  }
}


// Display all roles using the 'db' connection
async function viewAllRoles() {
  try {

    // Query the database to retrieve all roles
    const [rows, fields] = await db.promise().query('SELECT * FROM role');
    console.log('Displaying all roles successfully.');
    console.table(rows);

    // Continue with the main menu after displaying roles
    init();
  } catch (error) {
    console.error('Error viewing all roles.', error);

    // Show the main menu again
    init();
  }
}


// Function to add a new role using user input and the 'db' connection
async function addRole() {
  try {
    const departments = await db.promise().query('SELECT * FROM department');

    const departmentChoices = departments[0].map(department => ({
      name: department.name,
      value: department.id,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?',
        validate: function (input) {
          if (input.trim() === '') {
            return 'Role name cannot be empty.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: function (input) {
          const parsedSalary = parseFloat(input);
          if (isNaN(parsedSalary) || parsedSalary <= 0) {
            return 'Invalid salary. Please enter a valid positive number.';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'addRoleDepartment',
        message: 'Which department does the role belong to?',
        choices: departmentChoices,
      },
    ]);

    await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.roleName, answers.salary, answers.addRoleDepartment]);
    console.log('Role added successfully.');

    // Display all roles after adding the new role
    viewAllRoles();
  } catch (error) {
    console.error('Error adding role.', error);
    init();
  }
}


// Function to delete a role using the 'db' connection
async function deleteRole() {
  try {
    const roles = await db.promise().query('SELECT * FROM role');
    const roleChoices = roles[0].map(role => ({
      name: role.title,
      value: role.id,
    }));

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to delete?',
        choices: roleChoices,
      },
    ]);
    // This line is added to delete the role
    await db.promise().query('DELETE FROM role WHERE id = ?', [answers.roleId]);

    console.log('Role deleted successfully.');
    viewAllRoles();
  } catch (error) {
    console.error('Error deleting role.', error);
    init();
  }
}


// Display all employees using the 'db' connection
async function viewAllEmployees() {
  try {
    const [rows, fields] = await db.promise().query(`
      SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager 
      FROM employee e 
      LEFT JOIN role r ON e.role_id = r.id 
      LEFT JOIN department d ON r.department_id = d.id 
      LEFT JOIN employee m ON e.manager_id = m.id`);

    console.log('Displaying all employees successfully.');
    console.table(rows);
    init();
  } catch (error) {
    console.error('Error viewing all employees.', error);
    init();
  }
}


// Function to add a new employee using user input and the 'db' connection
async function addEmployee() {
  try {
    const roles = await db.promise().query('SELECT * FROM role');
    const managers = await db.promise().query('SELECT * FROM employee WHERE manager_id IS NULL');

    const roleChoices = roles[0].map(role => ({
      name: role.title,
      value: role.id,
    }));

    // Create an array of manager choices, including a "None" option
    const managerChoices = [
      ...managers[0].map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
      })),
      {
        name: 'None',
        value: null,
      },
    ];

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
      },
      {
        type: 'list',
        name: 'employeeRole',
        message: "What is the employee's role?",
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        choices: managerChoices,
      },
    ]);

    const result = await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.employeeRole, answers.employeeManager]);
    console.log('Employee added successfully.');
    viewAllEmployees();
  } catch (error) {
    console.error('Error adding employee.', error);
    init();
  }
}



// Function call to initialize app
init();
