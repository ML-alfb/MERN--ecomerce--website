const express = require("express");
const router = express.Router();
const store = require("../utils/multer");
const {
  getProducts,
  createProduct,
  updateProduct,
} = require("../controllers/productsController");

router.get("/", getProducts);
router.post("/create", store.single("file"), createProduct);
router.patch("/update/:id", store.single("file"), updateProduct);

router.delete("/:id", (req, res) => {
  res.status(200).json({ msg: "deleted one" });
});

module.exports = router;
