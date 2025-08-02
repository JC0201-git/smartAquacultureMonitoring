import React, { useState } from 'react';
import { BsHouse, BsGear, BsClipboard2Pulse, BsEye, BsClock, BsBell, BsPrinter } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import FrequencyChart from './FrequencyChart.js';
import './Dashboard.css';
// import backgroundImage from './assets/background.png'; // 如果使用 src 資料夾方案，取消註解這行

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('首頁');
  // const [selectedTab, setSelectedTab] = useState('首頁');


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
    { key: '首頁', icon: <BsHouse size={20} />, label: '首頁' },
    { key: '設備狀態', icon: <BsEye size={20} />, label: '設備狀態' },
    { key: '用電分析', icon: <BsClipboard2Pulse size={20} />, label: '用電分析' },
    { key: '監控設定', icon: <BsGear size={20} />, label: '監控設定' },    
    { key: '歷史圖表', icon: <BsClock size={20} />, label: '歷史圖表' },
    { key: '警報', icon: <BsBell size={20} />, label: '警報' },
    { key: '報表列印', icon: <BsPrinter size={20} />, label: '報表列印' }
  ];

  // ✅ 新增：iframe URL 配置
  const iframeUrls = {
    '設備狀態': 'http://localhost:1880/ui/#!/0?socketid=0VSjskW1n5N5bsTXAAAB', // 請替換為您的實際設備狀態頁面 URL
  };

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

  // ✅ 新增：將原有的主要內容包裝成函數
  const MainDashboardContent = () => (
    <>
      {/* 頂部數據卡片 */}
      <div className="top-cards">
        <div className="data-card">
          <h3>本月用電 (kWh)</h3>
          <div className="data-value">22.5</div>
          <div className="data-chart">
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={consumptionData}>
                <Line type="monotone" dataKey="value" stroke="#00ff88" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="data-card">
          <h3>本月成本 (twd)</h3>
          <div className="data-value">40.7</div>
          <div className="data-chart">
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={consumptionData}>
                <Line type="monotone" dataKey="value" stroke="#00ff88" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 中間圖表區域 */}
      <div className="charts-section">
        {/* 左側 - 用電量圖表 */}
        <div className="chart-container">
          <h3>用電量圖</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Area type="monotone" dataKey="value" stroke="#00ff88" fill="#00ff88" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#ff6b6b'}}></span>
              {'>'} 80
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#4ecdc4'}}></span>
              60+
            </span>
          </div>
        </div>

        {/* 中間 - 頻率圖表 */}
        <div className="chart-container">
          <h3>頻率圖表 (kWh)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[40, 52.5]} />
              <Line type="monotone" dataKey="value" stroke="#00ff88" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#00ff88'}}></span>
              A-series
            </span>
          </div>
        </div>

        {/* 右側 - 電壓圖表 */}
        <div className="chart-container">
          <h3>電壓圖表 (twd)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[50, 62]} />
              <Line type="monotone" dataKey="value" stroke="#00ff88" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: '#00ff88'}}></span>
              A-series
            </span>
          </div>
        </div>
      </div>

      {/* 警報資料表 */}
      <div className="alert-section">
        <h3>警報資料</h3>
        <div className="alert-table">
          <table>
            <thead>
              <tr>
                <th>time</th>
                <th>A-series</th>
              </tr>
            </thead>
            <tbody>
              {alertData.map((alert, index) => (
                <tr key={index}>
                  <td>{alert.time}</td>
                  <td>{alert.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 圓形進度指示器 */}
      <div className="progress-section">
        <CircularProgress percentage={100} title="分時器總狀態" />
        <CircularProgress percentage={100} title="用電狀態" />
        <CircularProgress percentage={100} title="運營狀態" />
        <CircularProgress percentage={100} title="網路狀態" />
      </div>
    </>
  );

  // ✅ 修改：移除iframe標題欄，只保留iframe內容，並設置透明背景
  const IframeContent = ({ url, title }) => (
    <div className="iframe-container transparent">
      <div className="iframe-wrapper transparent">
        <iframe
          src={url}
          title={title}
          className="iframe-content transparent"
          frameBorder="0"
          allowFullScreen
          style={{
            backgroundColor: 'transparent',
            background: 'transparent'
          }}
        />
      </div>
    </div>
  );

  // ✅ 新增：頁面內容渲染邏輯
  const renderPageContent = () => {
    switch (currentView) {
      case '首頁':
        return <MainDashboardContent />;
      
      case '用電分析':
        return <FrequencyChart />;
      
      case '設備狀態':
      case '監控設定':
      case '歷史圖表':
      case '警報':
      case '報表列印':
        return (
          <IframeContent 
            url={iframeUrls[currentView]} 
            title={currentView}
          />
        );
      
      default:
        return <MainDashboardContent />;
    }
  };

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
              className={`sidebar-item ${currentView === item.key ? 'active' : ''}`}
              onClick={() => setCurrentView(item.key)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* ✅ 修改：主要內容區域使用新的渲染邏輯 */}
        <div className="main-content">
          {renderPageContent()}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;