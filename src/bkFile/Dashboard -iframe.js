import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './Dashboard.css';
// import backgroundImage from './assets/background.png'; // 如果使用 src 資料夾方案，取消註解這行

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('首頁');

  // 模擬數據
  const frequencyData = [
    { time: '10:30', value: 50 },
    { time: '11:00', value: 49.5 },
    { time: '11:30', value: 50.2 },
    { time: '12:00', value: 49.8 },
    { time: '12:30', value: 50.1 },
    { time: '13:00', value: 49.9 },
    { time: '13:30', value: 50.3 },
    { time: '14:00', value: 49.7 },
    { time: '14:30', value: 50.0 },
    { time: '15:00', value: 49.6 },
    { time: '15:30', value: 50.4 },
    { time: '16:00', value: 49.8 }
  ];

  const voltageData = [
    { time: '10:30', value: 58 },
    { time: '11:00', value: 57 },
    { time: '11:30', value: 59 },
    { time: '12:00', value: 56 },
    { time: '12:30', value: 60 },
    { time: '13:00', value: 58 },
    { time: '13:30', value: 57 },
    { time: '14:00', value: 59 },
    { time: '14:30', value: 56 },
    { time: '15:00', value: 58 },
    { time: '15:30', value: 57 },
    { time: '16:00', value: 59 }
  ];

  const consumptionData = [
    { time: '0', value: 0 },
    { time: '4', value: 15 },
    { time: '8', value: 25 },
    { time: '12', value: 30 },
    { time: '16', value: 25 },
    { time: '20', value: 20 },
    { time: '24', value: 10 }
  ];

  const alertData = [
    { time: '2025-07-07 10:19:16', series: 'A-series', value: 26.5 },
    { time: '2025-07-07 10:19:31', series: 'A-series', value: 26.9 },
    { time: '2025-07-07 10:19:46', series: 'A-series', value: 27.1 },
    { time: '2025-07-07 10:20:01', series: 'A-series', value: 27.4 }
  ];

  const menuItems = [
    { key: '首頁', icon: '🏠', label: '首頁' },
    { key: '監控設定', icon: '👁', label: '監控設定' },
    { key: '即時儀錶板', icon: '📊', label: '即時儀錶板' },
    { key: '歷史圖表', icon: '↻', label: '歷史圖表' },
    { key: '警報', icon: '🔔', label: '警報' },
    { key: '報表列印', icon: '🗃', label: '報表列印' }
  ];

  const CircularProgress = ({ percentage, title }) => (
    <div className="circular-progress-container">
      <div className="circular-progress">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#00ff88"
            strokeWidth="8"
            strokeDasharray={`${percentage * 3.14} 314`}
            strokeDashoffset="0"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="progress-text">{percentage}%</div>
      </div>
      <div className="progress-title">{title}</div>
      <div className="progress-series">A-series</div>
    </div>
  );

  return (
    <div className="dashboard">
      {/* 頂部標題欄 */}
      <div className="header">
        <div className="header-logo">
          {/*<span className="logo-icon"></span>
          <span className="header-title"></span> */}
        </div>
      </div>

      <div className="dashboard-layout">
        {/* 左側垂直導航欄 */}
        <nav className="sidebar">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`sidebar-item ${selectedTab === item.key ? 'active' : ''}`}
              onClick={() => setSelectedTab(item.key)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* 主要內容區域 */}
        <div className="main-content">
          <div className="main-content">
            {/* 原本的所有內容都被這個 iframe 取代 */}
            <div className="iframe-container">
              <iframe
                src="http://localhost:1880/ui?transparent=true"
                title="Dashboard"
                className="external-content"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;