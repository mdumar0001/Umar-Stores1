import orderModel from "../models/orderModel.js";
import userModel from "../models/UserModel";

//Placing orders using COD (cash on delivery) method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {};

//Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

//All Orders data for Admin  Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}); //we want all orders from all users,these orders will be stored in an array
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User Order Data for Frontend//w can show for perticular user
const userOrders = async (req, res) => {
  try {
    //orders of perticular user
    const { userId } = req.body;

    const orders = await orderModel.find({ userId }); //beacuz we have set the useid for every order data in ordermodel can see in schema
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order status from admin panel only admin can do this

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
