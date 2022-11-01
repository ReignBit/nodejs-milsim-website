const axios = require("axios");

module.exports = {
    async requestAccessToken(code, oAuth) {
        
        let params = new URLSearchParams();
        params.append("client_id", oAuth.clientId);
        params.append("client_secret", oAuth.clientSecret);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", oAuth.redirectUri);
        
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return await axios.post(oAuth.apiEndpoint + oAuth.endpoints.token, params, config)
            .then((resp) => {
                return resp.data;
            }).catch((err) => {
                return err.message;
            });
    },
    
    async refreshToken(token, oAuth) {
        let params = new URLSearchParams();
        params.append("client_id", oAuth.clientId);
        params.append("client_secret", oAuth.clientSecret);
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", token);
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return await axios.post(oAuth.apiEndpoint + oAuth.endpoints.token, params, config)
            .then((resp) => {
                return resp.data;
            }).catch((err) => {
                return err.message;
            });
    },
    
    async revokeToken(token, oAuth, type) {
        let params = new URLSearchParams();
        params.append("token", token);
        params.append("token_type_hint", type);

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return await axios.post(oAuth.apiEndpoint + oAuth.endpoints.token, params, config)
            .then((resp) => {
                return resp.data;
            }).catch((err) => {
                return err.message;
            });
    },

    setSession(oAuthResp, req, res) {
        /* Session means user is logged in. */
        try {
            oAuthResp.expires_at = oAuthResp.expires_in + Date.now();
            req.session.tokenInfo = oAuthResp;
            return true;
            
        } catch (error) {
            console.log("Failed to set session, oauth.js: ", error)
            return false;
        }
    }
}

