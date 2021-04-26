const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const { Client } = require('pg');
const { dbConfig } = require('/opt/config');

// NOTE: This fn is invoking the getActiveWorkflows fn.
exports.handler = async(event, context, callback) => {

    // params is an object that stores the configuration used in the invoke lambda method.
    // FunctionName = name of the lambda fn to be invoked.
    const getActiveWorkflowsParams = {
        FunctionName: 'getActiveWorkflows',
        InvocationType: 'RequestResponse'
    };

    // Invokes a lambda fn and saves the response that was returned from the invoked fn.
    // In this case, the invoked fn returns a response body with a statusCode and and array of workflows as the body.
    const invokedGetActiveWorkflowsResponse = await lambda.invoke(getActiveWorkflowsParams, (err, data) => {
        if (err) {
            throw err;
        }
        else {
            return data.Payload;
        }
    }).promise();

    // Parses the value returned from the invoked fn.
    const parsedLambdaResponse = JSON.parse(invokedGetActiveWorkflowsResponse.Payload);

    const client = new Client(dbConfig);

    client.connect((err) => {
        if (err) {
            throw err;
        }
    });

    // Saves the body from the response object returned from the invoked method.
    // In this case, the body is an array of workflows.
    const workflows = parsedLambdaResponse.body;

    // Calls the getResultSets fn and stores the response.
    const resultSet = await getResultSets(workflows, client);
    client.end();

    const response = {
        statusCode: 200,
        body: resultSet
    };

    return response;
};

// Returns an array of arrays containing SalesforceContact id's.
const getResultSets = async(workflows, client) => {

    // An empty array that will store the results of each workflows SQL query.
    const queryResults = [];

    // Loops through the collection of workflows.
    for (let i = 0; i < workflows.length; i++) {
        // Stores the workflows SQL query into a variable.
        const workflowQuery = workflows[i].sql_query;

        try {
            // Use the stored query to query the database.
            const queryResponse = await client.query(workflowQuery);
            // Pushes the response rows of the query into the queryResults array.
            // In this case, the response rows will be contact id(s) from the SalesforceContacts table.
            queryResults.push(queryResponse.rows);
            
            // Post contact id's returned from the query to the workflows flow_url.
            // In this case, I'm only posting one single contact id to Create_Opportunity since I don't know how to send data to Create_Opportunities yet.
            const invokedLambdaResponse = await invokeSalesforceFlow(workflows[i].flow_url, queryResponse.rows[0].id);
            
            console.log('Lambda Response', invokedLambdaResponse);
        }
        catch (err) {
            throw err;
        }
    }

    return queryResults;
    // NOTE: I'm just returning an array of query results for testing purposes.
    //       I think our goal will be to make an axios POST request inside of the for loop for each query.
    //       So instead of pushing into an array, we would pass the res.rows to the POST request.
    // ALSO NOTE: I'm not checking the contact_workflows table to see if a contact has had a flow applied to them.
};


const invokeSalesforceFlow = async (flowUrl, inputs) => {
    const workflowData = {
        flowUrl,
        inputs
    };
    
    const triggerSalesforceFlowParams = {
        FunctionName: 'triggerSalesforceFlow',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify(workflowData)
    };
    
    const dataFromChild = await lambda.invoke(triggerSalesforceFlowParams, (err, data) => {
        if (err) {
            throw err;
        } else {
            return data.Payload;
        }
    }).promise();
    
    return dataFromChild;
};