const connection = require('./connection');
const inquirer = require('inquirer');

class  routes {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepartments() {
        return this.connection.promise().query(
            "SELECT * FROM department"
        )
    }

    addDepartment() {

    }

};

module.exports = new routes(connection);