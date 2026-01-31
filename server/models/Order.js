const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: Number, required: true }, // Using Number ID from frontend dummy data
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true }, // 'UPI', 'Card', etc.
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    status: { type: String, default: 'Pending' }, // Pending, Processing, Shipped, Delivered
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
