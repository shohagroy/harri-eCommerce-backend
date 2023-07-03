import express from "express";
import verifiedLoginUser from "../../middlewares/verifyTokenUser";
import { productControllers } from "./product.controller";
import authorization from "../../middlewares/authorization";

const router = express.Router();

// product routes
router
  .route("/")
  .post(
    verifiedLoginUser,
    authorization("admin"),
    productControllers.postNewProduct
  )
  .get(productControllers.getAllProducts);
router
  .route("/:id")
  .post(productControllers.postNewProduct)
  .get(productControllers.getSingleProduct)
  .put(productControllers.updateProductById)
  .delete(productControllers.deleteProductById);

export const productRoutes = router;
