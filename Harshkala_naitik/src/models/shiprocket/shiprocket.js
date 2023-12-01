const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  order_date: { type: Date, required: true },
  pickup_location: { type: String, required: true },
  billing_customer_name: { type: String, required: true },
  billing_last_name: String,
  billing_address: { type: String, required: true },
  billing_city: { type: String, required: true },
  billing_pincode: { type: String, required: true },
  billing_state: { type: String, required: true },
  billing_country: { type: String, required: true },
  billing_email: { type: String, required: true, unique: true }, 
  billing_phone: { type: String, required: true },
  order_items: [{ 
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  payment_method: { type: String, required: true },
  sub_total: { type: Number, required: true },
  length: { type: Number, required: true },
  breadth: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
