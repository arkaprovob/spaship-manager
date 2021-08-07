const { Router } = require("express");
const gitOperations = require("../controllers/websites/gitOperations/gitOperations");
const saveWebsite = require("../controllers/websites/saveWebsite");
const router = new Router();

router.post("/", gitOperations);
router.get("/", gitOperations);

module.exports = router;