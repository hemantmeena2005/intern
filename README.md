# Intern Dashboard

A modern full-stack intern dashboard application built with Node.js, Express, and React. Track referrals, donations, and unlock rewards with a beautiful, responsive interface.

## 🚀 Features

### Frontend
- **Modern React UI** with fully responsive design (mobile, tablet, desktop)
- **Authentication System** with login/signup pages
- **Dashboard** showing intern information, referral codes, and donation stats
- **Rewards System** with unlockable achievements
- **Leaderboard** displaying top performers
- **Copy-to-clipboard** functionality for referral codes
- **Progress tracking** towards next reward milestone
- **Mobile-first design** with hamburger menu and touch-friendly interface

### Backend
- **RESTful API** built with Express.js
- **Dummy authentication** (no real auth required)
- **Mock data** for users, donations, and rewards
- **CORS enabled** for frontend integration
- **Health check endpoint** for API monitoring

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Axios, Lucide React Icons
- **Backend**: Node.js, Express.js, CORS
- **Styling**: CSS3 with CSS Variables, Responsive Design
- **Development**: Concurrently for running both servers

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install-all
```

### 2. Start the Development Servers

```bash
# Start both backend and frontend servers
npm run dev
```

This will start:
- **Backend**: http://localhost:5001
- **Frontend**: http://localhost:3000

### 3. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
assignment/
├── package.json                 # Root package.json with scripts
├── README.md                   # This file
├── server/                     # Backend directory
│   ├── package.json           # Backend dependencies
│   └── index.js              # Express server with API endpoints
└── client/                    # Frontend directory
    ├── package.json          # React dependencies
    ├── public/               # Static files
    └── src/                  # React source code
        ├── components/       # React components
        ├── contexts/         # React contexts
        ├── App.js           # Main app component
        ├── index.js         # React entry point
        └── index.css        # Global styles
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both backend and frontend servers
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend server
- `npm run install-all` - Install dependencies for all packages

### Backend (server/)
- `npm run dev` - Start server with nodemon (auto-restart)
- `npm start` - Start server in production mode

### Frontend (client/)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Dashboard
- `GET /api/dashboard/:userId` - Get user dashboard data
- `GET /api/leaderboard` - Get leaderboard data
- `GET /api/users` - Get all users (admin)
- `GET /api/health` - Health check

## 👤 Demo Credentials

For testing purposes, you can use these demo accounts:

**Account 1:**
- Email: `hemant@example.com`
- Password: `any password`

**Account 2:**
- Email: `sarah@example.com`
- Password: `any password`

**Account 3:**
- Email: `mike@example.com`
- Password: `any password`

## 🎨 Features Overview

### Dashboard
- **Welcome Message** with personalized greeting
- **Stats Cards** showing total donations, referral code, and rewards unlocked
- **Referral Code Section** with copy-to-clipboard functionality
- **Rewards Display** showing unlocked and locked rewards
- **Progress Bar** indicating progress towards next reward

### Leaderboard
- **Ranked List** of top performers
- **Donation Totals** and referral counts
- **Achievement Badges** for different categories
- **Summary Statistics** for the entire team

### Authentication
- **Login Page** with email/password fields
- **Signup Page** with form validation
- **Protected Routes** requiring authentication
- **Persistent Sessions** using localStorage

## 🎯 Rewards System

The application includes a tiered rewards system:

1. **Coffee Mug** - Unlocked at $100
2. **Hoodie** - Unlocked at $500
3. **Gift Card** - Unlocked at $1000
4. **Tech Gadget** - Unlocked at $2000

## 🔧 Customization

### Adding New Users
Edit the `dummyUsers` array in `server/index.js` to add new users with their data.

### Modifying Rewards
Update the rewards array in the user objects to change reward tiers and descriptions.

### Styling Changes
Modify CSS variables in `client/src/index.css` to customize the color scheme and styling.

## 🚀 Deployment

### Backend Deployment
1. Set environment variables (optional)
2. Run `npm run build` in the server directory
3. Deploy to your preferred hosting service (Heroku, Vercel, etc.)

### Frontend Deployment
1. Run `npm run build` in the client directory
2. Deploy the `build` folder to your hosting service
3. Update API endpoints if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify both servers are running
4. Check the API endpoints are accessible

## 🎉 Bonus Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **Mobile-First Approach** - Touch-friendly interface with hamburger menu
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Real-time Updates** - Data refreshes automatically
- **Error Handling** - Graceful error messages
- **Loading States** - Smooth user experience
- **Accessibility** - Keyboard navigation and screen reader support
- **iOS/Android Optimized** - Prevents zoom on form inputs # intern
