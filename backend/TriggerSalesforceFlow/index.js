const OAuth = require('/opt/OAuth');
const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { flowUrl, resultSet, query, index, step } = event.iterator;
    var input;

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

        return {
            iterator: {
                index,
                step,
            },
            response: {
                triggered_response: postData,
                body: JSON.stringify({
                    sql_query: query,
                    flow_url: flowUrl,
                }),
            },
        };
    } catch (error) {
        throw Error(`Error while requesting Salesforce API: ${error}`);
    }
};
