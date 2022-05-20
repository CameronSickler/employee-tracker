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

// discuss how much js I should expect to complete this project
// when compared to the module


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

// function init() {

//     inquirer.prompt(questions)
//         .then(answers => {

//             console.log('we made it just before the switch');
//             console.log('here is the answers.mainMenu log ' + answers.mainMenu);


//             switch (answers.mainMenu) {

//                 // cases here
//                 case 'view all departments':
//                     viewAllDepts();
//                     break;

//                 case 'view all roles':
//                     viewAllRoles();
//                     break;

//                 case 'view all employees':
//                     viewAllEmpls();
//                     break;
//             };


//             // i could inject a function call to another js file here if I want
//             // using require and module.export. Not neccessary though
//             // let content = generateTables(answers)

//         });

// };


function init() {

    inquirer.prompt(questions)
        .then(answers => {

            console.log('we made it just before the switch');
            console.log('here is the answers.mainMenu log ' + answers.mainMenu);


            switch (answers.mainMenu) {

                // cases here
                case 'view all departments':
                    viewAllDepts();
                    break;

                case 'view all roles':
                    viewAllRoles();
                    break;

                case 'view all employees':
                    viewAllEmpls();
                    break;
            };


            // i could inject a function call to another js file here if I want
            // using require and module.export. Not neccessary though
            // let content = generateTables(answers)

        });

};




init();
