import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get('/api/leaderboard');
      if (response.data.success) {
        setLeaderboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy size={20} style={{ color: '#fbbf24' }} />;
      case 2:
        return <Medal size={20} style={{ color: '#9ca3af' }} />;
      case 3:
        return <Award size={20} style={{ color: '#cd7f32' }} />;
      default:
        return <span style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
              Loading leaderboard...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Leaderboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Top performers based on donations raised and referrals
          </p>
        </div>

        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <h2 className="leaderboard-title">🏆 Top Interns</h2>
          </div>
          
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 120px 120px',
              fontWeight: '600',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <div>Rank</div>
              <div>Name</div>
              <div style={{ textAlign: 'center' }}>Donations</div>
              <div style={{ textAlign: 'center' }}>Referrals</div>
            </div>
          </div>

          {leaderboardData.map((entry, index) => (
            <div key={index} className="leaderboard-row">
              <div className={`rank rank-${index + 1}`}>
                {getRankIcon(index + 1)}
              </div>
              <div className="name">{entry.name}</div>
              <div className="donations">${entry.donations.toLocaleString()}</div>
              <div className="referrals">{entry.referrals}</div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div style={{ marginTop: '2rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
                  fontWeight: '700', 
                  color: 'var(--primary-color)', 
                  marginBottom: '0.5rem' 
                }}>
                  ${leaderboardData.reduce((sum, entry) => sum + entry.donations, 0).toLocaleString()}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Total Donations
                </div>
              </div>
            </div>
            
            <div className="card">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
                  fontWeight: '700', 
                  color: 'var(--secondary-color)', 
                  marginBottom: '0.5rem' 
                }}>
                  {leaderboardData.reduce((sum, entry) => sum + entry.referrals, 0)}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Total Referrals
                </div>
              </div>
            </div>
            
            <div className="card">
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
                  fontWeight: '700', 
                  color: 'var(--accent-color)', 
                  marginBottom: '0.5rem' 
                }}>
                  {leaderboardData.length}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Active Interns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="card mt-6">
          <div className="card-header">
            <h2 className="card-title">🏅 Achievement Badges</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#fef3c7',
              borderRadius: '0.5rem',
              border: '1px solid #fbbf24'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>🥇</div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>Top Fundraiser</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {leaderboardData[0]?.name} - ${leaderboardData[0]?.donations.toLocaleString()}
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#dbeafe',
              borderRadius: '0.5rem',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>Referral King</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {leaderboardData.reduce((max, entry) => entry.referrals > max.referrals ? entry : max, leaderboardData[0])?.name} - {leaderboardData.reduce((max, entry) => entry.referrals > max.referrals ? entry : max, leaderboardData[0])?.referrals} referrals
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#dcfce7',
              borderRadius: '0.5rem',
              border: '1px solid #10b981'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>📈</div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>Consistent Performer</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Average: ${Math.round(leaderboardData.reduce((sum, entry) => sum + entry.donations, 0) / leaderboardData.length).toLocaleString()}
              </div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#fef2f2',
              borderRadius: '0.5rem',
              border: '1px solid #ef4444'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>🚀</div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>Rising Star</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Newest member of the team
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 