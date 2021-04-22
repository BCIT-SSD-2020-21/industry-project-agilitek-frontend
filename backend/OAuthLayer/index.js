const fetch = require('node-fetch');

module.exports = async () => {
    const body = {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        grant_type: process.env.GRANT_TYPE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    };

    const res = await fetch(
        `${process.env.INSTANCE_URL}/services/oauth2/token`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(body),
        }
    );

    const data = await res.json();

    return data.access_token;
};
