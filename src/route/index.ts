import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { cartListRoutes } from "../modules/cartList/cartList.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/carts",
    route: cartListRoutes,
  },
  //   {
  //     path: "/academic-faculties",
  //     route: AcademicFacultyRoutes,
  //   },
  //   {
  //     path: "/academic-departments",
  //     route: AcademicDepartmentRoutes,
  //   },
  //   {
  //     path: "/students",
  //     route: StudentRoutes,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

// // category route
// router.route("/categorys").get(getAllCategorys).post(postNewCategory);
// router
//   .route("/categorys/:id")
//   .delete(deleteCategoryById)
//   .put(updateCategoryById);

// // product routes
// router.route("/products").post(postNewProduct).get(getAllProducts);
// router
//   .route("/products/:id")
//   .post(postNewProduct)
//   .get(getSingleProduct)
//   .put(updateProductById)
//   .delete(deleteProductById);

// // user route
// router.route("/create-user").post(createNewUser);
// router.route("/login-user").post(userLogin);
// router.route("/login/auth/google").get(userLoginWithGoogle);
// router.route("/get-login-user").get(verifiedLoginUser, findLoginUser);
// router.route("/logout-user").post(userLogout);

// // wish lists route
// router
//   .route("/wish-lists")
//   .post(verifiedLoginUser, postUserWishList)
//   .get(verifiedLoginUser, getAllUserWishLists);

// // cart lists route
// router
//   .route("/cart-lists")
//   .post(verifiedLoginUser, postUserCartList)
//   .get(verifiedLoginUser, getAllUserCartLists)
//   .patch(verifiedLoginUser, updateCartQuantaty);

// // user information route
// router
//   .route("/users")
//   .patch(verifiedLoginUser, updateUserInfo)
//   .get(verifiedLoginUser, getAllUsers);

// // user information route
// router.route("/product-reviews").post(verifiedLoginUser, postProductReview);
// router.route("/product-reviews/:id").get(verifiedLoginUser, getProductReviews);

// // user information route
// router.route("/checkout").post(verifiedLoginUser, createNewCheckout);
// router.route("/checkout/:id").get(verifiedLoginUser, getAllCheckoutProducts);

// router.route("/payment/success").post(paymentSuccess);
// router.route("/payment/fail").post(paymentFail);

export default router;
