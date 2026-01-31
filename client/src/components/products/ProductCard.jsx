import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import './ProductCard.css';

const HeartIcon = ({ filled }) => (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const CartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// Emoji placeholders for categories
const categoryEmojis = {
    grocery: '🛒',
    electronics: '📱',
    fashion: '👕',
    home: '🏠',
    beauty: '💄',
    sports: '⚽'
};

// Product-specific emojis
const productEmojis = {
    'apple': '🍎',
    'rice': '🍚',
    'earbuds': '🎧',
    'milk': '🥛',
    'watch': '⌚',
    'eggs': '🥚',
    'hoodie': '👕',
    'coffee': '☕',
    'vegetables': '🥬',
    'stand': '📱',
    'honey': '🍯',
    'shoes': '👟',
};

const getProductEmoji = (name, category) => {
    // Try to match product name
    const lowerName = name.toLowerCase();
    for (const [key, emoji] of Object.entries(productEmojis)) {
        if (lowerName.includes(key)) return emoji;
    }
    // Fallback to category emoji
    return categoryEmojis[category] || '📦';
};

const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const dispatch = useDispatch();

    const {
        id,
        name,
        price,
        mrp,
        rating = 4.5,
        reviews = 0,
        discount = 0,
        category,
    } = product;

    const productEmoji = getProductEmoji(name, category);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart({ product, quantity: 1 }));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1500);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <motion.div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/product/${id}`} className="product-link">
                {/* Image Container */}
                <div className="product-image-wrapper">
                    {product.image ? (
                        <img src={product.image} alt={name} className="product-image" loading="lazy" />
                    ) : (
                        <div className="product-emoji-placeholder">
                            {productEmoji}
                        </div>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <span className="discount-badge">-{discount}%</span>
                    )}

                    {/* Quick Actions */}
                    <motion.div
                        className="product-actions"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            className={`action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={handleWishlist}
                            aria-label="Add to wishlist"
                        >
                            <HeartIcon filled={isWishlisted} />
                        </button>
                        <Link to={`/product/${id}`} className="action-btn view-btn" aria-label="Quick view">
                            <EyeIcon />
                        </Link>
                    </motion.div>

                    {/* Add to Cart Button */}
                    <motion.button
                        className={`add-cart-btn ${addedToCart ? 'added' : ''}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleAddToCart}
                    >
                        <CartIcon />
                        {addedToCart ? 'Added!' : 'Add to Cart'}
                    </motion.button>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    {category && (
                        <span className="product-category">{category}</span>
                    )}

                    <h3 className="product-name">{name}</h3>

                    {/* Rating */}
                    <div className="product-rating">
                        <div className="rating-stars">
                            <StarIcon />
                            <span>{rating}</span>
                        </div>
                        <span className="rating-count">({reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="product-price">
                        <span className="current-price">₹{price.toLocaleString()}</span>
                        {mrp > price && (
                            <>
                                <span className="original-price">₹{mrp.toLocaleString()}</span>
                                <span className="save-amount">Save ₹{(mrp - price).toLocaleString()}</span>
                            </>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
