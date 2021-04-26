const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = (event, context, callback) => {
    
    // Query to select all active workflows from the Workflows table.
    const query = `select * from workflows where active = true`;
    
    // Instantiate an empty array that will be used to store the returned workflows.
    const workflows = [];

    const client = new Client(dbConfig);

    client.connect((err) => {
        if (err) {
            callback(err);
        }
    });

    // Uses the query string to query the database.
    client.query(query, (err, res) => {
        if (err) {
            callback(err);
        } else {
            // Loops through each row in the response and pushes it into an empty array.
            res.rows.forEach((row) => {
                workflows.push(row);
            });
            
           const response = {
               statuseCode: 200,
               body: workflows
           };
           
           callback(null, response);
           client.end();
        }
    });
};