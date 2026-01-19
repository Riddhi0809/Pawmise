require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

/* MongoDB (skip during tests) */
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, { dbName: 'pet_app' })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
}

/* Routes */
app.use('/api/visits', require('./routes/visit'));
app.use('/api/board', require('./routes/board'));
app.use('/api', require('./routes/auth'));

/* Razorpay optional */
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

app.post('/api/payment/orders', async (req, res) => {
  if (!razorpay) {
    return res.status(500).json({ error: 'Payment disabled' });
  }

  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  });

  res.json(order);
});

module.exports = app;
