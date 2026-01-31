import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, setFilters } from '../redux/productSlice';
import ProductCard from '../components/products/ProductCard';
import './Grocery.css';

const Grocery = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector(selectProducts);

    // Filter grocery items
    const groceryProducts = allProducts.filter(p => p.category === 'grocery');

    const groceryCategories = [
        { name: 'Fresh Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', count: 45 },
        { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&q=80', count: 38 },
        { name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1617263590740-1e5f84d63336?w=400&q=80', count: 24 },
        { name: 'Grains & Rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', count: 32 },
        { name: 'Beverages', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', count: 56 },
        { name: 'Snacks', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80', count: 67 },
        { name: 'Organic', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', count: 28 },
        { name: 'Frozen', image: 'https://images.unsplash.com/photo-1547055734-7fc1ea66520d?w=400&q=80', count: 19 },
    ];

    return (
        <div className="grocery-page">
            <div className="container">
                {/* Hero Banner */}
                <motion.div
                    className="grocery-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="grocery-hero-content">
                        <h1>Fresh <span>Grocery</span> Delivered</h1>
                        <p>Get fresh fruits, vegetables, dairy products and more delivered to your doorstep</p>
                        <div className="hero-features">
                            <span>🚚 Free delivery above ₹499</span>
                            <span>⏰ 2-hour express delivery</span>
                            <span>🌿 100% Fresh guarantee</span>
                        </div>
                    </div>
                    <div className="grocery-hero-image">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Fresh Grocery" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                    </div>
                </motion.div>

                {/* Categories Grid */}
                <section className="grocery-categories">
                    <h2>Shop by Category</h2>
                    <div className="categories-grid">
                        {groceryCategories.map((cat, index) => (
                            <motion.div
                                key={cat.name}
                                className="grocery-category-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <img src={cat.image} alt={cat.name} className="category-image" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
                                <h4>{cat.name}</h4>
                                <span className="category-count">{cat.count} items</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Deals Section */}
                <section className="grocery-deals">
                    <div className="section-header">
                        <h2>Today's Deals 🔥</h2>
                        <span className="deal-timer">Ends in 05:42:18</span>
                    </div>

                    <motion.div
                        className="products-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {groceryProducts.slice(0, 4).map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* All Grocery Products */}
                <section className="grocery-all">
                    <div className="section-header">
                        <h2>All Grocery Items</h2>
                        <span className="item-count">{groceryProducts.length} products</span>
                    </div>

                    <motion.div
                        className="products-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {groceryProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default Grocery;
