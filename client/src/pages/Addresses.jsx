import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/userSlice';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './SubPage.css';

const Addresses = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([
        { id: 1, type: 'Home', name: 'Home', address: '123, MG Road', city: 'Bengaluru', postalCode: '560001', country: 'India', isDefault: true },
        { id: 2, type: 'Work', name: 'Office', address: '456, Sector 18', city: 'Noida', postalCode: '201301', country: 'India', isDefault: false },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ type: 'Home', address: '', city: '', postalCode: '', country: 'India' });

    if (!isAuthenticated) {
        return (
            <div className="subpage"><div className="container">
                <div className="subpage-empty">
                    <LocationOnOutlinedIcon style={{ fontSize: '3.5rem', color: '#667eea' }} />
                    <h2>Please login to manage addresses</h2>
                    <Link to="/login" className="sp-btn-primary">Login</Link>
                </div>
            </div></div>
        );
    }

    const openAdd = () => { setEditing(null); setForm({ type: 'Home', address: '', city: '', postalCode: '', country: 'India' }); setModalOpen(true); };
    const openEdit = (addr) => { setEditing(addr.id); setForm({ type: addr.type, address: addr.address, city: addr.city, postalCode: addr.postalCode, country: addr.country }); setModalOpen(true); };

    const handleSave = (e) => {
        e.preventDefault();
        if (editing) {
            setAddresses(prev => prev.map(a => a.id === editing ? { ...a, ...form } : a));
        } else {
            setAddresses(prev => [...prev, { id: Date.now(), ...form, name: form.type, isDefault: prev.length === 0 }]);
        }
        setModalOpen(false);
    };

    const handleDelete = (id) => setAddresses(prev => prev.filter(a => a.id !== id));
    const setDefault = (id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));

    return (
        <div className="subpage">
            <div className="container">
                <motion.div className="subpage-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                    <button className="sp-back-btn" onClick={() => navigate('/profile')}><ArrowBackOutlinedIcon /> Back</button>
                    <div>
                        <h1>My Addresses</h1>
                        <p>Manage your saved delivery addresses</p>
                    </div>
                    <button className="sp-btn-primary" onClick={openAdd}><AddOutlinedIcon /> Add Address</button>
                </motion.div>

                <div className="sp-grid">
                    {addresses.map((addr, i) => (
                        <motion.div key={addr.id} className={`sp-card address-card${addr.isDefault ? ' default' : ''}`}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <div className="addr-top">
                                <span className="addr-type-badge">
                                    {addr.type === 'Home' ? <HomeOutlinedIcon style={{ fontSize: '1rem' }} /> : <WorkOutlineOutlinedIcon style={{ fontSize: '1rem' }} />}
                                    {addr.type}
                                </span>
                                {addr.isDefault && <span className="default-badge">Default</span>}
                            </div>
                            <p className="addr-text">{addr.address}</p>
                            <p className="addr-text">{addr.city} — {addr.postalCode}</p>
                            <p className="addr-text">{addr.country}</p>
                            <div className="addr-actions">
                                {!addr.isDefault && <button className="sp-link-btn" onClick={() => setDefault(addr.id)}>Set as Default</button>}
                                <button className="sp-icon-btn edit" onClick={() => openEdit(addr)}><EditOutlinedIcon /></button>
                                <button className="sp-icon-btn delete" onClick={() => handleDelete(addr.id)}><DeleteOutlineOutlinedIcon /></button>
                            </div>
                        </motion.div>
                    ))}

                    {addresses.length === 0 && (
                        <div className="subpage-empty">
                            <LocationOnOutlinedIcon style={{ fontSize: '3rem', color: '#667eea' }} />
                            <h3>No addresses saved</h3>
                            <p>Add a delivery address to get started</p>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div className="sp-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
                        <motion.div className="sp-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
                            <div className="sp-modal-header">
                                <h2>{editing ? 'Edit Address' : 'Add New Address'}</h2>
                                <button className="sp-close-btn" onClick={() => setModalOpen(false)}><CloseOutlinedIcon /></button>
                            </div>
                            <form onSubmit={handleSave}>
                                <div className="sp-type-toggle">
                                    {['Home', 'Work', 'Other'].map(t => (
                                        <button key={t} type="button" className={`sp-type-btn${form.type === t ? ' active' : ''}`} onClick={() => setForm({ ...form, type: t })}>{t}</button>
                                    ))}
                                </div>
                                {[['address', 'Street Address'], ['city', 'City'], ['postalCode', 'Postal Code'], ['country', 'Country']].map(([key, label]) => (
                                    <div className="sp-form-group" key={key}>
                                        <label>{label}</label>
                                        <input type="text" value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required />
                                    </div>
                                ))}
                                <div className="sp-modal-actions">
                                    <button type="button" className="sp-btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                                    <button type="submit" className="sp-btn-primary">Save Address</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Addresses;
