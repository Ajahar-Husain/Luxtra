import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';
import { createOrder } from '../redux/orderSlice';
import './Checkout.css';

import { selectIsAuthenticated } from '../redux/userSlice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=checkout');
        }
    }, [isAuthenticated, navigate]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        paymentMethod: 'razorpay',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                orderItems: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.pincode,
                    country: 'India' // Default
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: total,
                taxPrice: 0,
                shippingPrice: total >= 499 ? 0 : 49,
                totalPrice: total + (total >= 499 ? 0 : 49),
            };

            const resultAction = await dispatch(createOrder(orderData));

            if (createOrder.fulfilled.match(resultAction)) {
                setLoading(false);
                dispatch(clearCart());
                // Navigate to orders page or success page
                navigate('/orders');
            } else {
                console.error('Order creation failed:', resultAction.payload);
                throw new Error(resultAction.payload || 'Order creation failed');
            }

        } catch (error) {
            console.error(error);
            setLoading(false);
            alert(error.message || 'Order creation failed');
        }
    };

    if (items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="empty-checkout">
                        <span>🛒</span>
                        <h2>Your cart is empty</h2>
                        <p>Add items to your cart to checkout</p>
                        <Link to="/products" className="btn btn-primary">Browse Products</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <motion.div
                    className="checkout-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Checkout</h1>
                    <div className="checkout-steps">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>
                            <span>1</span>
                            Shipping
                        </div>
                        <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>
                            <span>2</span>
                            Payment
                        </div>
                    </div>
                </motion.div>

                <div className="checkout-layout">
                    <motion.form
                        className="checkout-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {step === 1 && (
                            <div className="form-section">
                                <h3>Shipping Details</h3>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Delivery Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter full address"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="Pincode"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-section">
                                <h3>Payment Method</h3>

                                <div className="payment-methods">
                                    <label className={`payment-option ${formData.paymentMethod === 'razorpay' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={formData.paymentMethod === 'razorpay'}
                                            onChange={handleChange}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">💳</span>
                                            <div>
                                                <h4>Razorpay</h4>
                                                <p>Credit/Debit Card, UPI, Netbanking</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={formData.paymentMethod === 'upi'}
                                            onChange={handleChange}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">📱</span>
                                            <div>
                                                <h4>UPI</h4>
                                                <p>Google Pay, PhonePe, Paytm</p>
                                                {formData.paymentMethod === 'upi' && (
                                                    <div className="upi-details" style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '4px', fontSize: '0.9em' }}>
                                                        <p><strong>UPI ID:</strong> ajaharhusaincse@okicici</p>
                                                        <p><strong>Number:</strong> +91 94546 59311</p>
                                                        <p style={{ color: '#666', marginTop: '5px' }}>Please complete payment and click "Pay" to confirm order.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleChange}
                                        />
                                        <div className="payment-content">
                                            <span className="payment-icon">💵</span>
                                            <div>
                                                <h4>Cash on Delivery</h4>
                                                <p>Pay when you receive</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="form-actions">
                            {step === 2 && (
                                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                                    ← Back
                                </button>
                            )}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <span className="btn-loader"></span>
                                ) : step === 1 ? (
                                    'Continue to Payment'
                                ) : (
                                    `Pay ₹${(total + (total < 499 ? 49 : 0)).toLocaleString()}`
                                )}
                            </button>
                        </div>
                    </motion.form>

                    {/* Order Summary */}
                    <motion.div
                        className="order-summary-card"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h3>Order Summary</h3>

                        <div className="summary-items">
                            {items.map(item => (
                                <div key={item.id} className="summary-item">
                                    <img src={item.image || '/assets/placeholder.png'} alt={item.name} />
                                    <div className="item-info">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-qty">Qty: {item.quantity}</span>
                                    </div>
                                    <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className={total >= 499 ? 'free' : ''}>
                                    {total >= 499 ? 'FREE' : '₹49'}
                                </span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{(total + (total < 499 ? 49 : 0)).toLocaleString()}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
