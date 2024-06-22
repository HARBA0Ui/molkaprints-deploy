import prisma from "../db/prisma.js";

import fs from "fs";
import path from "path";

import cloudinary from "cloudinary";
import dotenv from "dotenv";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
    });

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ message: "Couldn't fetch products!" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product)
      return res.status("404").json({ message: "No Products has been found!" });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Couldn't find the product!" });
  }
};

export const getProductByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const product = await prisma.product.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    if (!product)
      return res.status(404).json({ message: "No product has been found!" });

    return res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};

// export const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.product.delete({
//       where: { id },
//     });
//     return res
//       .status(200)
//       .json({ message: "Product is deleted successfully!" });
//   } catch (err) {
//     return res.status(500).json({ message: "Couldn't delete the product!" });
//   }
// };

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the image files from the server
    product.imgs.forEach((imageFilename) => {
      const imagePath = path.join("public", "Images", imageFilename);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
    });

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new product

export const createProduct = async (req, res) => {
  console.log(req.files[0]);

  try {
    const { title, desc, price: reqPrice } = req.body;
    const price = parseFloat(reqPrice);
    const rest = await cloudinary.uploader.upload(req.files[0].path);
    const imgs = [];
    imgs[0] = rest.secure_url;
    const product = { title, desc, imgs, price };

    await prisma.product.create({
      data: product,
    });
    return res
      .status(200)
      .json({ messaage: "The product has been added successfully!" });
  } catch (err) {
    console.log(err);
  }
};

// Update a product

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, desc, price: reqPrice } = req.body;
    const price = parseFloat(reqPrice);

    if (req.files.length == 0) {
      await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          title,
          desc,
          price,
        },
      });
    } else {
      const rest = await cloudinary.uploader.upload(req.files[0].path);
      const imgs = [];
      imgs[0] = rest.secure_url;
      const newProduct = { title, desc, imgs, price };
      await prisma.product.update({
        where: {
          id: id,
        },
        data: newProduct,
      });
    }

    return res
      .status(200)
      .json({ messaage: "The product has been upddated successfully!" });
  } catch (err) {
    console.log(err);
  }
};
