const fetch = require('node-fetch');
const qs = require('qs');

module.exports = function () {
    async function getOAuthToken() {
        try {
            // Get the OAuth token
            const res = await fetch(
                `${process.env.INSTANCE_URL}/services/oauth2/token`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: qs.stringify({
                        username: process.env.USERNAME,
                        password: `${process.env.PASSWORD}${process.env.SECURITY_TOKEN}`,
                        grant_type: process.env.GRANT_TYPE,
                        client_id: process.env.CLIENT_ID,
                        client_secret: process.env.CLIENT_SECRET,
                    }),
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
