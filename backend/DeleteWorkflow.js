const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = (event, context, callback) => {
    const query = `
        DELETE FROM workflows 
        WHERE id = ${event.pathParameters.id};
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
            console.log(res);

            const response = {
                statusCode: 204,
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
