import CartListProduct from "../cartList/cartList.interface";
import Product from "../product/product.interface";

export const getCheckoutProductsToDb = async (id: string | null) => {
  // let result;
  // if (id) {
  //   result = await Product.findById(id);
  // } else {
  // }
  const result =
    (await Product.find({ _id: id })) || (await CartListProduct.find());

  return result;
};
