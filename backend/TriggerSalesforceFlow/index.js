const OAuth = require('/opt/OAuth');
const fetch = require('node-fetch');

exports.handler = async (event) => {
    var endpoint = '';
    var method = '';
    var inputs;

    // Getting the body
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body);

        endpoint = body.endpoint;
        method = body.method;
        inputs = body.inputs;
    }

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        // HTTP request on Salesforce endpoint
        const response = await fetch(`${INSTANCE_URL}${endpoint}`, {
            method,
            headers: {
                Authorization: `Bearer ${OAuthData.access_token}`,
            },
            body: {
                inputs,
            },
        });
        const data = await response.json();

        return data;
    } catch (error) {
        throw Error(`Error while requesting Salesforce API: ${error}`);
    }
};
