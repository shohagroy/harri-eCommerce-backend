import paymentRedirectUrl from "../../utils/sslcommerz";
import Product, { IProduct } from "../product/product.interface";
import CheckoutOrder from "./checkout.interface";

export const cheateNewCheckoutService = async (payload: any) => {
  const { productInfo, userInfo, productId } = payload;

  const checkoutProduct: IProduct[] = await Product.find({ _id: productId });

  const orderInfo = {
    userName: `${userInfo.firstName} ${userInfo.lastName}`,
    userId: userInfo._id,
    phoneNumber: userInfo.phone,
    email: userInfo.email,
    address: userInfo.address,
    city: userInfo.city,
    state: userInfo.state,
    zip: userInfo.zip,
    product: checkoutProduct.length ? checkoutProduct[0]?.title : "comboPack",
    quantity: checkoutProduct.length ? 1 : "comboSize",
    price: checkoutProduct.length ? checkoutProduct[0]?.price : "comboPrice",
    discount: productInfo.discount,
    shippingCharge: 20,
    totalPrice: productInfo.totalPrice,
    paymentMethod: "",
    delivary: "panding",
    status: false,
  };

  const newOrder = await CheckoutOrder.create(orderInfo);

  if (newOrder._id) {
    const paymentUrl = await paymentRedirectUrl(newOrder);
    return paymentUrl;
  }
};
