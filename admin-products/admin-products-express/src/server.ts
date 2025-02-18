import express from "express";
import productsRouter from "./routes/products.routes";
import { db } from "./config/db";
const server = express();
//leer el body de las peticiones
server.use(express.json());

server.use("/api/products", productsRouter);

const initDB = async () => {
  try {
    await db.authenticate();
    await db.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initDB();
export default server;
