import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser, selectIsAuthenticated, logout } from '../redux/userSlice';
import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return (
            <div className="profile-page">
                <div className="container">
                    <div className="not-logged-in">
                        <span>👤</span>
                        <h2>Please login to view your profile</h2>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    </div>
                </div>
            </div>
        );
    }

    const menuItems = [
        { icon: '📦', label: 'My Orders', path: '/orders', count: 5 },
        { icon: '❤️', label: 'Wishlist', path: '/wishlist', count: 12 },
        { icon: '📍', label: 'Addresses', path: '/addresses' },
        { icon: '💳', label: 'Payment Methods', path: '/payments' },
        { icon: '🔔', label: 'Notifications', path: '/notifications' },
        { icon: '⚙️', label: 'Settings', path: '/settings' },
        { icon: '❓', label: 'Help & Support', path: '/help' },
    ];

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(logout());
        }
    };

    return (
        <div className="profile-page">
            <div className="container">
                <motion.div
                    className="profile-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="profile-avatar">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="profile-info">
                        <h1>{user?.name || 'User'}</h1>
                        <p>{user?.email}</p>
                        <span className="member-badge">🌟 Premium Member</span>
                    </div>
                    <button className="edit-profile-btn">Edit Profile</button>
                </motion.div>

                <div className="profile-layout">
                    {/* Quick Stats */}
                    <motion.div
                        className="profile-stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="stat-card">
                            <span className="stat-value">15</span>
                            <span className="stat-label">Orders</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">₹12,450</span>
                            <span className="stat-label">Total Spent</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">₹2,340</span>
                            <span className="stat-label">Saved</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">12</span>
                            <span className="stat-label">Wishlist</span>
                        </div>
                    </motion.div>

                    {/* Menu Items */}
                    <motion.div
                        className="profile-menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {menuItems.map((item, index) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="menu-item"
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                                {item.count && <span className="menu-count">{item.count}</span>}
                                <span className="menu-arrow">→</span>
                            </Link>
                        ))}

                        <button className="menu-item logout" onClick={handleLogout}>
                            <span className="menu-icon">🚪</span>
                            <span className="menu-label">Logout</span>
                            <span className="menu-arrow">→</span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
