

function generateTables(answers) {

    //can I use dot notation here?
    if (answers.mainMenu === 'view all departments') {

        const sql = `SELECT * departments`;

        return sql;
        //is this enough?

        //this was code pulled from module not sure if this is what to use?
        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });

    }

    //would have a bunch of else if statements for other options here

}