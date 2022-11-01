const url = require("url");

const config = require("../../../config")
const oauth = require("../../../utils/oauth");
const discord = require("../../../utils/discord");

// TODO: Jesus this is a mess
async function getAuthentication(req, res) {
    let q = url.parse(req.url);
    let code = q.query.split("&")[0].split("=")[1];
    
    try {
        let tokenInfo = await oauth.requestAccessToken(code, config.oAuth);
        oauth.setSession(tokenInfo, req, res);
        // USER IS NOW LOGGED IN
        let data = await discord.getUserFromDiscord(tokenInfo.access_token);
        // console.log(data);
        req.session.discordUser = {id: data.id, avatar: data.avatar, username: data.username, discriminator: data.discriminator};
        req.session.alerts = [];
        req.session.loggedIn = true;
        

        // Let's check if the user has joined our discord guild.
        let accessToken = req.session.tokenInfo.access_token;
        let guild = await discord.isUserInGuild(accessToken, config.discord.milsim.id);
        // console.log("GUILD: ", guild)
        if (!guild) {
            console.log(req.session.alerts);
            req.session.alerts.push("NOT_IN_DISCORD");
        } else {
            // We're in the discord server, let's attempt to get member data.
            let memberData = await discord.getGuildMemberData(accessToken, config.discord.milsim.id);
            if (!memberData) { req.session.alerts.push("INVALID_MEMBER_STATE"); } else {
                
                let discordMember = {
                    id: memberData.user.id,
                    username: memberData.nick ?? memberData.user.username,
                    avatar: memberData.avatar ?? memberData.user.avatar,
                    discriminator: memberData.user.discriminator,
                }


                memberData.roles.forEach(role => {
                    if (role == config.discord.milsim.roles.member || config.discord.milsim.roles.member === "") { 
                        discordMember = {...discordMember, permission: 0}
                    }
                    // if (role == config.discord.milsim.roles.admin || config.discord.milsim.roles.admin === "") { 
                    //     discordMember = {...discordMember, permission: 1}
                    // }
                });

                
                req.session.discordUser = discordMember;
                // Also need to set cookies for client-side api access
                res.cookie("token", req.session.tokenInfo.access_token, {maxAge: req.session.tokenInfo.expires_in * 1000});
            }

        }



        
    } catch (error) {
        console.log("Error in oauthapi.js during /auth: ", error)
    }

    // Redirect back home.
    res.redirect("/");    
}

async function revokeAuthentication(req, res) {
    if (req.session) {
        let access = req.session.tokenInfo.access_token;
        let refresh = req.session.tokenInfo.refresh_token;
        await oauth.revokeToken(access, config.oAuth, "access_token");
        await oauth.revokeToken(refresh, config.oAuth, "refresh_token");
        
        // Clear tokenInfo and user, just in case the session doesn't get destroyed for whatever reason.
        req.session.tokenInfo = {};
        req.session.user = {};
        req.session.discordUser = {};
        req.session.loggedIn = false;
        req.session.destroy();

        res.clearCookie("token");

    }

    res.redirect("/");
}

module.exports = {
    getAuthentication,
    revokeAuthentication
}