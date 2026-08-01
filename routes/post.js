const {newPost, getPosts } = require("../controllers/postController");
const express =  require("express")

const router = express.Router();


router.post("/post", newPost); 

router.get("/post", getPosts); 


module.exports = router;