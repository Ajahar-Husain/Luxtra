import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Footer.css';

// Social Icons
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

// App Store Icons
const AppleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

const PlayStoreIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
);

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const footerLinks = {
        shop: [
            { name: 'All Products', path: '/products' },
            { name: 'Grocery', path: '/grocery' },
            { name: 'Electronics', path: '/products?category=electronics' },
            { name: 'Fashion', path: '/products?category=fashion' },
            { name: 'Home & Living', path: '/products?category=home' },
        ],
        help: [
            { name: 'Help Center', path: '/help' },
            { name: 'Track Order', path: '/track-order' },
            { name: 'Returns', path: '/returns' },
            { name: 'Shipping Info', path: '/shipping' },
            { name: 'FAQs', path: '/faqs' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Careers', path: '/careers' },
            { name: 'Press', path: '/press' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
        ],
        account: [
            { name: 'My Account', path: '/profile' },
            { name: 'Orders', path: '/orders' },
            { name: 'Wishlist', path: '/wishlist' },
            { name: 'Addresses', path: '/addresses' },
            { name: 'Wallet', path: '/wallet' },
        ],
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <motion.footer
            className="footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <motion.div className="footer-brand" variants={itemVariants}>
                            <Link to="/" className="footer-logo">
                                <img src="/assets/logo.png" alt="Luxtra" />
                                <h2>Luxtra</h2>
                            </Link>
                            <p>
                                Your premium destination for groceries, electronics, fashion, and more.
                                Experience luxury shopping with unbeatable prices and lightning-fast delivery.
                            </p>
                            <div className="app-buttons">
                                <a href="#" className="app-btn">
                                    <AppleIcon />
                                    <span>
                                        <span className="small">Download on the</span>
                                        App Store
                                    </span>
                                </a>
                                <a href="#" className="app-btn">
                                    <PlayStoreIcon />
                                    <span>
                                        <span className="small">Get it on</span>
                                        Google Play
                                    </span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Shop Links */}
                        <motion.div className="footer-links" variants={itemVariants}>
                            <h3>Shop</h3>
                            <ul>
                                {footerLinks.shop.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Help Links */}
                        <motion.div className="footer-links" variants={itemVariants}>
                            <h3>Help</h3>
                            <ul>
                                {footerLinks.help.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Company Links */}
                        <motion.div className="footer-links" variants={itemVariants}>
                            <h3>Company</h3>
                            <ul>
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Account Links + Social */}
                        <motion.div className="footer-links" variants={itemVariants}>
                            <h3>Account</h3>
                            <ul>
                                {footerLinks.account.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="social-links">
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <FacebookIcon />
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <TwitterIcon />
                                </a>
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <InstagramIcon />
                                </a>
                                <a href="#" className="social-link" aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </a>
                                <a href="#" className="social-link" aria-label="YouTube">
                                    <YoutubeIcon />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <motion.div className="footer-newsletter" variants={itemVariants}>
                <div className="container">
                    <div className="newsletter-content">
                        <div className="newsletter-text">
                            <h4>Subscribe to our Newsletter</h4>
                            <p>Get the latest updates on new products and upcoming sales</p>
                        </div>
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                className="newsletter-input"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <motion.button
                                type="submit"
                                className="newsletter-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>

            {/* Footer Bottom */}
            <motion.div className="footer-bottom" variants={itemVariants}>
                <div className="container">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            © {new Date().getFullYear()} <a href="/">Luxtra</a>. All rights reserved.
                            Made with ❤️ in India
                        </p>
                        <div className="footer-legal">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms of Service</Link>
                            <Link to="/cookies">Cookie Policy</Link>
                        </div>
                        <div className="payment-methods">
                            <span>We Accept:</span>
                            <div className="payment-icons">
                                <div className="payment-icon">VISA</div>
                                <div className="payment-icon">MC</div>
                                <div className="payment-icon">UPI</div>
                                <div className="payment-icon">GPay</div>
                                <div className="payment-icon">COD</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
