const express = require("express");
const connectDB = require("./config/db");
const cookiesParser = require("cookie-parser");
const path = require("path");
const fileUpLoad = require("express-fileupload");
connectDB();

const app = express();
//app.use(fileUpLoad());
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(5000, () => {
  console.log("Server started on port:5000 ...");
});
