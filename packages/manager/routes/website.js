const { Router } = require("express");
const getWebsiteList = require("../controllers/websites/getWebsiteList");
const gitOperations = require("../controllers/websites/gitOperations/gitOperations");
const saveWebsite = require("../controllers/websites/saveWebsite");
const router = new Router();

router.post("/", gitOperations);
router.get("/", gitOperations);

router.get("/list", getWebsiteList);


module.exports = router;