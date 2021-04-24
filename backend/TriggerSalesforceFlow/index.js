const OAuth = require('/opt/OAuth');
const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Getting the body
    const { endpoint, inputs } = event;
    var label = '';

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        // Get flow label
        const getLabelResponse = await fetch(
            `${process.env.INSTANCE_URL}${endpoint}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${OAuthData.access_token}`,
                },
            }
        );
        const getLabelData = await getLabelResponse.json();

        // Check if label exists
        // If exists then assign the label
        // Else return an error message
        if (
            getLabelData &&
            getLabelData.inputs[0] &&
            getLabelData.inputs[0].label
        ) {
            label = getLabelData.inputs[0].label;
        } else {
            return {
                statusCode: 400,
                'Access-Control-Allow-Origin': '*',
                body: JSON.stringify({
                    errorMessage: 'Label not found',
                }),
            };
        }

        // Post request to Salesforce API
        const postResponse = await fetch(
            `${process.env.INSTANCE_URL}${endpoint}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${OAuthData.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: [{ [label]: inputs }],
                }),
            }
        );
        const postData = await postResponse.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(postData),
        };
    } catch (error) {
        throw Error(`Error while requesting Salesforce API: ${error}`);
    }
};
