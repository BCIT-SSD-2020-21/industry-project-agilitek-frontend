const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = (event, context, callback) => {
    const query = `
        SELECT * 
        FROM workflows 
        WHERE id = ${event.pathParameters.id}
        `;
    var statusCode = 200;
    var resBody = {};

    const client = new Client(dbConfig);

    client.connect((err) => {
        if (err) {
            callback(err);
        }
    });

    client.query(query, (err, res) => {
        if (err) {
            callback(err);
        } else {
            // Check if the data exists in the database
            if (res.rows[0]) {
                resBody = res.rows[0];
            } else {
                statusCode = 404;
                resBody = {
                    errorMessage: 'Data source not found',
                };
            }

            const response = {
                statusCode,
                body: JSON.stringify(resBody),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            };

            callback(null, response);
            client.end();
        }
    });
};
