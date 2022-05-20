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



//const variables for housing inquier questions
const menuQuestions = [{
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

const addDeptQuestions = [{
    type: 'input',
    name: 'newDept',
    message: 'What is the name of the department you wish to add?',
}]

const addRoleQuestions = [{
    type: 'input',
    name: 'newRoleTitle',
    message: 'What is the name of the role you wish to add?',
},
{
    type: 'input',
    name: 'newRoleSalary',
    message: 'What is the salary for the new role?',
},
{
    type: 'input',
    name: 'newRoleDept',
    message: 'What is the department for the new role?',
}]

const addEmplQuestions = [{
    type: 'input',
    name: 'newEmplFirstName',
    message: 'What is the first name of the new employee?',
},
{
    type: 'input',
    name: 'newEmplLastName',
    message: 'What is the last name of the new employee?',
},
{
    type: 'input',
    name: 'newEmplRole',
    message: 'What is the role of the new employee?',
},
{
    type: 'input',
    name: 'newEmplDept',
    message: 'What is the department of the new employee?',
}]

const updateEmplQuestions = []



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
        init();
    });

}

function viewAllRoles() {

    const sql = `SELECT * FROM roles;`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);

            return;
        }

        console.log(rows);
        init();
    });

}

function viewAllEmpls() {

    const sql = `SELECT * FROM employees;`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);

            return;
        }

        console.log(rows);
        init();
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

    inquirer.prompt(menuQuestions)
        .then(answers => {

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
