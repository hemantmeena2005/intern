const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (optional - we'll use dummy data for now)
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/intern-dashboard');

// Dummy data
const dummyUsers = [
  {
    id: 1,
    name: "Hemant",
    email: "hemant@example.com",
    referralCode: "hemant2025",
    totalDonations: 1250,
    rewards: [
      { id: 1, name: "Coffee Mug", unlocked: true, description: "Earned after first $100" },
      { id: 2, name: "Hoodie", unlocked: true, description: "Earned after $500" },
      { id: 3, name: "Gift Card", unlocked: false, description: "Unlock at $1000" },
      { id: 4, name: "Tech Gadget", unlocked: false, description: "Unlock at $2000" }
    ]
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@example.com",
    referralCode: "sarah2025",
    totalDonations: 890,
    rewards: [
      { id: 1, name: "Coffee Mug", unlocked: true, description: "Earned after first $100" },
      { id: 2, name: "Hoodie", unlocked: false, description: "Unlock at $500" },
      { id: 3, name: "Gift Card", unlocked: false, description: "Unlock at $1000" },
      { id: 4, name: "Tech Gadget", unlocked: false, description: "Unlock at $2000" }
    ]
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike@example.com",
    referralCode: "mike2025",
    totalDonations: 2100,
    rewards: [
      { id: 1, name: "Coffee Mug", unlocked: true, description: "Earned after first $100" },
      { id: 2, name: "Hoodie", unlocked: true, description: "Earned after $500" },
      { id: 3, name: "Gift Card", unlocked: true, description: "Earned after $1000" },
      { id: 4, name: "Tech Gadget", unlocked: true, description: "Earned after $2000" }
    ]
  }
];

const leaderboardData = [
  { name: "Mike Rodriguez", donations: 2100, referrals: 15 },
  { name: "Hemant", donations: 1250, referrals: 8 },
  { name: "Sarah Chen", donations: 890, referrals: 5 },
  { name: "Emily Davis", donations: 750, referrals: 3 },
  { name: "David Kim", donations: 600, referrals: 2 }
];

// Routes

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Dummy authentication - accept any email/password
  const user = dummyUsers.find(u => u.email === email);
  
  if (user) {
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode
      },
      token: 'dummy-jwt-token-' + user.id
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  // Dummy signup - just return success
  const newUser = {
    id: dummyUsers.length + 1,
    name,
    email,
    referralCode: name.toLowerCase().replace(/\s+/g, '') + '2025',
    totalDonations: 0,
    rewards: [
      { id: 1, name: "Coffee Mug", unlocked: false, description: "Earned after first $100" },
      { id: 2, name: "Hoodie", unlocked: false, description: "Unlock at $500" },
      { id: 3, name: "Gift Card", unlocked: false, description: "Unlock at $1000" },
      { id: 4, name: "Tech Gadget", unlocked: false, description: "Unlock at $2000" }
    ]
  };
  
  dummyUsers.push(newUser);
  
  res.json({
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      referralCode: newUser.referralCode
    },
    token: 'dummy-jwt-token-' + newUser.id
  });
});

// Get user dashboard data
app.get('/api/dashboard/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = dummyUsers.find(u => u.id === userId);
  
  if (user) {
    res.json({
      success: true,
      data: {
        name: user.name,
        referralCode: user.referralCode,
        totalDonations: user.totalDonations,
        rewards: user.rewards
      }
    });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json({
    success: true,
    data: leaderboardData
  });
});

// Get all users (for admin purposes)
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: dummyUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations
    }))
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Intern Dashboard API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 