const express = require("express");
const { Forum } = require("../models/forum"); // Assuming you have a "forum.js" file in your models directory

const router = express.Router();

// Route for Save a new Forum
router.post("/", async (request, response) => {
  try {
    const { title, author, createdDate, content } = request.body;

    if (!title || !author || !createdDate || !content) {
      return response.status(400).send({
        message: "Send all required fields: title, author, createdDate, content",
      });
    }

    const newForum = {
      title,
      author,
      createdDate,
      content,
    };

    const forum = await Forum.create(newForum);

    return response.status(201).send(forum);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Forums from the database
router.get("/", async (request, response) => {
  try {
    const forums = await Forum.find({});

    return response.status(200).json({
      count: forums.length,
      data: forums,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Forum from the database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const forum = await Forum.findById(id);

    return response.status(200).json(forum);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Forum
router.put("/:id", async (request, response) => {
  try {
    const { title, author, createdDate, content } = request.body;
    const { id } = request.params;

    if (!title || !author || !createdDate || !content) {
      return response.status(400).send({
        message: "Send all required fields: title, author, createdDate, content",
      });
    }

    const result = await Forum.findByIdAndUpdate(id, {
      title,
      author,
      createdDate,
      content,
    });

    if (!result) {
      return response.status(404).json({ message: "Forum not found" });
    }

    return response.status(200).send({ message: "Forum updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Forum
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Forum.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Forum not found" });
    }

    return response.status(200).send({ message: "Forum deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
