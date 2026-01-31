import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectFilters, setFilters, clearFilters } from '../redux/productSlice';
import ProductCard from '../components/products/ProductCard';
import './Products.css';

const FilterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

const Products = () => {
    const [searchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const filters = useSelector(selectFilters);

    const categories = ['grocery', 'electronics', 'fashion', 'home', 'beauty', 'sports'];
    const sortOptions = [
        { value: 'popular', label: 'Popular' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'discount', label: 'Biggest Discount' },
    ];

    useEffect(() => {
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        if (category || search) {
            dispatch(setFilters({ category, search: search || '' }));
        }
    }, [searchParams, dispatch]);

    const handleCategoryChange = (category) => {
        dispatch(setFilters({
            category: filters.category === category ? null : category
        }));
    };

    const handleSortChange = (e) => {
        dispatch(setFilters({ sortBy: e.target.value }));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    return (
        <div className="products-page">
            <div className="container">
                {/* Page Header */}
                <motion.div
                    className="products-page-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="header-left">
                        <h1>All Products</h1>
                        <span className="product-count">{products.length} products</span>
                    </div>

                    <div className="header-right">
                        <button
                            className="filter-toggle-btn"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FilterIcon />
                            Filters
                        </button>

                        <select
                            className="sort-select"
                            value={filters.sortBy}
                            onChange={handleSortChange}
                        >
                            {sortOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                <div className="products-layout">
                    {/* Filters Sidebar */}
                    <motion.aside
                        className={`filters-sidebar ${showFilters ? 'show' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="filters-header">
                            <h3>Filters</h3>
                            <button className="clear-filters-btn" onClick={handleClearFilters}>
                                Clear All
                            </button>
                        </div>

                        <div className="filter-section">
                            <h4>Categories</h4>
                            <div className="filter-options">
                                {categories.map(cat => (
                                    <label key={cat} className="filter-option">
                                        <input
                                            type="checkbox"
                                            checked={filters.category === cat}
                                            onChange={() => handleCategoryChange(cat)}
                                        />
                                        <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="filter-section">
                            <h4>Rating</h4>
                            <div className="filter-options">
                                {[4, 3, 2, 1].map(rating => (
                                    <label key={rating} className="filter-option">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={filters.rating === rating}
                                            onChange={() => dispatch(setFilters({ rating }))}
                                        />
                                        <span>{rating}★ & above</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </motion.aside>

                    {/* Products Grid */}
                    <div className="products-content">
                        {products.length > 0 ? (
                            <motion.div
                                className="products-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {products.map((product, index) => (
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
                        ) : (
                            <div className="no-products">
                                <span>🔍</span>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or search terms</p>
                                <button className="btn btn-primary" onClick={handleClearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
