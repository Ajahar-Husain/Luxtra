import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, selectCartSavings, updateQuantity, removeFromCart, clearCart } from '../redux/cartSlice';
import './Cart.css';

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3,6 5,6 21,6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const MinusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const savings = useSelector(selectCartSavings);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            dispatch(clearCart());
        }
    };

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <motion.div
                        className="empty-cart"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="empty-cart-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/products" className="btn btn-primary">
                            Start Shopping
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <motion.div
                    className="cart-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Shopping Cart</h1>
                    <span className="cart-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
                </motion.div>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <motion.div
                        className="cart-items"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="cart-items-header">
                            <button className="clear-cart-btn" onClick={handleClearCart}>
                                <TrashIcon />
                                Clear Cart
                            </button>
                        </div>

                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="cart-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="cart-item-image">
                                    <img src={item.image || '/assets/placeholder.png'} alt={item.name} />
                                </div>

                                <div className="cart-item-details">
                                    <Link to={`/product/${item.id}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                    {item.category && (
                                        <span className="cart-item-category">{item.category}</span>
                                    )}
                                </div>

                                <div className="cart-item-price">
                                    <span className="current-price">₹{item.price.toLocaleString()}</span>
                                    {item.mrp > item.price && (
                                        <span className="original-price">₹{item.mrp.toLocaleString()}</span>
                                    )}
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>

                                <div className="cart-item-subtotal">
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </div>

                                <button
                                    className="cart-item-remove"
                                    onClick={() => handleRemove(item.id)}
                                    aria-label="Remove item"
                                >
                                    <TrashIcon />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Cart Summary */}
                    <motion.div
                        className="cart-summary"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal ({items.length} items)</span>
                            <span>₹{(total + savings).toLocaleString()}</span>
                        </div>

                        {savings > 0 && (
                            <div className="summary-row discount">
                                <span>Discount</span>
                                <span>-₹{savings.toLocaleString()}</span>
                            </div>
                        )}

                        <div className="summary-row">
                            <span>Delivery</span>
                            <span className={total >= 499 ? 'free' : ''}>
                                {total >= 499 ? 'FREE' : '₹49'}
                            </span>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{(total + (total < 499 ? 49 : 0)).toLocaleString()}</span>
                        </div>

                        {savings > 0 && (
                            <div className="savings-badge">
                                🎉 You're saving ₹{savings.toLocaleString()} on this order!
                            </div>
                        )}

                        <Link to="/checkout" className="checkout-btn btn btn-primary">
                            Proceed to Checkout
                        </Link>

                        <Link to="/products" className="continue-shopping">
                            ← Continue Shopping
                        </Link>

                        <div className="secure-checkout">
                            <span>🔒 Secure Checkout</span>
                            <span>💳 Multiple Payment Options</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
