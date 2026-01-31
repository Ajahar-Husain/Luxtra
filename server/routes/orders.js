const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // Will create this next

// @desc    Create new order (OLTP Transaction)
// @route   POST /api/orders
// @access  Private
router.post('/', protect, async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        const order = new Order({
            user: req.user._id,
            items: orderItems,
            totalAmount: totalPrice,
            shippingAddress,
            paymentMethod,
            status: 'Pending',
            isPaid: false
        });

        // OLTP: Transactional save
        try {
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: 'Order creation failed', error: error.message });
        }
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
router.get('/mine', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// @desc    Get Analytics Data (OLAP)
// @route   GET /api/analytics
// @access  Private/Admin (Public for demo)
router.get('/analytics', async (req, res) => {
    try {
        // OLAP: Aggregation Pipeline
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: null, // Group all
                    totalRevenue: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 },
                    averageOrderValue: { $avg: "$totalAmount" }
                }
            }
        ]);

        // Sales by Date
        const salesByDate = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    dailyRevenue: { $sum: "$totalAmount" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            overall: stats[0] || { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 },
            salesByDate
        });
    } catch (error) {
        res.status(500).json({ message: 'Analytics failed', error: error.message });
    }
});

// @desc    Get UPI Details for Payment
// @route   GET /api/orders/payment-config
// @access  Public
router.get('/payment-config', (req, res) => {
    res.json({
        upiId: process.env.UPI_ID,
        mobile: process.env.UPI_MOBILE,
        message: "Please pay to the above UPI ID and submit transaction details."
    });
});

module.exports = router;
