import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/userSlice';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import './SubPage.css';

const NOTIF_GROUPS = [
    {
        group: 'Orders & Delivery',
        items: [
            { id: 'order_updates', icon: <LocalShippingOutlinedIcon />, color: '#667eea', label: 'Order Updates', desc: 'Status changes, dispatch & delivery alerts' },
            { id: 'delivery_alerts', icon: <NotificationsNoneOutlinedIcon />, color: '#4facfe', label: 'Delivery Alerts', desc: 'Out for delivery & delivered notifications' },
        ]
    },
    {
        group: 'Offers & Promotions',
        items: [
            { id: 'deals', icon: <SellOutlinedIcon />, color: '#f7971e', label: 'Deals & Offers', desc: 'Flash sales, coupons and exclusive deals' },
            { id: 'campaigns', icon: <CampaignOutlinedIcon />, color: '#f093fb', label: 'Campaigns', desc: 'Seasonal sales and new arrivals' },
        ]
    },
    {
        group: 'Communication',
        items: [
            { id: 'email', icon: <EmailOutlinedIcon />, color: '#43e97b', label: 'Email Notifications', desc: 'Receive updates via email' },
            { id: 'sms', icon: <PhoneAndroidOutlinedIcon />, color: '#a8edea', label: 'SMS Alerts', desc: 'Receive updates via SMS' },
            { id: 'security', icon: <SecurityOutlinedIcon />, color: '#ff4757', label: 'Security Alerts', desc: 'Login attempts and account changes' },
        ]
    },
];

const Notifications = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const [prefs, setPrefs] = useState({ order_updates: true, delivery_alerts: true, deals: false, campaigns: false, email: true, sms: false, security: true });

    if (!isAuthenticated) {
        return (
            <div className="subpage"><div className="container">
                <div className="subpage-empty">
                    <NotificationsNoneOutlinedIcon style={{ fontSize: '3.5rem', color: '#667eea' }} />
                    <h2>Please login to manage notifications</h2>
                    <Link to="/login" className="sp-btn-primary">Login</Link>
                </div>
            </div></div>
        );
    }

    const toggle = (id) => setPrefs(p => ({ ...p, [id]: !p[id] }));

    return (
        <div className="subpage">
            <div className="container">
                <motion.div className="subpage-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                    <button className="sp-back-btn" onClick={() => navigate('/profile')}><ArrowBackOutlinedIcon /> Back</button>
                    <div>
                        <h1>Notifications</h1>
                        <p>Choose what you want to be notified about</p>
                    </div>
                </motion.div>

                <div className="notif-layout">
                    {NOTIF_GROUPS.map((group, gi) => (
                        <motion.div key={group.group} className="sp-card notif-group"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.1 }}>
                            <h3 className="notif-group-title">{group.group}</h3>
                            {group.items.map((item, ii) => (
                                <div key={item.id} className={`notif-row${ii < group.items.length - 1 ? ' bordered' : ''}`}>
                                    <span className="menu-icon-wrap" style={{ background: `${item.color}18`, color: item.color }}>{item.icon}</span>
                                    <div className="notif-text">
                                        <span className="notif-label">{item.label}</span>
                                        <span className="notif-desc">{item.desc}</span>
                                    </div>
                                    <button className={`sp-toggle${prefs[item.id] ? ' on' : ''}`} onClick={() => toggle(item.id)} aria-label={item.label}>
                                        <span className="sp-toggle-thumb" />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
