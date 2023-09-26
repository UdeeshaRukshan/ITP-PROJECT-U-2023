// Controllers/MultipleImageController.js
const Image = require("../models/multipleImages");

module.exports.StoreImages = async (req, res) => {
  try {
    const imageUrl = req.file.path; // This is the temporary path of the uploaded image
    const image = new Image({ imageUrl });
    await image.save();
    res.status(201).json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Image upload failed" });
  }
};
module.exports.GetImages = async (req, res) => {
  try {
    const images = await Image.find();
    const imageUrls = images.map((image) => image.imageUrl);
    res.json(imageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve images" });
  }
};
