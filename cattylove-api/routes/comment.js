const express = require('express')
const Cat = require('../models/cat')
const Comment = require('../models/comment')
const User = require('../models/user')

const router = express.Router()

router.get('/comment', async (req, res) => {
    res.render("comment");
})


router.post("/", async (req, res) => {


    //Validate the data before we create an order
    // const { error } = orderValidation(req.body);
    // if (error) {
    //     return res.status(400).send({ message: error.details[0].message });
    // }

    try {
        console.log("===============");
        console.log("req :",req.body);

        const com = req.body.comment;
        const anon = req.body.anonymous;
        const uid = req.body.userId;
        const catid = req.body.catId;

        let comment = new Comment({
            
            userId : uid,
            catId: catid,
            comment: com,
            anonymous: anon

        });

        comment = await comment.save();

        return res.status(200).send({ message: "Comment successful." });


    }
    catch (e) {
        console.log(e);

        return res.status(500).send("Database/Server Error");
    }





});


router.get("/:catID", async (req, res) => {
    let catID = req.params.catID;
  
    //Validate the data before we create a link
    // const { error } = idValidation({ _id: itemId });
    // if (error) return res.status(400).send({ message: error.details[0].message });
  
    try {
      let comment = await Comment.findById(catID);
      if (!comment) {
        return res.status(404).send("Given ID does not exist");
      }
  
      return res.status(200).send(comment);
    }
    catch (e) {
      return res.status(500).send("Database/Server Error");
    }
  
  });
  
  

module.exports = router