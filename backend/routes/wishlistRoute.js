const express = require("express");
const { WishList } = require("../models/wishlist");

const router = express.Router();

// Route for Save a new WishList
router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear, content } = request.body;

    if (!title || !author || !publishYear || !content) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear, content",
      });
    }

    const newWishList = {
      title,
      author,
      publishYear,
      content,
    };

    const wishlist = await WishList.create(newWishList);

    return response.status(201).send(wishlist);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All WishLists from the database
router.get("/", async (request, response) => {
  try {
    const wishlists = await WishList.find({});

    return response.status(200).json({
      count: wishlists.length,
      data: wishlists,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One WishList from the database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const wishlist = await WishList.findById(id);

    return response.status(200).json(wishlist);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a WishList
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear, content } = request.body;
    const { id } = request.params;

    if (!title || !author || !publishYear || !content) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear, content",
      });
    }

    const result = await WishList.findByIdAndUpdate(id, {
      title,
      author,
      publishYear,
      content,
    });

    if (!result) {
      return response.status(404).json({ message: "WishList not found" });
    }

    return response.status(200).send({ message: "WishList updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a WishList
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await WishList.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "WishList not found" });
    }

    return response.status(200).send({ message: "WishList deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
