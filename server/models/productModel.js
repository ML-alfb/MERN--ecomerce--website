const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
    },
    catygory: {
      type: String,
      // required: [true, "Please enter the product catygory"],
    },

    price: {
      type: Number,
      // required: [true, "Please enter the product price"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: {
      posterUrl: {
        type: String,
      },

      galerie: [
        {
          url: {
            type: String,
          },
        },
      ],
    },
    stock: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },

  { timestamps: true }
);

// productSchema.virtual("imgSrc").get(function () {
//   console.log("hheeer");
//   if (this.images.image.img !== null && this.images.image.imgtype !== null) {
//     console.log(this.images.image.imgtype, "hhhh");
//     return `data:image/${
//       this.images.image.imgtype
//     };charset=utf-8;base64;${this.images.image.img.toString("base64")}`;
//   }
// });

module.exports = mongoose.model("Product", productSchema);
