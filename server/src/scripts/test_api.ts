import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';
let adminToken = '';
let clientToken = '';

async function runTests() {
  const results: any[] = [];

  const runTest = async (name: string, fn: () => Promise<void>) => {
    try {
      await fn();
      results.push({ name, status: 'PASS' });
      console.log(`[PASS] ${name}`);
    } catch (error: any) {
      results.push({ name, status: 'FAIL', error: error?.response?.data || error.message });
      console.error(`[FAIL] ${name}`, error?.response?.data || error.message);
    }
  };

  await runTest('Login', async () => {
    const res = await axios.post(`${API_URL}/auth/login`, { email: 'admin@thestudio.com', password: 'admin123' });
    adminToken = res.data.token;
    if (!adminToken) throw new Error('No admin token');

    const clientRes = await axios.post(`${API_URL}/auth/login`, { email: 'client@sterling.com', password: 'client123' });
    clientToken = clientRes.data.token;
    if (!clientToken) throw new Error('No client token');
  });

  await runTest('Registration', async () => {
    const res = await axios.post(`${API_URL}/auth/register`, { name: 'Test User', email: 'test_user@example.com', password: 'password123' });
    if (!res.data.token) throw new Error('Registration failed');
  });

  let leadId = '';
  await runTest('Lead Creation', async () => {
    const res = await axios.post(`${API_URL}/leads`, {
      client_name: 'Test Lead',
      email: 'lead@example.com',
      phone: '1234567890',
      event_date: '2025-01-01',
      guest_count: 100,
      budget: '10000',
      message: 'Test message'
    });
    leadId = res.data.data._id;
  });

  await runTest('Analytics Dashboard', async () => {
    const res = await axios.get(`${API_URL}/analytics/dashboard`, { headers: { Authorization: `Bearer ${adminToken}` } });
    if (!res.data.success) throw new Error('Analytics failed');
  });

  await runTest('Notification Delivery', async () => {
    const res = await axios.get(`${API_URL}/notifications`, { headers: { Authorization: `Bearer ${clientToken}` } });
    if (!res.data.success) throw new Error('Notifications failed');
  });

  // Print summary
  console.log('\n--- Test Summary ---');
  results.forEach(r => console.log(`${r.status}: ${r.name}`));
}

runTests();
