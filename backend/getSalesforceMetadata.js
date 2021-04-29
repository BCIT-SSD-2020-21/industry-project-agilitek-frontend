const OAuth = require('/opt/OAuth');
const axios = require('axios');

exports.handler = async (event) => {
    const { sObjectType } = event.queryStringParameters;

    try {
        // Getting the OAuth token
        const OAuthRes = await OAuth();
        const OAuthData = await OAuthRes.getOAuthToken();

        const getMetadataRes = await axios.get(
            `${process.env.INSTANCE_URL}/services/data/v51.0/sobjects/${sObjectType}/describe`,
            {
                headers: {
                    Authorization: `Bearer ${OAuthData.access_token}`,
                },
            }
        );
        const metadata = getMetadataRes.data;

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({
                metadata: metadata.fields,
            }),
        };
    } catch (error) {
        throw Error(`Error while getting workflow inputs: ${error}`);
    }
};
