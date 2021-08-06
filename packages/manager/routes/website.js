const { Router } = require("express");
const saveWebsite = require("../controllers/websites/saveWebsite");

const router = new Router();

router.post("/", saveWebsite);

module.exports = router;