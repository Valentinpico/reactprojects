import { Response, Request } from "express";

import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [["id", "DESC"]],
    });
    res.json({ data: products });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, name, description, price, availity } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await product.update({ name, description, price, availity });

    await product.save();

    res.json({ data: product });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await product.destroy();

    res.json({ data: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
