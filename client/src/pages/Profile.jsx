import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser, selectIsAuthenticated, logout, updateProfile } from '../redux/userSlice';
import { fetchMyOrders, selectOrders } from '../redux/orderSlice';
import { authAPI } from '../services/api';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const orders = useSelector(selectOrders);

    const [editOpen, setEditOpen] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [editError, setEditError] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) dispatch(fetchMyOrders());
    }, [isAuthenticated, dispatch]);

    if (!isAuthenticated) {
        return (
            <div className="profile-page">
                <div className="container">
                    <div className="not-logged-in">
                        <PersonOutlineOutlinedIcon style={{ fontSize: '4rem', color: '#667eea' }} />
                        <h2>Please login to view your profile</h2>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    </div>
                </div>
            </div>
        );
    }

    const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const menuItems = [
        { icon: <ShoppingBagOutlinedIcon />, label: 'My Orders', path: '/orders', count: orders.length || null, accent: '#667eea' },
        { icon: <LocationOnOutlinedIcon />, label: 'Addresses', path: '/addresses', accent: '#f093fb' },
        { icon: <CreditCardOutlinedIcon />, label: 'Payment Methods', path: '/payments', accent: '#4facfe' },
        { icon: <NotificationsNoneOutlinedIcon />, label: 'Notifications', path: '/notifications', accent: '#f7971e' },
        { icon: <SettingsOutlinedIcon />, label: 'Settings', path: '/settings', accent: '#a8edea' },
        { icon: <HelpOutlineOutlinedIcon />, label: 'Help & Support', path: '/help', accent: '#43e97b' },
    ];

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            dispatch(logout());
        }
    };

    const openEdit = () => {
        setForm({
            name:    user?.name    || '',
            email:   user?.email   || '',
            phone:   user?.phone   || '',
            address: user?.address || '',
        });
        setAvatarPreview(user?.avatar || null);
        setEditError('');
        setSaveSuccess(false);
        setEditOpen(true);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setEditError('Image must be under 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setEditError('');
        setSaveSuccess(false);
        try {
            const { data } = await authAPI.updateProfile({ ...form, avatar: avatarPreview || '' });
            dispatch(updateProfile(data));
            setSaveSuccess(true);
            setTimeout(() => setEditOpen(false), 900);
        } catch (err) {
            setEditError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
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
                        {user?.avatar
                            ? <img src={user.avatar} alt={user.name} />
                            : user?.name?.charAt(0).toUpperCase() || 'U'
                        }
                    </div>
                    <div className="profile-info">
                        <h1>{user?.name || 'User'}</h1>
                        <p>{user?.email}</p>
                        {user?.phone && <p className="profile-phone">📞 {user.phone}</p>}
                        {user?.address && <p className="profile-phone">📍 {user.address}</p>}
                        <span className="member-badge">🌟 Premium Member</span>
                    </div>
                    <button className="edit-profile-btn" onClick={openEdit}>
                        <EditOutlinedIcon style={{ fontSize: '1rem' }} /> Edit Profile
                    </button>
                </motion.div>

                <div className="profile-layout">
                    <motion.div
                        className="profile-stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(102,126,234,0.12)', color: '#667eea' }}><ShoppingBagOutlinedIcon /></div>
                            <span className="stat-value">{orders.length}</span>
                            <span className="stat-label">Total Orders</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(67,233,123,0.12)', color: '#43e97b' }}><CurrencyRupeeOutlinedIcon /></div>
                            <span className="stat-value">{totalSpent.toLocaleString('en-IN')}</span>
                            <span className="stat-label">Total Spent</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(79,172,254,0.12)', color: '#4facfe' }}><CheckCircleOutlineOutlinedIcon /></div>
                            <span className="stat-value">{orders.filter(o => o.status === 'Delivered').length}</span>
                            <span className="stat-label">Delivered</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: 'rgba(247,151,30,0.12)', color: '#f7971e' }}><PendingOutlinedIcon /></div>
                            <span className="stat-value">{orders.filter(o => o.status === 'Pending').length}</span>
                            <span className="stat-label">Pending</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="profile-menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {menuItems.map((item) => (
                            <Link key={item.path} to={item.path} className="menu-item">
                                <span className="menu-icon-wrap" style={{ background: `${item.accent}18`, color: item.accent }}>{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                                {item.count ? <span className="menu-count">{item.count}</span> : null}
                                <ChevronRightOutlinedIcon className="menu-arrow" />
                            </Link>
                        ))}
                        <button className="menu-item logout" onClick={handleLogout}>
                            <span className="menu-icon-wrap" style={{ background: 'rgba(255,71,87,0.12)', color: '#ff4757' }}><LogoutOutlinedIcon /></span>
                            <span className="menu-label">Logout</span>
                            <ChevronRightOutlinedIcon className="menu-arrow" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {editOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEditOpen(false)}
                    >
                        <motion.div
                            className="modal-box"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2>Edit Profile</h2>
                                <button className="modal-close" onClick={() => setEditOpen(false)}><CloseOutlinedIcon /></button>
                            </div>
                            <form onSubmit={handleEditSave}>
                                {/* Avatar Picker */}
                                <div className="avatar-picker">
                                    <div className="avatar-preview">
                                        {avatarPreview
                                            ? <img src={avatarPreview} alt="preview" />
                                            : <span>{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                                        }
                                    </div>
                                    <div className="avatar-actions">
                                        <p className="avatar-hint">JPG, PNG — max 2MB</p>
                                        <div className="avatar-btns">
                                            <button type="button" className="avatar-upload-btn" onClick={() => fileInputRef.current.click()}>
                                                <CameraAltOutlinedIcon style={{ fontSize: '1rem' }} /> Upload Photo
                                            </button>
                                            {avatarPreview && (
                                                <button type="button" className="avatar-remove-btn" onClick={() => setAvatarPreview(null)}>
                                                    <DeleteOutlineOutlinedIcon style={{ fontSize: '1rem' }} />
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            style={{ display: 'none' }}
                                            onChange={handlePhotoChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        placeholder="Street, City, State"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>
                                {editError && <p className="modal-error">{editError}</p>}
                                {saveSuccess && <p className="modal-success">✓ Profile updated successfully!</p>}
                                <div className="modal-actions">
                                    <button type="button" className="btn-cancel" onClick={() => setEditOpen(false)}>Cancel</button>
                                    <button type="submit" className="btn-save" disabled={saving}>
                                        {saving ? 'Saving...' : saveSuccess ? '✓ Saved!' : <><EditOutlinedIcon style={{ fontSize: '1rem' }} /> Save Changes</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
