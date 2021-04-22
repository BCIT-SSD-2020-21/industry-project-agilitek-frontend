const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

module.exports = async () => {
    try {
        // Setup body object
        const params = new URLSearchParams();
        params.append('username', process.env.USERNAME);
        params.append(
            'password',
            `${process.env.PASSWORD}${process.env.SECURITY_TOKEN}`
        );
        params.append('grant_type', process.env.GRANT_TYPE);
        params.append('client_id', process.env.CLIENT_ID);
        params.append('client_secret', process.env.CLIENT_SECRET);

        // Get the OAuth token
        const res = await fetch(
            `${process.env.INSTANCE_URL}/services/oauth2/token`,
            {
                method: 'POST',
                body: params,
            }
        );
        const data = await res.json();

        // Check if data is undefined
        if (data) {
            return data.access_token;
        }
    } catch (error) {
        throw Error(`Error while getting an OAuth 2.0 token: ${error}`);
    }
};
