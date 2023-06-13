import User from "../user/user.interface";
import CartListProduct, { ICartProduct } from "./cartList.interface";

export const createUserCartListProductToDB = async (
  data: ICartProduct,
  user: any
) => {
  const { productId } = data;

  const product = await CartListProduct.findOne({ productId: productId });

  if (!product) {
    const response = await CartListProduct.create({
      ...data,
      userId: user._id,
    });
    if (response) {
      await User.updateOne(
        { _id: user._id },
        { $push: { cartList: productId } }
      );
      return "Added to Cart list!";
    }
  } else {
    const response = await CartListProduct.findOneAndDelete({
      productId: productId,
    });
    if (response) {
      await User.updateOne(
        { _id: user._id },
        { $pull: { cartList: productId } }
      );
      return "Removed from Cart list!";
    }
  }
};

export const getAallUserCartListToDB = async (user: any) => {
  // console.log(user);
  const userCartLists = await CartListProduct.find({ userId: user?._id });

  // console.log(userCartLists);

  return userCartLists;
};
