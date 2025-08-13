// @ts-nocheck

import { orderProps, ProductModel, CuponModel, OrderModel } from "./../utils/OrderInterfaces";
import { getCookie } from "../utils/functions";
import { ReviewsInterface } from "../utils/ReviewsTypes";
import { NewsProps } from "../utils/NewsletterInterface";
import { getType } from "../components/AdminArea/EditStrings/TableTypes";

let destination: string = "";
// const destination = "http://localhost:5000/sapunmontan/us-central1";
if (process.env.NODE_ENV === "development") {
  destination = "http://localhost:5000/sapunmontan/us-central1";
} else {
  destination = "https://us-central1-sapunmontan.cloudfunctions.net";
}

export const requestOrdersList = async () => {
  return await fetch(`${destination}/requestOrders`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      // someData: "someTest",
      authCookie: getCookie("jwt")
    })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendReviewToBack = async (reviewObj: ReviewsInterface) => {
  console.log("SendReviewToBack received will send:", reviewObj);
  return await fetch(`${destination}/sendReviewToServer`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      name: reviewObj.name,
      starsNumber: reviewObj.starsNumber,
      reviewActual: reviewObj.reviewActual,
      email: reviewObj.email,
      reviewProductID: reviewObj.reviewProductID,
      mediaLink: reviewObj.mediaLink
    })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendOrderConfirmation = async (data: orderProps) => {
  return await fetch(`${destination}/sendEmail`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      city: data.city,
      county: data.county,
      phoneNo: data.phoneNo,
      paymentMethod: data.paymentMethod,
      deliveryName: data.deliveryName,
      deliveryAddress: data.deliveryAddress,
      orderNotes: data.orderNotes,
      cartSum: data.cartSum,
      shippingTax: data.shippingTax,
      cartProducts: data.cartProducts,
      paymentStatus: data.paymentStatus
    })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const requestLoginAccess = async (email: string, password: string) => {
  return await fetch(`${destination}/requestAuth`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email: email, password: password })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updateProduct = async (productModel: ProductModel) => {
  return await fetch(`${destination}/updateProduct`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(productModel)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const addProduct = async (productModel: ProductModel) => {
  return await fetch(`${destination}/addProduct`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(productModel)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteProduct = async (productModel: ProductModel) => {
  console.log("Sending to database to DELETE :", productModel.ID);
  return await fetch(`${destination}/deleteProduct`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(productModel.ID)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const addToNewsletter = async (subscriberData: NewsProps) => {
  return await fetch(`${destination}/subscribeToNewsletter`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(subscriberData)
  })
    .then((res) => res)
    .catch((error) => error);
};
export const getStringsList = async (type: string): Promise<getType> => {
  return await fetch(`${destination}/getStringsList`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ stringRequest: type })
  })
    .then((result) => result.json().then((resultString: getType) => resultString))
    .catch((error) => error);
};
export const sendStringsList = async (type: string, payload: string): Promise<getType> => {
  return await fetch(`${destination}/sendStringsList`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ stringRequest: type, payload })
  })
    .then((result) => result.json().then((resultString) => resultString))
    .catch((error) => error);
};

// Cupon List Models/CRUD

export const updateCupon = async (cuponModel: CuponModel) => {
  return await fetch(`${destination}/updateCupon`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(cuponModel)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const addCupon = async (cuponModel: CuponModel) => {
  return await fetch(`${destination}/addCupon`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(cuponModel)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteCupon = async (cuponModel: CuponModel) => {
  console.log("Sending to database to DELETE :", cuponModel.ID);
  return await fetch(`${destination}/deleteCupon`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(cuponModel.ID)
  })
    .then((res) => res)
    .catch((error) => error);
};


export const updateOrder = async (orderModel: OrderModel) => {
  return await fetch(`${destination}/updateOrder`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(orderModel)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updatePaymentStatus = async (invoiceID: string, paymentStatus: string) => {
  return await fetch(`${destination}/updatePaymentStatus`, {
    credentials: "include",
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ invoiceID, paymentStatus })
  })
    .then((res) => res)
    .catch((error) => error);
};


export const updateOrderPaymentStatus = async (orderId: number, paymentStatus: string) => {
  try {
    const response = await fetch(`${destination}/updateOrderPaymentStatus`, {
      credentials: "include",
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        paymentStatus,
      }),
    });

    const jsonResponse = await response.json();
    console.log('Payment status updated successfully:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('Error updating payment status:', error);
    return error;
  }
};