const API_URL = 'http://13.201.48.191:5000';

const checkAWS = async () => {
    try {
        console.log(`Checking connection to ${API_URL}...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const res = await fetch(API_URL, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            const text = await res.text();
            console.log('AWS Server Response:', text);
            console.log('✅ AWS Port 5000 is OPEN and Server is RUNNING.');
        } else {
            console.log(`❌ Server reachable but returned status: ${res.status}`);
        }
    } catch (error) {
        if (error.name === 'AbortError') {
             console.error('❌ Connection Timed Out. Port 5000 is likely CLOSED in AWS Security Groups.');
        } else {
            console.error('❌ Connection Error:', error.message);
        }
    }
};

checkAWS();
