import User from "../user/user.interface";
import WishListProduct, { IWIshList } from "./wishList.interface";

const createUserWishListProductToDB = async (data: IWIshList, user: any) => {
  const { productId } = data;

  const product = await WishListProduct.findOne({ productId: productId });

  if (!product) {
    const response = await WishListProduct.create({
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
    const response = await WishListProduct.findOneAndDelete({
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

const getAallUserWishListToDB = async (user: any) => {
  const userWishLists = await WishListProduct.find({ userId: user?._id });

  return userWishLists;
};

export const wishListService = {
  createUserWishListProductToDB,
  getAallUserWishListToDB,
};
