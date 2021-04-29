const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = (event, context, callback) => {
    
    const body = JSON.parse(event.body)
    const query =
        `
        UPDATE workflows 
        SET 
            name = '${body.name}',
            flow_url = '${body.flowUrl}',
            sql_query = '${body.query}',
            description = '${body.desc}',
            active = ${body.active}
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
        }
        else {
            const response = {
                statusCode: 200,
                body: JSON.stringify(res),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
                }
            };
            callback(null, response);
            client.end();
        }
    });
};
