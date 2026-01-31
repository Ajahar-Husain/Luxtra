import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated, logout } from '../../redux/userSlice';
import '../../styles/Header.css';

// Icons
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

const CartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const UserIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const MenuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
);

const ShoppingBagIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const GroceryIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h20v5H2zM4 8v13h16V8" />
        <circle cx="8" cy="14" r="2" />
        <circle cx="16" cy="14" r="2" />
    </svg>
);

const OrderIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
    </svg>
);

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const Header = ({ cartCount = 0 }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux auth state
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserDropdownOpen(false);
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsUserDropdownOpen(false);
        navigate('/');
    };

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'grocery', label: 'Grocery' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'home', label: 'Home & Living' },
    ];

    const navLinks = [
        { path: '/', label: 'Home', icon: HomeIcon },
        { path: '/products', label: 'Products', icon: ShoppingBagIcon },
        { path: '/grocery', label: 'Grocery', icon: GroceryIcon },
    ];

    const mobileVariants = {
        closed: { opacity: 0, x: '100%' },
        open: { opacity: 1, x: 0, transition: { type: 'spring', damping: 25 } },
    };

    const dropdownVariants = {
        closed: { opacity: 0, y: -10, scale: 0.95 },
        open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="container">
                    <div className="header-inner">
                        {/* Logo */}
                        <Link to="/" className="header-logo">
                            <img src="/assets/logo.png" alt="Luxtra" />
                            <h1>Luxtra</h1>
                        </Link>

                        {/* Search Bar */}
                        <form className="header-search" onSubmit={handleSearch}>
                            <div className="search-wrapper">
                                <select
                                    className="search-category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search for products, brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-btn">
                                    <SearchIcon />
                                </button>
                            </div>
                        </form>

                        {/* Navigation */}
                        <nav className="header-nav">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    <link.icon />
                                    <span>{link.label}</span>
                                </Link>
                            ))}

                            <Link to="/wishlist" className="nav-link">
                                <HeartIcon />
                                <span>Wishlist</span>
                            </Link>

                            <Link to="/cart" className="nav-link cart-link">
                                <CartIcon />
                                <span>Cart</span>
                                {cartCount > 0 && (
                                    <motion.span
                                        className="cart-badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        key={cartCount}
                                    >
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </motion.span>
                                )}
                            </Link>
                        </nav>

                        {/* User Menu */}
                        <div className="user-menu">
                            <button
                                className="user-btn"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            >
                                <div className="user-avatar">
                                    {isAuthenticated ? user?.name?.charAt(0).toUpperCase() : <UserIcon />}
                                </div>
                                <span>{isAuthenticated ? user?.name : 'Login'}</span>
                            </button>

                            <AnimatePresence>
                                {isUserDropdownOpen && (
                                    <motion.div
                                        className="user-dropdown"
                                        variants={dropdownVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        {isAuthenticated ? (
                                            <>
                                                <div className="dropdown-header">
                                                    <p>{user?.name}</p>
                                                    <span>{user?.email}</span>
                                                </div>
                                                <div className="dropdown-links">
                                                    <Link to="/profile" className="dropdown-link">
                                                        <UserIcon />
                                                        My Profile
                                                    </Link>
                                                    <Link to="/orders" className="dropdown-link">
                                                        <OrderIcon />
                                                        My Orders
                                                    </Link>
                                                    <Link to="/wishlist" className="dropdown-link">
                                                        <HeartIcon />
                                                        Wishlist
                                                    </Link>
                                                    <div className="dropdown-divider" />
                                                    <button className="dropdown-link logout" onClick={handleLogout}>
                                                        <LogoutIcon />
                                                        Logout
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="dropdown-links">
                                                <Link to="/login" className="dropdown-link">
                                                    Login
                                                </Link>
                                                <Link to="/register" className="dropdown-link">
                                                    Create Account
                                                </Link>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.nav
                        className="mobile-nav"
                        variants={mobileVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="mobile-nav-header">
                            <Link to="/" className="header-logo">
                                <img src="/assets/logo.png" alt="Luxtra" />
                                <h1>Luxtra</h1>
                            </Link>
                            <button
                                className="mobile-close-btn"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        <form className="mobile-search" onSubmit={handleSearch}>
                            <div className="search-wrapper">
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-btn">
                                    <SearchIcon />
                                </button>
                            </div>
                        </form>

                        <div className="mobile-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    <link.icon />
                                    {link.label}
                                </Link>
                            ))}
                            <Link to="/cart" className="mobile-link">
                                <CartIcon />
                                Cart {cartCount > 0 && `(${cartCount})`}
                            </Link>
                            <Link to="/wishlist" className="mobile-link">
                                <HeartIcon />
                                Wishlist
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" className="mobile-link">
                                        <UserIcon />
                                        My Profile
                                    </Link>
                                    <Link to="/orders" className="mobile-link">
                                        <OrderIcon />
                                        My Orders
                                    </Link>
                                    <button className="mobile-link logout-btn" onClick={handleLogout}>
                                        <LogoutIcon />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="mobile-link">
                                    <UserIcon />
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
