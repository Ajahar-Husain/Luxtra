import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, logout } from '../redux/userSlice';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import './SubPage.css';

const Settings = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [language, setLanguage] = useState('English');
    const [currency, setCurrency] = useState('INR (₹)');

    if (!isAuthenticated) {
        return (
            <div className="subpage"><div className="container">
                <div className="subpage-empty">
                    <SettingsOutlinedIcon style={{ fontSize: '3.5rem', color: '#667eea' }} />
                    <h2>Please login to access settings</h2>
                    <Link to="/login" className="sp-btn-primary">Login</Link>
                </div>
            </div></div>
        );
    }

    const handleLogout = () => { if (window.confirm('Logout from Luxtra?')) { dispatch(logout()); navigate('/'); } };
    const handleDelete = () => { if (window.confirm('Are you sure? This action cannot be undone.')) alert('Account deletion request submitted.'); };

    return (
        <div className="subpage">
            <div className="container">
                <motion.div className="subpage-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                    <button className="sp-back-btn" onClick={() => navigate('/profile')}><ArrowBackOutlinedIcon /> Back</button>
                    <div><h1>Settings</h1><p>Manage your account preferences</p></div>
                </motion.div>

                <div className="settings-layout">
                    {/* Preferences */}
                    <motion.div className="sp-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                        <h3 className="notif-group-title">Preferences</h3>
                        <div className="notif-row bordered">
                            <span className="menu-icon-wrap" style={{ background: 'rgba(102,126,234,0.12)', color: '#667eea' }}><LanguageOutlinedIcon /></span>
                            <div className="notif-text"><span className="notif-label">Language</span><span className="notif-desc">App display language</span></div>
                            <select className="sp-select" value={language} onChange={e => setLanguage(e.target.value)}>
                                {['English', 'Hindi', 'Tamil', 'Telugu'].map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                        <div className="notif-row">
                            <span className="menu-icon-wrap" style={{ background: 'rgba(247,151,30,0.12)', color: '#f7971e' }}><PaletteOutlinedIcon /></span>
                            <div className="notif-text"><span className="notif-label">Currency</span><span className="notif-desc">Display prices in</span></div>
                            <select className="sp-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                                {['INR (₹)', 'USD ($)', 'EUR (€)'].map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </motion.div>

                    {/* Security */}
                    <motion.div className="sp-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h3 className="notif-group-title">Security</h3>
                        <div className="notif-row bordered">
                            <span className="menu-icon-wrap" style={{ background: 'rgba(79,172,254,0.12)', color: '#4facfe' }}><LockOutlinedIcon /></span>
                            <div className="notif-text"><span className="notif-label">Change Password</span><span className="notif-desc">Update your account password</span></div>
                            <button className="sp-link-btn" onClick={() => alert('Password change coming soon')}>Change</button>
                        </div>
                        <div className="notif-row">
                            <span className="menu-icon-wrap" style={{ background: 'rgba(67,233,123,0.12)', color: '#43e97b' }}><ShieldOutlinedIcon /></span>
                            <div className="notif-text"><span className="notif-label">Two-Factor Auth</span><span className="notif-desc">Add an extra layer of security</span></div>
                            <button className="sp-link-btn" onClick={() => alert('2FA coming soon')}>Enable</button>
                        </div>
                    </motion.div>

                    {/* Danger Zone */}
                    <motion.div className="sp-card danger-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <h3 className="notif-group-title" style={{ color: '#ff4757' }}>Danger Zone</h3>
                        <div className="notif-row bordered">
                            <span className="menu-icon-wrap" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}><LogoutOutlinedIcon /></span>
                            <div className="notif-text"><span className="notif-label">Logout</span><span className="notif-desc">Sign out of your account</span></div>
                            <button className="sp-danger-btn" onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="notif-row">
                            <span className="menu-icon-wrap" style={{ background: 'rgba(255,71,87,0.1)', color: '#ff4757' }}><DeleteOutlineOutlinedIcon /></span>
                            <div className="notif-text"><span className="notif-label">Delete Account</span><span className="notif-desc">Permanently remove your account</span></div>
                            <button className="sp-danger-btn" onClick={handleDelete}>Delete</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
