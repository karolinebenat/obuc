"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./shared/app");
const routes_1 = require("./routes");
const appConfig_1 = require("./shared/appConfig");
app_1.app.use(routes_1.router);
const port = appConfig_1.config.API.port;
app_1.app.listen(port, () => {
    console.log('Listening on port ' + port);
});
