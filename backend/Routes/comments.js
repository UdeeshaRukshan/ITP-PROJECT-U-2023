const router = require("express").Router();
const mongoose = require("mongoose");
let Comments = require("../models/LiveComment");


router.route("/add").post((req,res)=>{

    const userId = req.body.userId;
    const itemId = req.body.itemId;
    const Comment = req.body.Comment;

    const newComments = new Comments({
        userId,
        itemId,
        Comment,
    })

    newComments.save().then(()=>{
        res.json("Commented Successfully")
    }).catch((err)=>{
        console.log(err);
    })

})
router.route("/").get((req,res)=>{
    Comments.find().then((comments)=>{
        res.json(comments)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;