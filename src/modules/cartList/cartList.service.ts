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
        { $push: { wishList: productId } }
      );
      return "Added to wish list!";
    }
  } else {
    const response = await CartListProduct.findOneAndDelete({
      productId: productId,
    });
    if (response) {
      await User.updateOne(
        { _id: user._id },
        { $pull: { wishList: productId } }
      );
      return "Removed from wish list!";
    }
  }
};

export const getAallUserCartListToDB = async (user: any) => {
  const userWishLists = await CartListProduct.find({ userId: user?._id });

  return userWishLists;
};
