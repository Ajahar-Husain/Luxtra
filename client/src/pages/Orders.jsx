import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders, selectOrders, selectOrdersLoading, selectOrdersError } from '../redux/orderSlice';
import { selectIsAuthenticated } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Orders.css';
import Loader from '../components/common/Loader';

const Orders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector(selectOrders);
    const loading = useSelector(selectOrdersLoading);
    const error = useSelector(selectOrdersError);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login?redirect=orders');
        } else {
            dispatch(fetchMyOrders());
        }
    }, [dispatch, isAuthenticated, navigate]);

    if (loading) return <Loader text="Loading your orders..." />;

    if (error) {
        return (
            <div className="orders-page">
                <div className="container">
                    <div className="error-message">
                        <span>⚠️</span>
                        <h2>Oops! Something went wrong</h2>
                        <p>{error}</p>
                        <button className="btn btn-primary" onClick={() => dispatch(fetchMyOrders())}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <motion.div
                    className="orders-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>My Orders</h1>
                    <p>Track and manage your recent purchases</p>
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        className="no-orders"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <span>📦</span>
                        <h2>No orders yet</h2>
                        <p>Looks like you haven't placed any orders yet.</p>
                        <Link to="/products" className="btn btn-primary">Start Shopping</Link>
                    </motion.div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                className="order-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="order-header">
                                    <div className="order-id">
                                        <span className="label">Order ID</span>
                                        <span className="value">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                    </div>
                                    <div className="order-date">
                                        <span className="label">Date</span>
                                        <span className="value">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="order-status">
                                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="order-item">
                                            <div className="item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="item-details">
                                                <h4>{item.name}</h4>
                                                <p>Qty: {item.quantity} × ₹{item.price}</p>
                                            </div>
                                            <div className="item-total">
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total Amount:</span>
                                        <span className="amount">₹{order.totalAmount}</span>
                                    </div>
                                    {/* <button className="btn btn-outline btn-sm">View Details</button> */}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
