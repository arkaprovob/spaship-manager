const { Router } = require("express");
const getSPAList = require("../controllers/websites/getSPAList");
const getWebsiteList = require("../controllers/websites/getWebsiteList");
const gitOperations = require("../controllers/websites/gitOperations/gitOperations");
const saveWebsite = require("../controllers/websites/saveWebsite");
const router = new Router();

router.post("/", gitOperations);

router.get("/list", getWebsiteList);

router.get("/getSpaList/:websiteName", getSPAList);

module.exports = router;