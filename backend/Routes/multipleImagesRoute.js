// routes/multipleImage.js
const router = require("express").Router();
const { GetImages, StoreImages } = require("../Controllers/MultipleImages");

router.get("/api/getimages", GetImages);
router.post("/api/setimages", StoreImages);

module.exports = router;
