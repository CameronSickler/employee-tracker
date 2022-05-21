// require variables
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


// global variables that are updated 
//and used for populating inquirer question choices
var addRoleDepartmentID = 0;

var addEmplRoleID = 0;

var updateEmplID = 0;


// BEGIN functions

//view all depts
function viewAllDepts() {

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

//view all roles
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

//view all employees
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

//add a department
function addDept() {

    inquirer.prompt(addDeptQuestions)
        .then(answers => {

            // add new department
            const sql = `INSERT INTO departments (names) VALUES (?)`;
            params = [answers.newDept];

            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log(rows);
                viewAllDepts();
            });
        });
}

//add a role
function addRole() {


    const sql1 = `SELECT * FROM departments;`;

    connection.query(sql1, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        //saves local variable to populate inquirer choices for picking a department_id later
        const departments = rows.map(({ id, names }) => ({ name: names, value: id }));
        console.log(rows);

        inquirer.prompt([{
            type: 'input',
            name: 'newRoleTitle',
            message: 'What is the name of the role you wish to add?'
        }, {
            type: 'input',
            name: 'newRoleSalary',
            message: 'What is the salary for the new role?'
        }, {
            type: 'list',
            name: 'newRoleDept',
            message: 'What is the department for the new role?',
            choices: departments
        }])
            .then(answers => {

                //push value to global scope
                addRoleDepartmentID = answers.newRoleDept

                //Inserts new role into database
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                const params = [answers.newRoleTitle, answers.newRoleSalary, addRoleDepartmentID]

                connection.query(sql, params, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(rows);
                    viewAllRoles();
                });
            });
    });
};

//add an employee
function addEmpl() {

    //const for database
    const sql = `SELECT * FROM roles;`;

    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        const roles = rows.map(({ id, title }) => ({ name: title, value: id }));
        console.log(rows)


        inquirer.prompt([{
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
            type: 'list',
            name: 'newEmplRole',
            message: 'What is the role of the new employee?',
            choices: roles
        }])

            .then(answers => {

                addEmplRoleID = answers.newEmplRole
                // should add firstname, lastname, role, and manager
                const sql1 = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`;
                const params = [answers.newEmplFirstName, answers.newEmplLastName, addEmplRoleID]

                connection.query(sql1, params, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(rows);
                    viewAllEmpls();
                });
            });
    });
}

//update a pre-existing employee's role
function updateEmpl() {

    //queries for all employee info from db
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        //saves an array of objects that represent employees to be used to populate choices in the following inquirer prompt
        const employees = rows.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        //prompts user to pick an employee to update and the available choices are pulled from the previous db query
        inquirer.prompt({
            type: 'list',
            name: 'updateEmplChoose',
            message: 'Which employee do you want to update?',
            choices: employees
        })
            .then(answers => {

                //sends the id to a global variable to be referenced later
                updateEmplID = answers.updateEmplChoose

                //runs another db query for all roles info from db
                const sql = `SELECT * FROM roles`;
                connection.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    //saves an array of objects that represent roles to be used to populate choices in the following inquirer prompt
                    const roles = rows.map(({ id, title }) => ({ name: title, value: id }));

                    //prompts user to pick a new role for the employee using roles from previous db query
                    inquirer.prompt({
                        type: 'list',
                        name: 'updateEmplRole',
                        message: 'What is the new role?',
                        choices: roles
                    })
                        .then(answers => {

                            //should choose employee, update role, and repopulate table
                            const sql = `UPDATE employees SET role_id = (?) WHERE id = (?);`;
                            const params = [answers.updateEmplRole, updateEmplID]

                            connection.query(sql, params, (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }

                                console.log(rows);
                                viewAllEmpls();
                            });
                        });
                });
            });
    });
}

//ends connection
function quit() {

    console.log("================================")
    console.log("=====       Thank you      =====")
    console.log("=====        Goodbye!      =====")
    console.log("================================")

    connection.end();
}

// call to begin application
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

}

// END functions



function title() {

    console.log("===============================")
    console.log("=====   Employee Tracker  =====")
    console.log("=====      By Cameron     =====")
    console.log("===============================")

}

// function calls to begin application
title();
init();