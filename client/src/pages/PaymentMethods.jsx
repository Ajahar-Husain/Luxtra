import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/userSlice';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import './SubPage.css';

const CARD_GRADIENTS = [
    'linear-gradient(135deg,#667eea,#764ba2)',
    'linear-gradient(135deg,#f093fb,#f5576c)',
    'linear-gradient(135deg,#4facfe,#00f2fe)',
    'linear-gradient(135deg,#43e97b,#38f9d7)',
];

const PaymentMethods = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();

    const [cards, setCards] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', holder: 'Ajahar Husain', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '5353', expiry: '08/25', holder: 'Ajahar Husain', isDefault: false },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ number: '', expiry: '', cvv: '', holder: '' });
    const [error, setError] = useState('');

    if (!isAuthenticated) {
        return (
            <div className="subpage"><div className="container">
                <div className="subpage-empty">
                    <CreditCardOutlinedIcon style={{ fontSize: '3.5rem', color: '#667eea' }} />
                    <h2>Please login to manage payment methods</h2>
                    <Link to="/login" className="sp-btn-primary">Login</Link>
                </div>
            </div></div>
        );
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (form.number.replace(/\s/g, '').length < 16) { setError('Enter a valid 16-digit card number'); return; }
        const last4 = form.number.replace(/\s/g, '').slice(-4);
        const type = form.number.startsWith('4') ? 'Visa' : form.number.startsWith('5') ? 'Mastercard' : 'Card';
        setCards(prev => [...prev, { id: Date.now(), type, last4, expiry: form.expiry, holder: form.holder, isDefault: prev.length === 0 }]);
        setModalOpen(false);
        setForm({ number: '', expiry: '', cvv: '', holder: '' });
        setError('');
    };

    const formatCardNumber = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

    const setDefault = (id) => setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    const deleteCard = (id) => setCards(prev => prev.filter(c => c.id !== id));

    return (
        <div className="subpage">
            <div className="container">
                <motion.div className="subpage-header" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
                    <button className="sp-back-btn" onClick={() => navigate('/profile')}><ArrowBackOutlinedIcon /> Back</button>
                    <div>
                        <h1>Payment Methods</h1>
                        <p>Manage your saved cards and wallets</p>
                    </div>
                    <button className="sp-btn-primary" onClick={() => setModalOpen(true)}><AddOutlinedIcon /> Add Card</button>
                </motion.div>

                <div className="sp-grid">
                    {cards.map((card, i) => (
                        <motion.div key={card.id} className={`sp-card payment-card${card.isDefault ? ' default' : ''}`}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                            <div className="card-visual" style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}>
                                <div className="card-chip" />
                                <div className="card-number-display">•••• •••• •••• {card.last4}</div>
                                <div className="card-bottom-row">
                                    <div><span className="card-meta-label">Card Holder</span><span className="card-meta-val">{card.holder}</span></div>
                                    <div><span className="card-meta-label">Expires</span><span className="card-meta-val">{card.expiry}</span></div>
                                    <span className="card-brand">{card.type}</span>
                                </div>
                            </div>
                            <div className="addr-actions">
                                {card.isDefault ? <span className="default-badge">Default</span> : <button className="sp-link-btn" onClick={() => setDefault(card.id)}>Set as Default</button>}
                                <button className="sp-icon-btn delete" onClick={() => deleteCard(card.id)}><DeleteOutlineOutlinedIcon /></button>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div className="sp-card upi-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <AccountBalanceWalletOutlinedIcon style={{ fontSize: '2rem', color: '#43e97b' }} />
                        <div>
                            <h4>UPI Payment</h4>
                            <p>Pay directly via UPI at checkout</p>
                        </div>
                        <span className="default-badge" style={{ background: 'rgba(67,233,123,0.12)', borderColor: 'rgba(67,233,123,0.3)', color: '#43e97b' }}>Active</span>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div className="sp-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)}>
                        <motion.div className="sp-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}>
                            <div className="sp-modal-header">
                                <h2>Add New Card</h2>
                                <button className="sp-close-btn" onClick={() => setModalOpen(false)}><CloseOutlinedIcon /></button>
                            </div>
                            <form onSubmit={handleSave}>
                                <div className="sp-form-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" value={form.number}
                                        onChange={e => setForm({ ...form, number: formatCardNumber(e.target.value) })} required />
                                </div>
                                <div className="sp-form-row">
                                    <div className="sp-form-group">
                                        <label>Expiry (MM/YY)</label>
                                        <input type="text" placeholder="MM/YY" maxLength={5} value={form.expiry}
                                            onChange={e => setForm({ ...form, expiry: e.target.value })} required />
                                    </div>
                                    <div className="sp-form-group">
                                        <label>CVV</label>
                                        <input type="password" placeholder="•••" maxLength={3} value={form.cvv}
                                            onChange={e => setForm({ ...form, cvv: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="sp-form-group">
                                    <label>Card Holder Name</label>
                                    <input type="text" placeholder="Name on card" value={form.holder}
                                        onChange={e => setForm({ ...form, holder: e.target.value })} required />
                                </div>
                                {error && <p className="sp-error">{error}</p>}
                                <div className="sp-modal-actions">
                                    <button type="button" className="sp-btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
                                    <button type="submit" className="sp-btn-primary">Add Card</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentMethods;
