// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'test'
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
        // the remaining options are bonus? confirm w/ tutor
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role',
        'quit']
}]


function init() {


    inquirer.prompt(questions)
        .then(answers => {


            let content = generateTables(answers)


            // Create a function to write over the sql file? and run it somehow?
            fs.writeFile('name of sql file here', content, err => {
                if (err) throw err
                console.log('File saved!')
            })
        });
}

init();
