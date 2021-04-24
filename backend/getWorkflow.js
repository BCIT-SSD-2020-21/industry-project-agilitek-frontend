const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = (event, context, callback) => {
    const query = `
        SELECT * 
        FROM workflows 
        WHERE workflowid = ${event.pathParameters.id}
        `;

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
            const response = {
                statusCode: 200,
                body: JSON.stringify(res.rows[0]),
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
