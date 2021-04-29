const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = async function iterator (event, context, callback) {
    let index = event.iterator.index;
    const step = event.iterator.step;
    
    const parsedBody = JSON.parse(event.response.body);
    const count = parsedBody.length;
    let flowUrl;
    let query;
    let workflowId;
    let resultSet;

    if (index < count) {
        query = parsedBody[index].sql_query;
        flowUrl = parsedBody[index].flow_url;
        workflowId = parsedBody[index].id;
        
        const client = new Client(dbConfig);

        await client.connect((err) => {
            if (err) {
                callback(err);
            }
        });

        let queryResponse = {};

        if (parsedBody[index].run_again){
            queryResponse = await client.query(query);
        } else {
            queryResponse = await client.query(` 
                    select sc.id from contact_workflows cw 
	                    right join "SalesforceContacts" sc
	                    on sc.id = cw.contact_id
                    where contact_id not in (select contact_id from contact_workflows cw2 where workflow_id = ${workflowId}) 
                        or workflow_id is null
	                    and sc.id in (${query})
                    group by sc.id;`
            );
        }
        
        resultSet = queryResponse.rows;
        
        for (let i = 0; i < resultSet.length; i++) {
            
            // check if composite key already exists
            const contactId = await client.query(`
                select contact_id from contact_workflows cw 
                where workflow_id = ${workflowId} and contact_id = '${resultSet[i].Id}'`
            )
            
            if (!contactId) {
                await client.query(
                    `insert into contact_workflows values (${parsedBody[index].id}, '${resultSet[i].Id}');`
                );    
            }
        }
        client.end();
    }

    index += step;

    return {
        index,
        step,
        count,
        workflowId,
        resultSet,
        flowUrl,
        continue: index <= count
    };
};