// routes/urlRoutes.js
const express = require("express");
const router = express.Router();
const urlCtrl = require("../controllers/urlCtrl");

// POST - Shorten URL
router.post("/shorten", urlCtrl.createUrl);
router.post("/all-urls", urlCtrl.getAllUrls);
router.get("/url/:shortId", urlCtrl.getUrl);

// GET - Redirect to Original URL,
// PATCH - Edit the Original URL,
// DELETE - Delete the Original URL

router
  .route("/:shortId")
  .get(urlCtrl.fetchUrl)
  .patch(urlCtrl.updateUrl)
  .delete(urlCtrl.deleteUrl);

module.exports = router;
