import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/ProductModel.js";
//function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCatagory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0]; //bcoz this will be array
    const image2 = req.files.image2 && req.files.image2[0]; //we only store image in image variable if it is available in the req.file otherwise we will see error if we do not sedn any image
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    //we have to  store these data and images in database but we cannot store the image in database first we have to upload these images on cloudinary and from cloudinary we get the url and we will store that url in database

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imagesUrl = await Promise.all(
      //uploading images on cloudinary storage and getting url
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resources_type: "image",
        }); //in terminal we can see .path
        return result.secure_url;
      })
    );
    console.log(imagesUrl); //we get array of urls
    //now lets upload it on database

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCatagory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes), //converting string to array
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });

    console.log(
      name,
      description,
      price,
      category,
      subCatagory,
      sizes,
      bestseller
    );
    console.log(image1, image2, image3, image4);
    res.json();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}; //later we will add authentication so that only admin can add products

//function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProduct, addProduct, singleProduct, removeProduct };
