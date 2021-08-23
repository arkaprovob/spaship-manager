const { Router } = require("express");

const applications = require("./applications");
const apiKeys = require("./apiKeys");
const event = require("./event");
const website = require("./website");
const router = new Router();

const v1 = new Router();
v1.use("/applications", applications);
v1.use("/apiKeys", apiKeys);
v1.use("/event", event);
v1.use("/website", website);

router.use("/v1", v1);

module.exports = router;
