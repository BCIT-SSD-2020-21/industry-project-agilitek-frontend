const OAuth = require('/opt/OAuth');
const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Getting the body
    const { endpoint, method, inputs } = event;

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        // HTTP request on Salesforce endpoint
        var response = {};

        if (method.toLowerCase() === 'get') {
            response = await fetch(
                `${process.env.INSTANCE_URL}${endpoint}?inputs=${inputs}`,
                {
                    method,
                    headers: {
                        Authorization: `Bearer ${OAuthData.access_token}`,
                    },
                }
            );
        } else if (method.toLowerCase() === 'post') {
            response = await fetch(`${process.env.INSTANCE_URL}${endpoint}`, {
                method,
                headers: {
                    Authorization: `Bearer ${OAuthData.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs,
                }),
            });
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        throw Error(`Error while requesting Salesforce API: ${error}`);
    }
};
