const OAuth = require('/opt/OAuth');
const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Getting the body
    const { flowUrl, resultSet, query } = event.workflowData;
    const { index, step } = event.iterator;
    var result;

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        // Get request to Salesforce API
        // Get the label from the inputs field
        const getLabelResponse = await fetch(
            `${process.env.INSTANCE_URL}${flowUrl}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${OAuthData.access_token}`,
                },
            }
        );
        const getLabelData = await getLabelResponse.json();

        const label = getLabelData.inputs[0].label;

        // Check if the workflow's inputs is a sObject type
        // TRUE: Set sObjectType variable
        // FALSE: Set result variable to the Id string
        if (getLabelData.inputs[0].type === 'SOBJECT') {
            let sObjectType = getLabelData.inputs[0].sobjectType;

            // Check if the resultSet has more than one item
            // TRUE: set the result to an array of objects with attributes
            // field and all the columns from the SalesforceContacts
            // table
            // FALSE: set result to an object with attributes field
            // and all the columns from the SalesforceContacts table
            if (resultSet.length > 1) {
                result = [];

                resultSet.forEach((input, index) => {
                    result.push({
                        attributes: { type: sObjectType },
                        ...resultSet[index],
                    });
                });
            } else {
                result = {
                    attributes: { type: sObjectType },
                    ...resultSet[0],
                };
            }
        } else {
            result = resultSet[0].Id;
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
                            [label]: result,
                        },
                    ],
                }),
            }
        );
        const postData = await postResponse.json();

        return {
            iterator: {
                index,
                step,
            },
            body: JSON.stringify({
                triggered_response: postData,
                sql_query: query,
                flow_url: flowUrl,
            }),
        };
    } catch (error) {
        throw Error(`Error while requesting Salesforce API: ${error}`);
    }
};
