import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Sample products for demo
const sampleProducts = [
  // Grocery
  { id: 1, name: 'Fresh Organic Apples', price: 149, mrp: 199, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80', rating: 4.5, reviews: 234, discount: 25, category: 'grocery', description: 'Fresh organic apples from Kashmir', stock: 100 },
  { id: 2, name: 'Premium Basmati Rice 5kg', price: 399, mrp: 499, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', rating: 4.8, reviews: 567, discount: 20, category: 'grocery', description: 'Long grain premium basmati rice', stock: 50 },
  { id: 4, name: 'Organic Almond Milk 1L', price: 199, mrp: 249, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80', rating: 4.6, reviews: 123, discount: 20, category: 'grocery', description: 'Pure organic almond milk', stock: 80 },
  { id: 6, name: 'Fresh Farm Eggs Pack of 12', price: 89, mrp: 120, image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=600&q=80', rating: 4.9, reviews: 789, discount: 26, category: 'grocery', description: 'Farm fresh organic eggs', stock: 200 },
  { id: 8, name: 'Arabica Coffee Beans 500g', price: 349, mrp: 449, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80', rating: 4.8, reviews: 567, discount: 22, category: 'grocery', description: 'Premium arabica coffee beans', stock: 60 },
  
  // Electronics
  { id: 3, name: 'Wireless Bluetooth Earbuds Pro', price: 1499, mrp: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', rating: 4.3, reviews: 892, discount: 50, category: 'electronics', description: 'High quality wireless earbuds with ANC', stock: 30 },
  { id: 5, name: 'Smart Fitness Watch Series 5', price: 2999, mrp: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', rating: 4.7, reviews: 456, discount: 40, category: 'electronics', description: 'Advanced fitness tracking watch', stock: 25 },
  { id: 10, name: 'Smartphone Stand Holder', price: 299, mrp: 499, image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80', rating: 4.2, reviews: 178, discount: 40, category: 'electronics', description: 'Adjustable phone stand', stock: 90 },
  { id: 13, name: '4K Action Camera', price: 4999, mrp: 7999, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80', rating: 4.6, reviews: 145, discount: 38, category: 'electronics', description: 'Ultra HD 4K Action Camera waterproof', stock: 15 },
  
  // Fashion (Cloth)
  { id: 7, name: 'Premium Cotton Hoodie', price: 899, mrp: 1499, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', rating: 4.4, reviews: 234, discount: 40, category: 'fashion', description: 'Comfortable premium cotton hoodie', stock: 45 },
  { id: 12, name: 'Running Shoes Pro', price: 1999, mrp: 3499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', rating: 4.6, reviews: 678, discount: 43, category: 'fashion', description: 'Professional running shoes', stock: 35 },
  { id: 14, name: 'Denim Jacket Classic', price: 1499, mrp: 2499, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80', rating: 4.5, reviews: 112, discount: 40, category: 'fashion', description: 'Classic blue denim jacket', stock: 40 },
  { id: 15, name: 'Summer Floral Dress', price: 799, mrp: 1299, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', rating: 4.7, reviews: 89, discount: 38, category: 'fashion', description: 'Lightweight summer floral dress', stock: 60 },

  // Toys
  { id: 16, name: 'Remote Control Car', price: 1299, mrp: 1999, image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80', rating: 4.6, reviews: 156, discount: 35, category: 'toys', description: 'High speed remote control car', stock: 20 },
  { id: 17, name: 'Building Blocks Set', price: 899, mrp: 1299, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80', rating: 4.8, reviews: 342, discount: 30, category: 'toys', description: 'Creative building blocks set for kids', stock: 50 },
  { id: 18, name: 'Plush Teddy Bear', price: 599, mrp: 999, image: 'https://images.unsplash.com/photo-1559454403-b8fb87521bc1?w=600&q=80', rating: 4.9, reviews: 567, discount: 40, category: 'toys', description: 'Soft and cuddly plush teddy bear', stock: 80 },
  { id: 19, name: 'Educational Puzzle', price: 399, mrp: 599, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80', rating: 4.5, reviews: 123, discount: 33, category: 'toys', description: 'Learning puzzle for early development', stock: 60 }
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // In real app, this would be an API call
      // const response = await api.get('/products', { params });
      // return response.data;
      
      // For demo, return sample products with filtering
      let filtered = [...sampleProducts];
      
      if (params.category) {
        filtered = filtered.filter(p => p.category === params.category);
      }
      if (params.search) {
        const search = params.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );
      }
      
      return {
        products: filtered,
        total: filtered.length,
        page: params.page || 1,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

const initialState = {
  products: sampleProducts,
  filteredProducts: sampleProducts,
  selectedProduct: null,
  categories: ['grocery', 'electronics', 'fashion', 'toys', 'home', 'beauty', 'sports'],
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: [0, 10000],
    rating: 0,
    sortBy: 'popular',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: sampleProducts.length,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters
      let filtered = [...state.products];
      
      if (state.filters.category) {
        filtered = filtered.filter(p => p.category === state.filters.category);
      }
      if (state.filters.search) {
        const search = state.filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(search)
        );
      }
      if (state.filters.rating > 0) {
        filtered = filtered.filter(p => p.rating >= state.filters.rating);
      }
      
      // Sort
      switch (state.filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        default:
          break;
      }
      
      state.filteredProducts = filtered;
      state.pagination.total = filtered.length;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredProducts = state.products;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.filteredProducts = action.payload.products;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products.filteredProducts;
export const selectAllProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;
export const selectFilters = (state) => state.products.filters;
export const selectCategories = (state) => state.products.categories;

export const { setFilters, clearFilters, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
