import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Product from "../models/Product.model";

dotenv.config();

export const db = new Sequelize(process.env.URI_DATABASE!, {
  models: [Product],
  logging: false,
});
