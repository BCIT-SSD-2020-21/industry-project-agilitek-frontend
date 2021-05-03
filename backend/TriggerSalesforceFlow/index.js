const OAuth = require('/opt/OAuth');
const fetch = require('node-fetch');
const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

exports.handler = async (event) => {
    const {
        flowUrl,
        resultSet,
        workflowId,
        label,
        type,
        sObjectType,
    } = event.iterator;
    var input;

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        // Check if the workflow's inputs is a sObject type
        // TRUE: Set sObjectType variable
        // FALSE: Set result variable to the Id string
        if (resultSet.length > 0) {
            if (type === 'SOBJECT') {
                // Check if the resultSet has more than one item
                // TRUE: set the result to an array of objects with attributes
                // field and all the columns from the SalesforceContacts
                // table
                // FALSE: set result to an object with attributes field
                // and all the columns from the SalesforceContacts table
                if (resultSet.length > 1) {
                    input = [];

                    resultSet.forEach((result) => {
                        input.push({
                            attributes: { type: sObjectType },
                            ...result,
                        });
                    });
                } else {
                    input = {
                        attributes: { type: sObjectType },
                        ...resultSet[0],
                    };
                }
            } else {
                input = resultSet[0].Id;
            }
            // Post request to Salesforce API
            const postResponse = await fetch(
                `${process.env.INSTANCE_URL}${flowUrl}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${OAuthData.access_token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: [
                            {
                                [label]: input,
                            },
                        ],
                    }),
                }
            );

            const postData = await postResponse.json();

            await insertWorkflowLog(postData, workflowId);
            event.apiResponse = postData;
        }

        return event;
    } catch (error) {
        throw Error(`Error while requesting Salesforce API: ${error}`);
    }
};

// Should maybe break this logic up into a separate lambda.
async function insertWorkflowLog(responseData, workflowId) {
    const actionName = responseData[0].actionName;
    let recordId;
    let query;

    if (responseData[0].outputValues !== null) {
        recordId = responseData[0].outputValues.recordId;
        query = `
            insert into workflow_logs (workflow_id, action_name, time_of_completion, record_id) 
            values (${workflowId}, '${actionName}', current_timestamp, ${recordId});`;
    } else {
        query = `
            insert into workflow_logs (workflow_id, action_name, time_of_completion) 
            values (${workflowId}, '${actionName}', current_timestamp);`;
    }

    const client = new Client(dbConfig);

    await client.connect((err) => {
        if (err) {
            throw err;
        }
    });

    await client.query(query);
}
