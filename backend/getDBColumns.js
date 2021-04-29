const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = (event, context, callback) => {
    const query = `SELECT column_name 
                   FROM information_schema.columns 
                   WHERE table_name = '${event.pathParameters.table_name}'`;

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
                statusCode: 200,
                body: JSON.stringify(res.rows),
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
