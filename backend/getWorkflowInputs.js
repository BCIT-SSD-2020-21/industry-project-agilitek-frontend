const OAuth = require('/opt/OAuth');
const axios = require('axios');

exports.handler = async (event) => {
    const { flowUrl } = event;
    var result = {};

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        // Get request to Salesforce API
        // Get the inputs field
        const getInputsResponse = await axios.get(
            `${process.env.INSTANCE_URL}${flowUrl}`,
            {
                headers: {
                    Authorization: `Bearer ${OAuthData.access_token}`,
                },
            }
        );
        const inputsData = getInputsResponse.data;

        // Set label
        result.label = inputsData.inputs[0].label;
        // Set input data type
        result.type = inputsData.inputs[0].type;

        // Check if the workflow's inputs is a sObject type
        // TRUE: Set sObjectType
        if (inputsData.inputs[0].type === 'SOBJECT') {
            result.sObjectType = inputsData.inputs[0].sobjectType;
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify(result),
        };
    } catch (error) {
        throw Error(`Error while getting workflow inputs: ${error}`);
    }
};
