// Controllers/MultipleImageController.js
const Image = require("../models/multipleImages");

module.exports.StoreImages = async (req, res) => {
  try {
    const imageUrl = req.file.path; // This is the temporary path of the uploaded image
    const publicId = req.body.public_id; // Assuming you send the public_id in the request body
    const image = new Image({ imageUrl, publicId }); // Save the publicId along with the image URL
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
