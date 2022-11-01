const config = require("./config.json");
const app = require("./app");



// listen
app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
})