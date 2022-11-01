const axios = require("axios");


async function getUserFromDiscord(accessToken) {
    let data = await axios({
        method: "GET",
        url: "https://discordapp.com/api/users/@me",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(async (r) => {
        return r.data;
        
    }).catch((e) => {
        // Must not have been logged in, or discord is down. Either way, do not log in and return to homepage.
        console.log(`Failed to get user data ${e}`)
    });

    return data;
}

async function isUserInGuild(accessToken, guildId) {
    let data = await axios({
        method: "GET",
        url: "https://discordapp.com/api/users/@me/guilds",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(async (r) => {
        return r.data.find((guild) => guild.id === guildId);
    }).catch((e) => {
        // Must not have been logged in, or discord is down. Either way, do not log in and return to homepage.
        console.log(`Failed to guild data ${e}`);
        return null;
    });

    return data;
}

async function getGuildMemberData(accessToken, guildId) {
    let data = await axios({
        method: "GET",
        url: `https://discordapp.com/api/users/@me/guilds/${guildId}/member`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(async (r) => {
        return r.data;
    }).catch((e) => {
        // Must not have been logged in, or discord is down. Either way, do not log in and return to homepage.
        console.log(`Failed to guild member data ${e}`);
        return null;
    });
    return data;
}

module.exports = {
    getUserFromDiscord,
    getGuildMemberData,
    isUserInGuild
}