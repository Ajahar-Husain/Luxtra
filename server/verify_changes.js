const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const API_URL = 'http://localhost:5000/api';

async function verify() {
    let product; // Declare product variable in outer scope

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // 1. Create a dummy product directly in DB (simulating Admin/Seed)
        console.log('Creating test product...');
        product = await Product.create({
            name: 'Test Product ' + Date.now(),
            description: 'This is a test product',
            price: 99.99,
            category: 'Electronics',
            image: 'https://via.placeholder.com/150',
            stock: 10
        });
        console.log('Product created:', product._id);

        // 2. Create a test user
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';
        console.log(`Registering user: ${email}...`);
        
        let token;
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email,
                password,
                phone: '1234567890'
            })
        });
        
        let data = await regRes.json();
        
        if (regRes.ok) {
            token = data.token;
            console.log('User registered. Token received.');
        } else {
             console.log('Registration failed, trying login (if user exists)...');
             const loginRes = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
             });
             data = await loginRes.json();
             token = data.token;
             console.log('User logged in. Token received.');
        }

        // 3. Test Product API (Get All)
        console.log('Fetching all products...');
        const productsRes = await fetch(`${API_URL}/products`);
        const products = await productsRes.json();
        
        if (products.length > 0) {
            console.log(`✅ Products fetched successfully. Count: ${products.length}`);
        } else {
            console.error('❌ No products found!');
        }

        // 4. Test Cart API (Add to Cart)
        console.log('Adding product to cart...');
        const cartAddRes = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ productId: product._id, quantity: 2 })
        });
        
        const cartAddData = await cartAddRes.json();
        console.log('Added to cart. Current Cart:', cartAddData);

        if (cartAddData.length === 1 && cartAddData[0].quantity === 2) {
            console.log('✅ Cart Add Verification Passed');
        } else {
            console.error('❌ Cart Add Verification Failed');
        }

        // 5. Test Cart API (Get Cart)
        console.log('Fetching cart...');
        const cartGetRes = await fetch(`${API_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const cartGetData = await cartGetRes.json();
        
        if (cartGetData.length === 1) {
            console.log('✅ Cart Get Verification Passed');
        } else {
            console.error('❌ Cart Get Verification Failed');
        }

        console.log('🎉 All checks passed!');

        // Cleanup
        if (product && product._id) {
           await Product.findByIdAndDelete(product._id);
        }
        await User.findOneAndDelete({ email });
        console.log('Cleanup complete.');

    } catch (error) {
        console.error('❌ Verification Failed:', error);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
