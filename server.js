// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'employee_tracker'
});



// main menu question used by inquirer within the init function
const questions = [{
    type: 'list',
    name: 'mainMenu',
    message: 'What would you like to do?',
    choices: [
        'view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role',
        'quit']
}]


// functions responsible for displaying table data in terminal
function viewAllDepts() {

    console.log('we made it to view all depts function')
    const sql = `SELECT * FROM departments;`;

    //this was code pulled from module not sure if this is what to use?
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);

            return;
        }

        console.log(rows);

    });

}

function viewAllRoles() {

    console.log('we made it to view all roles function')
    const sql = `SELECT * FROM roles;`;

    //this was code pulled from module not sure if this is what to use?
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);

            return;
        }

        console.log(rows);

    });

}

function viewAllEmpls() {

    console.log('we made it to view all employees function')
    const sql = `SELECT * FROM employees;`;

    //this was code pulled from module not sure if this is what to use?
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);

            return;
        }

        console.log(rows);

    });

}

function addDept() {
    // should add name of department
    console.log('made it')
}

function addRole() {
    // should add name, salary, department
    console.log('made it')
}

function addEmpl() {
    // should add firstname, lastname, role, and manager
    console.log('made it')
}

function updateEmpl() {
    // select employee, update role, and repopulate database
    console.log('made it')
}

function quit() {

    console.log('Thank you for using the employee tracker, goodbye.')
}



// initial function to begin inquirer prompts
function init() {

    inquirer.prompt(questions)
        .then(answers => {

            console.log('we made it just before the switch');
            console.log('here is the answers.mainMenu log ' + answers.mainMenu);

            // switch to display selected changes in terminal
            switch (answers.mainMenu) {


                case 'view all departments':
                    viewAllDepts();
                    break;

                case 'view all roles':
                    viewAllRoles();
                    break;

                case 'view all employees':
                    viewAllEmpls();
                    break;

                case 'add a department':
                    addDept();
                    break;

                case 'add a role':
                    addRole();
                    break;

                case 'add an employee':
                    addEmpl();
                    break;

                case 'update an employee role':
                    updateEmpl();
                    break;

                case 'quit':
                    quit();
                    break;
            };

        });

};



// function call to begin application
init();
