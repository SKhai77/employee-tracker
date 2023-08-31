// Import and require 'mysql2'
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypass',
  database: 'employees_db'
});

// Print a message indicating a successful database connection
db.promise()
  .connect()
  .then(() => {
    console.log(`\n Connected to the "employees_db" database.\n Welcome to Employee Tracking System!`);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Export the "db" variable
module.exports = db;
