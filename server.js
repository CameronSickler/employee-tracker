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

var updateEmplID = 0;

//there are 2x more prompts nested in the updateEmpl function due to scope issues







// functions responsible for displaying table data in terminal
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

    inquirer.prompt(addDeptQuestions)
        .then(answers => {

            // add new department
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            params = [answers.newDept];

            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);

                    return;
                }

                console.log(rows);
                init();
            });
        });
}

function addRole() {

    inquirer.prompt(addRoleQuestions)
        .then(answers => {

            // should add name, salary, department
            const sql = `INSERT INTO roles (name, salary, department_id) VALUES (?,?,?,?)`;
            const params = [answers.newRoleTitle, answers.newRoleSalary, answers.newRoleDept]

            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);

                    return;
                }

                console.log(rows);
                init();
            });

        });
}

function addEmpl() {

    inquirer.prompt(addEmplQuestions)
        .then(answers => {

            // should add firstname, lastname, role, and manager
            const sql = `INSERT INTO roles (first_name, last_name, role_id, department_id) VALUES (?,?,?,?)`;
            const params = [answers.newEmplFirstName, answers.newEmplLastName, answers.newEmplRole, answers.newEmplDept]

            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);

                    return;
                }

                console.log(rows);
                init();
            });

        });
}

// NEEDS TESTING AND WORK
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
                console.log("this is the updateEmplID after sending it to the global scope " + updateEmplID)

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

                            console.log("well here goes nothing  " + updateEmplID + "   " + answers.updateEmplRole)

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


// function updateEmpl() {

//     //queries for all employee info from db
//     const sqlEmpl = `SELECT * FROM employees`;
//     const sqlRole = `SELECT * FROM roles`;

//     connection.query(sqlEmpl, (err, rows1) => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         connection.query(sqlRole, (err, rows2) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }

//             const employees = rows1.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
//             const roles = rows2.map(({ id, title }) => ({ name: title, value: id }));

//             inquirer.prompt({
//                 type: 'list',
//                 name: 'updateEmplChoose',
//                 message: 'Which employee do you want to update?',
//                 choices: employees
//             }, {
//                 type: 'list',
//                 name: 'updateEmplRole',
//                 message: 'What is the new role?',
//                 choices: roles
//             })
//                 .then(answers => {

//                     console.log("employees " + employees)
//                     console.log("roles " + roles)
//                     console.log("answers " + answers)
//                     console.log("answers.updateEmplChoos " + answers.updateEmplChoose)
//                     console.log("answers.updateEmplRole " + answers.updateEmplRole)

//                     const sqlUpdate = `SELECT * FROM employees`;

//                     connection.query(sqlUpdate, (err, rows) => {
//                         if (err) {
//                             console.log(err);
//                             return;
//                         }

//                         console.log(rows);
//                         connection.end();
//                     });

//                 });
//         });
//     });
// }

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