import React, { useState } from 'react';
import { BsHouse, BsGear, BsClipboard2Pulse, BsEye } from 'react-icons/bs';
import FrequencyChart from './FrequencyChart.js';
import MonitoringSettings from './MonitoringSettings.js';
import Home from './Home.js';
import EQStatus from './EQStatus.js';
import './Dashboard.css';
// import backgroundImage from './assets/background.png'; // 如果使用 src 資料夾方案，取消註解這行

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('首頁');

  /*
  const menuItems = [
    { key: '首頁', icon: <BsHouse size={20} />, label: '首頁' },
    { key: '設備狀態', icon: <BsEye size={20} />, label: '設備狀態' },
    { key: '用電分析', icon: <BsClipboard2Pulse size={20} />, label: '用電分析' },
    { key: '監控設定', icon: <BsGear size={20} />, label: '監控設定' }
  ];
  */


  // ✅ 頁面內容渲染邏輯
  const renderPageContent = () => {
    switch (currentView) {
      case '首頁':
        return <Home />;
      
      case '用電分析':
        return <FrequencyChart />;
      
      case '監控設定':
        return <MonitoringSettings />;
      
      case '設備狀態':
        return <EQStatus />;
      
      default:
        return <Home />;
    }
  };

  return (
    <div className="dashboard">
      {/* 頂部標題欄 */}
      <div className="header">
        <div className="header-logo">
          <span className="header-title">智慧海膽養殖監控系統</span>
        </div>
      </div>

      <div className="dashboard-layout">
        {/* 左側垂直導航欄
        <nav className="sidebar">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`sidebar-item ${currentView === item.key ? 'active' : ''}`}
              onClick={() => setCurrentView(item.key)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
        */}
        {/* 主要內容區域 */}
        <div className="main-content">
          {/* 頁面內容 */}
          <div className="page-content">
            {renderPageContent()}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;