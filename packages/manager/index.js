//const { log } = require("@spaship/common/lib/logging/pino");
const app = require("./app");
const db = require("./db");
const config = require("./config");
const pkgJSON = require("./package.json");

if (process.env.NODE_ENV === "production") {
  console.log(config.toObject(), `Starting SPAship ${pkgJSON.version} with the following settings`);
} else {
  console.log(
    config.toObject(),
    `
███████╗██████╗  █████╗ ███████╗██╗  ██╗██╗██████╗  ██╗
██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║██║██╔══██╗ ╚██╗
███████╗██████╔╝███████║███████╗███████║██║██████╔╝  ╚██╗
╚════██║██╔═══╝ ██╔══██║╚════██║██╔══██║██║██╔═══╝   ██╔╝
███████║██║     ██║  ██║███████║██║  ██║██║██║      ██╔╝
╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝      ╚═╝
Starting SPAship version ${pkgJSON.version}.

Listening on http://${config.get("host")}:${config.get("port")}`
  );
}

(async () => {
  await db.connect();
  let server = app.listen(config.get("port"), () => {
    console.log("Server started !");
  });

  server.timeout = 0; // no timeout
  // server.keepAliveTimeout = 300000;
})();
