import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Gift, Copy, Check } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [user?.id]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`/api/dashboard/${user.id}`);
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = async () => {
    if (dashboardData?.referralCode) {
      try {
        await navigator.clipboard.writeText(dashboardData.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              Loading dashboard...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {dashboardData?.name}!</h1>
          <p className="dashboard-subtitle">Track your referrals and unlock rewards</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">${dashboardData?.totalDonations?.toLocaleString()}</div>
            <div className="stat-label">Total Donations Raised</div>
          </div>
          
          <div className="stat-card secondary">
            <div className="stat-value">{dashboardData?.referralCode}</div>
            <div className="stat-label">Your Referral Code</div>
          </div>
          
          <div className="stat-card accent">
            <div className="stat-value">
              {dashboardData?.rewards?.filter(r => r.unlocked).length}/{dashboardData?.rewards?.length}
            </div>
            <div className="stat-label">Rewards Unlocked</div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Share Your Referral Code</h2>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--background-color)',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
                fontWeight: '700', 
                color: 'var(--primary-color)', 
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                {dashboardData?.referralCode}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Share this code with friends to earn rewards
              </div>
            </div>
            <button
              onClick={copyReferralCode}
              className="btn btn-primary"
              style={{ 
                minWidth: '120px',
                alignSelf: 'flex-start'
              }}
            >
              {copied ? (
                <>
                  <Check size={16} style={{ marginRight: '0.5rem' }} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} style={{ marginRight: '0.5rem' }} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Your Rewards</h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Unlock rewards by reaching donation milestones
            </div>
          </div>
          
          <div className="rewards-grid">
            {dashboardData?.rewards?.map((reward) => (
              <div 
                key={reward.id} 
                className={`reward-card ${reward.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="reward-icon">
                  <Gift size={24} />
                </div>
                <div className="reward-name">{reward.name}</div>
                <div className="reward-description">{reward.description}</div>
                {reward.unlocked && (
                  <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--secondary-color)',
                    fontWeight: '600'
                  }}>
                    ✓ UNLOCKED
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="card mt-6">
          <div className="card-header">
            <h2 className="card-title">Progress to Next Reward</h2>
          </div>
          <div style={{ padding: '1rem 0' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              <span>Current: ${dashboardData?.totalDonations}</span>
              <span>Next: $1000</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--border-color)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${Math.min((dashboardData?.totalDonations / 1000) * 100, 100)}%`,
                height: '100%',
                backgroundColor: 'var(--secondary-color)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              {dashboardData?.totalDonations >= 1000 
                ? 'All rewards unlocked! 🎉' 
                : `$${1000 - (dashboardData?.totalDonations || 0)} more to unlock the next reward`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 