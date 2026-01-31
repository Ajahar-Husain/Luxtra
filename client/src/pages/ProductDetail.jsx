import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { selectAllProducts, fetchProducts } from '../redux/productSlice';
import './ProductDetail.css';

// ... icons ...

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProducts = useSelector(selectAllProducts);

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        // If products are not loaded, we might want to fetch them
        // For now, we'll rely on the store being populated or check if we need to fetch
        if (allProducts.length === 0) {
            // Dispatch fetch action if available, or handle empty state
            // Assuming fetchProducts is available from productSlice
            dispatch(fetchProducts());
        }

        if (allProducts.length > 0) {
            const foundProduct = allProducts.find(p => p.id === parseInt(id));
            if (foundProduct) {
                const productWithImages = {
                    ...foundProduct,
                    images: foundProduct.images || [foundProduct.image, foundProduct.image, foundProduct.image]
                };
                setProduct(productWithImages);
            }
        }
    }, [id, allProducts, dispatch]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ product, quantity }));
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            dispatch(addToCart({ product, quantity }));
            navigate('/checkout');
        }
    };

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="container">
                    <div className="product-not-found">
                        <span>😔</span>
                        <h2>Product Not Found</h2>
                        <p>The product you're looking for doesn't exist.</p>
                        <Link to="/products" className="btn btn-primary">Browse Products</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/products">Products</Link>
                    <span>/</span>
                    <span>{product.category}</span>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail-content">
                    {/* Product Images */}
                    <div
                        className="product-images"
                    >
                        <div className="main-image">
                            <div className="image-placeholder">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="detail-main-image"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            {product.discount > 0 && (
                                <span className="discount-badge">-{product.discount}%</span>
                            )}
                        </div>
                        <div className="image-thumbnails">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={img} alt={`Thumbnail ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div
                        className="product-info"
                    >
                        <span className="product-category">{product.category}</span>
                        <h1 className="product-title">{product.name}</h1>

                        {/* Rating */}
                        <div className="product-rating">
                            <div className="rating-stars">
                                <StarIcon />
                                <span>{product.rating}</span>
                            </div>
                            <span className="rating-count">({product.reviews} reviews)</span>
                            <span className="stock-status">
                                {product.stock > 0 ? `✓ In Stock (${product.stock})` : '✗ Out of Stock'}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="product-price-section">
                            <span className="current-price">₹{product.price.toLocaleString()}</span>
                            {product.mrp > product.price && (
                                <>
                                    <span className="original-price">₹{product.mrp.toLocaleString()}</span>
                                    <span className="save-amount">Save ₹{(product.mrp - product.price).toLocaleString()}</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        {/* Quantity */}
                        <div className="quantity-section">
                            <label>Quantity:</label>
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="product-actions">
                            <motion.button
                                className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                            </motion.button>
                            <motion.button
                                className="buy-now-btn"
                                onClick={handleBuyNow}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Buy Now
                            </motion.button>
                            <button
                                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={() => setIsWishlisted(!isWishlisted)}
                            >
                                <HeartIcon filled={isWishlisted} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="product-features">
                            <div className="feature">
                                <TruckIcon />
                                <div>
                                    <strong>Free Delivery</strong>
                                    <span>On orders above ₹499</span>
                                </div>
                            </div>
                            <div className="feature">
                                <RefreshIcon />
                                <div>
                                    <strong>Easy Returns</strong>
                                    <span>7-day return policy</span>
                                </div>
                            </div>
                            <div className="feature">
                                <ShieldIcon />
                                <div>
                                    <strong>Secure Payment</strong>
                                    <span>100% secure checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
