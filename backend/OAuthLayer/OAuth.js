const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

module.exports = function () {
    async function getOAuthToken() {
        try {
            // Setup body object
            const params = new URLSearchParams();
            params.append('username', process.env.USERNAME);
            params.append(
                'password',
                process.env.PASSWORDprocess.env.SECURITY_TOKEN
            );
            params.append('grant_type', process.env.GRANT_TYPE);
            params.append('client_id', process.env.CLIENT_ID);
            params.append('client_secret', process.env.CLIENT_SECRET);

            // Get the OAuth token
            const res = await fetch(
                `${process.env.INSTANCE_URL}/services/oauth2/token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params,
                }
            );
            const data = await res.json();

            return data;
        } catch (error) {
            throw Error(`Error while getting an OAuth 2.0 token: ${error}`);
        }
    }

    return { getOAuthToken };
};
