import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller";
import { body, param } from "express-validator";
import { handleErrors } from "../middlewares/handleErrors";

const router = Router();

router.get("/", getProducts);

router.post(
  "/",
  body("name").notEmpty().withMessage("Name not empty"),
  body("price")
    .isNumeric()
    .withMessage("Price is required")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  handleErrors,
  createProduct
);

router.get(
  "/:id",
  param("id").isInt().withMessage("Id is no valid"),
  handleErrors,
  getProduct
);

router.put(
  "/",
  body("id").isInt().withMessage("Id is no valid"),
  body("name").notEmpty().withMessage("Name not empty"),
  body("price")
    .isNumeric()
    .withMessage("Price is required")
    .notEmpty()
    .withMessage("Price not empty")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  body("availity")
    .isBoolean()
    .withMessage("Availity is no valid")
    .notEmpty()
    .withMessage("Availity not empty"),
  handleErrors,
  updateProduct
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id is no valid"),
  handleErrors,
  deleteProduct
);

export default router;
