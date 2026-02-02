const API_URL = 'http://localhost:5000/api/auth';

const testAuth = async () => {
    try {
        console.log('Testing Registration...');
        const uniqueEmail = `test${Date.now()}@example.com`;
        
        const regRes = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: uniqueEmail,
                password: 'password123',
                phone: '1234567890'
            })
        });
        
        const regData = await regRes.json();
        console.log('Registration Status:', regRes.status);
        console.log('Registration Response:', regData);

        if (!regRes.ok) throw new Error('Registration failed');

        console.log('Testing Login...');
        const loginRes = await fetch(`${API_URL}/login`, {
             method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: uniqueEmail,
                password: 'password123'
            })
        });

        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        console.log('Login Response:', loginData);

    } catch (error) {
        console.error('Error:', error.message);
    }
};

testAuth();
