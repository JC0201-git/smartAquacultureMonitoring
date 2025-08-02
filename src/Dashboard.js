import React, { useState } from 'react';
import { BsHouse, BsGear, BsClipboard2Pulse, BsEye } from 'react-icons/bs';
import FrequencyChart from './FrequencyChart.js';
import MonitoringSettings from './MonitoringSettings.js';
import Home from './Home.js';
import EQStatus from './EQStatus.js';
import MQTTSettings from './MQTTSettings';
import { useMQTT } from './useMQTT';
import './Dashboard.css';
// import backgroundImage from './assets/background.png'; // 如果使用 src 資料夾方案，取消註解這行

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('首頁');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mqttSettings, setMqttSettings] = useState({
    brokerUrl: 'ws://localhost:8083/mqtt',
    clientId: '',
    username: 'admin',
    password: 'admin123',
    keepalive: 60,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30000,
    topics: {
      sensorData: 'sea_urchin/sensors/data',
      temperature: 'sea_urchin/sensors/temperature',
      ph: 'sea_urchin/sensors/ph',
      salinity: 'sea_urchin/sensors/salinity',
      oxygen: 'sea_urchin/sensors/oxygen',
      ammonia: 'sea_urchin/sensors/ammonia',
      control: 'sea_urchin/control',
      status: 'sea_urchin/status',
      alarms: 'sea_urchin/alarms'
    }
  });

  const { isConnected, connect, disconnect } = useMQTT(mqttSettings.brokerUrl, mqttSettings);

  const handleSettingsSave = (newSettings) => {
    setMqttSettings(newSettings);
    localStorage.setItem('mqttSettings', JSON.stringify(newSettings));
  };

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      await connect();
    }
  };

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('mqttSettings');
    if (savedSettings) {
      setMqttSettings(JSON.parse(savedSettings));
    }
  }, []);

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
        return <Home mqttSettings={mqttSettings} />;
      
      case '用電分析':
        return <FrequencyChart />;
      
      case '監控設定':
        return <MonitoringSettings />;
      
      case '設備狀態':
        return <EQStatus />;
      
      default:
        return <Home mqttSettings={mqttSettings} />;
    }
  };

  return (
    <div className="dashboard">
      {/* 頂部標題欄 */}
      <div className="header">
        <div className="header-logo">
          <span className="header-title">智慧海膽養殖監控系統</span>
        </div>
        
        {/* MQTT 控制面板 */}
        <div className="header-mqtt-panel">
          <div className="mqtt-status-compact">
            <span className={`connection-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              {isConnected ? '● 已連線' : '● 未連線'}
            </span>
            <span className="broker-url-compact">{mqttSettings.brokerUrl}</span>
          </div>
          <div className="mqtt-actions-compact">
            <button 
              className="settings-btn-compact" 
              onClick={() => setIsSettingsOpen(true)}
              title="MQTT 設定"
            >
              ⚙️
            </button>
            <button 
              className={`connect-btn-compact ${isConnected ? 'disconnect' : 'connect'}`}
              onClick={handleConnect}
              title={isConnected ? '中斷連線' : '連線'}
            >
              {isConnected ? '中斷' : '連線'}
            </button>
          </div>
        </div>
      </div>

      {/* MQTT 設定彈窗 */}
      <MQTTSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSettingsSave}
        currentSettings={mqttSettings}
      />

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