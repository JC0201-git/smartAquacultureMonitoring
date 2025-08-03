import React, { useState } from 'react';
//import { BsHouse, BsGear, BsClipboard2Pulse, BsEye } from 'react-icons/bs';
import FrequencyChart from './FrequencyChart.js';
import MonitoringSettings from './MonitoringSettings.js';
import Home from './Home.js';
import EQStatus from './EQStatus.js';
import MQTTSettings from './MQTTSettings';
import { useMQTT } from './useMQTT';
import { generateSensorData, generateIndividualSensorData, createControlMessage, createStatusMessage, createAlarmMessage } from './mqttTopics';
import './Dashboard.css';
// import backgroundImage from './assets/background.png'; // 如果使用 src 資料夾方案，取消註解這行

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('首頁');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMqttPanelVisible, setIsMqttPanelVisible] = useState(true);
  const [isTestPanelVisible, setIsTestPanelVisible] = useState(false);
  const [lastSentTime, setLastSentTime] = useState(null);
  const [sendStatus, setSendStatus] = useState('');
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [autoSendInterval, setAutoSendInterval] = useState(null);
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

  const { isConnected, connect, disconnect, publish } = useMQTT(mqttSettings.brokerUrl, mqttSettings);

  const handleSettingsSave = (newSettings) => {
    setMqttSettings(newSettings);
    localStorage.setItem('mqttSettings', JSON.stringify(newSettings));
  };

  const sendTestData = async (dataType) => {
    if (!isConnected) {
      setSendStatus('❌ 未連線，無法發送數據');
      return;
    }

    setSendStatus('📡 發送中...');
    
    try {
      let topic, data;
      
      switch (dataType) {
        case 'all':
          topic = mqttSettings.topics.sensorData;
          data = generateSensorData();
          break;
        case 'temperature':
          topic = mqttSettings.topics.temperature;
          data = generateIndividualSensorData('temperature');
          break;
        case 'ph':
          topic = mqttSettings.topics.ph;
          data = generateIndividualSensorData('ph');
          break;
        case 'salinity':
          topic = mqttSettings.topics.salinity;
          data = generateIndividualSensorData('salinity');
          break;
        case 'oxygen':
          topic = mqttSettings.topics.oxygen;
          data = generateIndividualSensorData('oxygen');
          break;
        case 'ammonia':
          topic = mqttSettings.topics.ammonia;
          data = generateIndividualSensorData('ammonia');
          break;
        case 'control':
          topic = mqttSettings.topics.control;
          data = createControlMessage('pump', 'start', { duration: 300 });
          break;
        case 'status':
          topic = mqttSettings.topics.status;
          data = createStatusMessage('online', { pump: 'running', heater: 'off' });
          break;
        case 'alarm':
          topic = mqttSettings.topics.alarms;
          data = createAlarmMessage('warning', '溫度過高', 28.5, 28.0);
          break;
        default:
          topic = mqttSettings.topics.sensorData;
          data = generateSensorData();
      }

      const success = await publish(topic, JSON.stringify(data));
      
      if (success) {
        setLastSentTime(new Date());
        setSendStatus('✅ 數據發送成功');
        setTimeout(() => setSendStatus(''), 3000);
      } else {
        setSendStatus('❌ 數據發送失敗');
        setTimeout(() => setSendStatus(''), 3000);
      }
    } catch (error) {
      console.error('發送測試數據失敗:', error);
      setSendStatus('❌ 發送過程中發生錯誤');
      setTimeout(() => setSendStatus(''), 3000);
    }
  };

  const toggleAutoSend = () => {
    if (isAutoSending) {
      if (autoSendInterval) {
        clearInterval(autoSendInterval);
        setAutoSendInterval(null);
      }
      setIsAutoSending(false);
      setSendStatus('⏹️ 自動傳送已停止');
    } else {
      const interval = setInterval(() => {
        sendTestData('all');
      }, 5000);
      
      setAutoSendInterval(interval);
      setIsAutoSending(true);
      setSendStatus('🔄 自動傳送已啟動 (每5秒)');
    }
    setTimeout(() => setSendStatus(''), 3000);
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
          <span className="header-subtitle">SMART AQUACULTURE MONITORING</span>
        </div>
        
        {/* MQTT 控制區域 */}
        <div className="mqtt-control-area">
          {/* MQTT 控制面板顯示/隱藏按鈕 */}
          <div className="mqtt-panel-toggle">
            <button 
              className="toggle-btn"
              onClick={() => setIsMqttPanelVisible(!isMqttPanelVisible)}
              title={isMqttPanelVisible ? '隱藏 MQTT 控制面板' : '顯示 MQTT 控制面板'}
            >
              {isMqttPanelVisible ? '◀' : '▶'}
            </button>
          </div>

          {/* MQTT 控制面板 */}
          {isMqttPanelVisible && (
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
          )}
        </div>

        {/* 測試數據傳送面板區域 */}
        <div className="test-control-area">
          {/* 測試面板切換按鈕 */}
          <div className="test-panel-toggle">
            <button 
              className="test-toggle-btn"
              onClick={() => setIsTestPanelVisible(!isTestPanelVisible)}
              title={isTestPanelVisible ? '隱藏測試面板' : '顯示測試面板'}
            >
              {isTestPanelVisible ? '▶' : '◀'}
            </button>
          </div>

          {/* 測試數據傳送面板 */}
          {isConnected && isTestPanelVisible && (
            <div className="header-test-panel">
              <div className="test-panel-header">
                <h4>📡 測試數據傳送</h4>
                {sendStatus && <span className="test-status-message">{sendStatus}</span>}
                {lastSentTime && (
                  <span className="test-last-sent">
                    上次: {lastSentTime.toLocaleTimeString()}
                  </span>
                )}
              </div>
              
              <div className="test-buttons-compact">
                <button className="test-btn-compact primary" onClick={() => sendTestData('all')} title="發送完整感測器數據">
                  🌊 完整
                </button>
                <button className="test-btn-compact sensor" onClick={() => sendTestData('temperature')} title="發送溫度數據">
                  🌡️ 溫度
                </button>
                <button className="test-btn-compact sensor" onClick={() => sendTestData('ph')} title="發送PH值數據">
                  🧪 PH
                </button>
                <button className="test-btn-compact sensor" onClick={() => sendTestData('salinity')} title="發送鹽度數據">
                  🧂 鹽度
                </button>
                <button className="test-btn-compact sensor" onClick={() => sendTestData('oxygen')} title="發送氧氣數據">
                  💨 氧氣
                </button>
                <button className="test-btn-compact sensor" onClick={() => sendTestData('ammonia')} title="發送氨氮數據">
                  ⚗️ 氨氮
                </button>
                <button className="test-btn-compact control" onClick={() => sendTestData('control')} title="發送控制指令">
                  🎛️ 控制
                </button>
                <button className="test-btn-compact status" onClick={() => sendTestData('status')} title="發送系統狀態">
                  📊 狀態
                </button>
                <button className="test-btn-compact alarm" onClick={() => sendTestData('alarm')} title="發送警報測試">
                  🚨 警報
                </button>
                <button 
                  className={`test-btn-compact auto ${isAutoSending ? 'active' : ''}`}
                  onClick={toggleAutoSend}
                  title={isAutoSending ? '停止自動傳送' : '開始自動傳送 (每5秒)'}
                >
                  {isAutoSending ? '⏹️ 停止' : '🔄 自動'}
                </button>
              </div>
            </div>
          )}
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