const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const express = require("express");
const path = require("path");
const postRoutes = require("./routes/post");
const Post = require("./models/post");
 const MongoDBconnection = require("./connection");

const app = express();

 MongoDBconnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("home", { posts });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.use("/api", postRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
