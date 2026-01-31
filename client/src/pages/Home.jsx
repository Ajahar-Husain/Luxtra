import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/products/ProductCard';
import { staggerContainer, staggerItem, fadeInUp } from '../animations/animations';
import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

// Icons
const SparkleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L13.09 8.26L19.32 9.27L13.97 14.14L15.18 20.64L12 17.27L8.82 20.64L10.03 14.14L4.68 9.27L10.91 8.26L12 2Z" />
    </svg>
);

const TruckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const HeadphonesIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
);

const RefreshIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const Home = () => {
    const [activeTab, setActiveTab] = useState('trending');
    const [countdown, setCountdown] = useState({ hours: 12, minutes: 45, seconds: 30 });
    const heroRef = useRef(null);
    const categoriesRef = useRef(null);

    // Sample products
    const products = [
        { id: 1, name: 'Fresh Organic Apples', price: 149, mrp: 199, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80', rating: 4.5, reviews: 234, discount: 25, category: 'grocery' },
        { id: 2, name: 'Premium Basmati Rice', price: 399, mrp: 499, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', rating: 4.8, reviews: 567, discount: 20, category: 'grocery' },
        { id: 3, name: 'Wireless Bluetooth Earbuds', price: 1499, mrp: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', rating: 4.3, reviews: 892, discount: 50, category: 'electronics' },
        { id: 7, name: 'Premium Cotton Hoodie', price: 899, mrp: 1499, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', rating: 4.4, reviews: 234, discount: 40, category: 'fashion' },
        { id: 16, name: 'Remote Control Car', price: 1299, mrp: 1999, image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80', rating: 4.6, reviews: 156, discount: 35, category: 'toys' },
        { id: 18, name: 'Plush Teddy Bear', price: 599, mrp: 999, image: 'https://images.unsplash.com/photo-1559454403-b8fb87521bc1?w=600&q=80', rating: 4.9, reviews: 567, discount: 40, category: 'toys' },
        { id: 13, name: '4K Action Camera', price: 4999, mrp: 7999, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80', rating: 4.6, reviews: 145, discount: 38, category: 'electronics' },
        { id: 14, name: 'Denim Jacket Classic', price: 1499, mrp: 2499, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80', rating: 4.5, reviews: 112, discount: 40, category: 'fashion' },
    ];

    const categories = [
        { name: 'Grocery', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', path: '/grocery' },
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049860654-af5a11875130?w=400&q=80', path: '/products?category=electronics' },
        { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', path: '/products?category=fashion' },
        { name: 'Toys', image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=400&q=80', path: '/products?category=toys' },
        { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80', path: '/products?category=home' },
        { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=400&q=80', path: '/products?category=beauty' },
        { name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80', path: '/products?category=sports' },
    ];

    const features = [
        { icon: TruckIcon, title: 'Free Delivery', description: 'On orders above ₹499' },
        { icon: ShieldIcon, title: 'Secure Payment', description: '100% secure transactions' },
        { icon: HeadphonesIcon, title: '24/7 Support', description: 'Dedicated customer care' },
        { icon: RefreshIcon, title: 'Easy Returns', description: '7-day return policy' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    return { hours: 23, minutes: 59, seconds: 59 };
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // GSAP animations
        if (categoriesRef.current) {
            gsap.fromTo(
                categoriesRef.current.querySelectorAll('.category-card'),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: categoriesRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }
    }, []);

    const filterProducts = () => {
        switch (activeTab) {
            case 'grocery':
                return products.filter((p) => p.category === 'grocery');
            case 'electronics':
                return products.filter((p) => p.category === 'electronics');
            case 'fashion':
                return products.filter((p) => p.category === 'fashion');
            case 'toys':
                return products.filter((p) => p.category === 'toys');
            case 'deals':
                return products.filter((p) => p.discount >= 30);
            default:
                return products;
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-bg" />
                <div className="container">
                    <div className="hero-content">
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="hero-badge"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <SparkleIcon />
                                New Year Sale - Up to 70% Off
                            </motion.div>

                            <motion.h1
                                className="hero-title"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Shop Premium <span>Groceries</span> & Everything You Need
                            </motion.h1>

                            <motion.p
                                className="hero-description"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Experience luxury shopping with Luxtra. Fresh groceries, top electronics,
                                trendy fashion - all delivered to your doorstep with unbeatable prices.
                            </motion.p>

                            <motion.div
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link to="/products" className="btn btn-primary">
                                    Shop Now
                                    <ArrowRightIcon />
                                </Link>
                                <Link to="/grocery" className="btn btn-secondary">
                                    Browse Grocery
                                </Link>
                            </motion.div>

                            <motion.div
                                className="hero-stats"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="stat-item">
                                    <div className="stat-value">50<span>K+</span></div>
                                    <div className="stat-label">Products</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">1<span>M+</span></div>
                                    <div className="stat-label">Happy Customers</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">500<span>+</span></div>
                                    <div className="stat-label">Partner Brands</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                                alt="Shopping Experience"
                                className="hero-image-main"
                            />
                            <motion.div
                                className="floating-card floating-card-1"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span>🔥 Flash Sale</span>
                            </motion.div>
                            <motion.div
                                className="floating-card floating-card-2"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            >
                                <span>⚡ Fast Delivery</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section" ref={categoriesRef}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle">Explore our wide range of categories</p>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <Link to={category.path} key={index} className="category-card">
                                <div className="category-image-container" style={{ width: '60px', height: '60px', marginBottom: '10px' }}>
                                    <img src={category.image} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                </div>
                                <span className="category-name">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="container">
                    <div className="products-header">
                        <div>
                            <h2 className="section-title">Featured Products</h2>
                            <p className="section-subtitle">Handpicked just for you</p>
                        </div>

                        <div className="products-tabs">
                            {['trending', 'grocery', 'electronics', 'fashion', 'toys'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <Link to="/products" className="view-all-btn">
                            View All <ArrowRightIcon />
                        </Link>
                    </div>

                    <motion.div
                        className="products-grid"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        key={activeTab}
                    >
                        {filterProducts().map((product) => (
                            <motion.div key={product.id} variants={staggerItem}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Deals Banner */}
            <section className="deals-section">
                <div className="container">
                    <motion.div
                        className="deals-banner"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="deals-content">
                            <h3 className="deals-title">🔥 Deal of the Day</h3>
                            <p className="deals-subtitle">Up to 70% off on selected items</p>
                            <div className="deals-countdown">
                                <div className="countdown-item">
                                    <div className="countdown-value">{String(countdown.hours).padStart(2, '0')}</div>
                                    <div className="countdown-label">Hours</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</div>
                                    <div className="countdown-label">Minutes</div>
                                </div>
                                <div className="countdown-item">
                                    <div className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</div>
                                    <div className="countdown-label">Seconds</div>
                                </div>
                            </div>
                        </div>
                        <div className="deals-cta">
                            <Link to="/products?deals=true" className="btn btn-secondary" style={{ background: '#fff', color: '#667eea' }}>
                                Shop Deals Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="feature-icon">
                                    <feature.icon />
                                </div>
                                <h4 className="feature-title">{feature.title}</h4>
                                <p className="feature-description">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
