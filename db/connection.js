// Import and require 'mysql2'
const mysql = require('mysql2');

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
    // Print a message indicating a successful database connection
    console.log(`Connected to the employees_db database.`)
  );

//   Export the "db" variable
  module.exports = db;