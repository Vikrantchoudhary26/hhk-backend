const Razorpay = require("razorpay");
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

exports.checkoutPayment = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ code: 200, message: 'Order created', data: order });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ code: 500, message: 'Server Error' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.response;
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ code: 200, message: 'Sign Valid' });
    } else {
      res.status(500).json({ code: 500, message: 'Sign Invalid' });
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.status(500).json({ code: 500, message: 'Server Error' });
  }
};