import envConfig from "../configs/env.config";
import ApiError from "../errors/ApiError";
import { ICheckout } from "../modules/checkout/checkout.interface";
const SSLCommerzPayment = require("sslcommerz-lts");

const paymentRedirectUrl = async (payload: ICheckout) => {
  const {
    _id,
    userName,
    phoneNumber,
    email,
    address,
    city,
    state,
    zip,
    product,
    totalPrice,
  } = payload || {};

  const store_id = envConfig.SLL_STORE_ID;
  const store_passwd = envConfig.SLL_STORE_PASSWORD;
  const is_live = envConfig.DEVELOPMENT === "development" ? false : true;

  const data = {
    total_amount: totalPrice,
    currency: "BDT",
    tran_id: _id.toString(),
    success_url:
      envConfig.DEVELOPMENT === "production"
        ? `${envConfig.SERVER_URL}/payment/success?tran_id=${_id}`
        : `http://localhost:5000/api/v1/payment/success?tran_id=${_id}`,
    fail_url:
      envConfig.DEVELOPMENT === "production"
        ? `${envConfig.SERVER_URL}payment/fail?tran_id=${_id}`
        : `http://localhost:5000/api/v1/payment/fail?tran_id=${_id}`,
    cancel_url:
      envConfig.DEVELOPMENT === "production"
        ? `${envConfig.SERVER_URL}payment/fail?tran_id=${_id}`
        : `http://localhost:5000/api/v1/payment/fail?tran_id=${_id}`,
    ipn_url: "/",
    shipping_method: "Courier",
    product_name: product,
    product_category: "general",
    product_profile: "general",
    cus_name: userName,
    cus_email: email,
    cus_add1: address,
    cus_add2: "",
    cus_city: city,
    cus_state: state,
    cus_postcode: zip,
    cus_country: "Bangladesh",
    cus_phone: phoneNumber,
    cus_fax: "",
    ship_name: userName,
    ship_add1: address,
    ship_add2: "",
    ship_city: city,
    ship_state: state,
    ship_postcode: zip,
    ship_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    // Redirect the user to payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;

    return GatewayPageURL;
  } catch (error) {
    throw new ApiError(400, "SSLCommerz Payment Initialization Error");
  }
};

export default paymentRedirectUrl;
