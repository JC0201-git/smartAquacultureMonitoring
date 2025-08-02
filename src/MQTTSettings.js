import React, { useState, useEffect } from 'react';
import './MQTTSettings.css';

const MQTTSettings = ({ isOpen, onClose, onSave, currentSettings }) => {
  const [settings, setSettings] = useState({
    brokerUrl: 'ws://localhost:8083/mqtt',
    clientId: '',
    username: '',
    password: '',
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

  useEffect(() => {
    if (currentSettings) {
      setSettings({ ...settings, ...currentSettings });
    }
  }, [currentSettings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTopicChange = (topicKey, value) => {
    setSettings(prev => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicKey]: value
      }
    }));
  };

  const handleSave = () => {
    const finalSettings = {
      ...settings,
      keepalive: parseInt(settings.keepalive) || 60,
      reconnectPeriod: parseInt(settings.reconnectPeriod) || 1000,
      connectTimeout: parseInt(settings.connectTimeout) || 30000,
      clientId: settings.clientId || `dashboard_${Math.random().toString(16).substring(2, 8)}`
    };
    
    onSave(finalSettings);
    onClose();
  };

  const handleReset = () => {
    setSettings({
      brokerUrl: 'ws://localhost:8083/mqtt',
      clientId: '',
      username: '',
      password: '',
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
  };

  if (!isOpen) return null;

  return (
    <div className="mqtt-settings-overlay">
      <div className="mqtt-settings-modal">
        <div className="mqtt-settings-header">
          <h3>MQTT Broker 連線設定</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="mqtt-settings-content">
          <div className="settings-section">
            <h4>基本連線設定</h4>
            
            <div className="input-group">
              <label htmlFor="brokerUrl">Broker URL *</label>
              <input
                type="text"
                id="brokerUrl"
                name="brokerUrl"
                value={settings.brokerUrl}
                onChange={handleInputChange}
                placeholder="ws://localhost:8083/mqtt"
                required
              />
              <small>支援 ws://, wss://, mqtt://, mqtts:// 協議</small>
            </div>

            <div className="input-group">
              <label htmlFor="clientId">客戶端 ID</label>
              <input
                type="text"
                id="clientId"
                name="clientId"
                value={settings.clientId}
                onChange={handleInputChange}
                placeholder="留空將自動生成"
              />
              <small>唯一識別此客戶端的 ID</small>
            </div>
          </div>

          <div className="settings-section">
            <h4>認證設定</h4>
            
            <div className="input-group">
              <label htmlFor="username">使用者名稱</label>
              <input
                type="text"
                id="username"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                placeholder="選填"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                id="password"
                name="password"
                value={settings.password}
                onChange={handleInputChange}
                placeholder="選填"
              />
            </div>
          </div>

          <div className="settings-section">
            <h4>進階設定</h4>
            
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="keepalive">Keep Alive (秒)</label>
                <input
                  type="number"
                  id="keepalive"
                  name="keepalive"
                  value={settings.keepalive}
                  onChange={handleInputChange}
                  min="1"
                  max="65535"
                />
              </div>

              <div className="input-group">
                <label htmlFor="reconnectPeriod">重連間隔 (毫秒)</label>
                <input
                  type="number"
                  id="reconnectPeriod"
                  name="reconnectPeriod"
                  value={settings.reconnectPeriod}
                  onChange={handleInputChange}
                  min="100"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="connectTimeout">連線逾時 (毫秒)</label>
              <input
                type="number"
                id="connectTimeout"
                name="connectTimeout"
                value={settings.connectTimeout}
                onChange={handleInputChange}
                min="1000"
              />
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="clean"
                  checked={settings.clean}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Clean Session
              </label>
              <small>是否清除之前的會話狀態</small>
            </div>
          </div>

          <div className="settings-section">
            <h4>主題 (Topic) 設定</h4>
            
            <div className="topic-grid">
              <div className="input-group">
                <label htmlFor="sensorData">感測器數據</label>
                <input
                  type="text"
                  id="sensorData"
                  value={settings.topics.sensorData}
                  onChange={(e) => handleTopicChange('sensorData', e.target.value)}
                  placeholder="sea_urchin/sensors/data"
                />
                <small>所有感測器數據的主題</small>
              </div>

              <div className="input-group">
                <label htmlFor="temperature">溫度感測器</label>
                <input
                  type="text"
                  id="temperature"
                  value={settings.topics.temperature}
                  onChange={(e) => handleTopicChange('temperature', e.target.value)}
                  placeholder="sea_urchin/sensors/temperature"
                />
              </div>

              <div className="input-group">
                <label htmlFor="ph">PH 值感測器</label>
                <input
                  type="text"
                  id="ph"
                  value={settings.topics.ph}
                  onChange={(e) => handleTopicChange('ph', e.target.value)}
                  placeholder="sea_urchin/sensors/ph"
                />
              </div>

              <div className="input-group">
                <label htmlFor="salinity">鹽度感測器</label>
                <input
                  type="text"
                  id="salinity"
                  value={settings.topics.salinity}
                  onChange={(e) => handleTopicChange('salinity', e.target.value)}
                  placeholder="sea_urchin/sensors/salinity"
                />
              </div>

              <div className="input-group">
                <label htmlFor="oxygen">氧氣感測器</label>
                <input
                  type="text"
                  id="oxygen"
                  value={settings.topics.oxygen}
                  onChange={(e) => handleTopicChange('oxygen', e.target.value)}
                  placeholder="sea_urchin/sensors/oxygen"
                />
              </div>

              <div className="input-group">
                <label htmlFor="ammonia">氨氮感測器</label>
                <input
                  type="text"
                  id="ammonia"
                  value={settings.topics.ammonia}
                  onChange={(e) => handleTopicChange('ammonia', e.target.value)}
                  placeholder="sea_urchin/sensors/ammonia"
                />
              </div>

              <div className="input-group">
                <label htmlFor="control">控制指令</label>
                <input
                  type="text"
                  id="control"
                  value={settings.topics.control}
                  onChange={(e) => handleTopicChange('control', e.target.value)}
                  placeholder="sea_urchin/control"
                />
                <small>設備控制指令主題</small>
              </div>

              <div className="input-group">
                <label htmlFor="status">系統狀態</label>
                <input
                  type="text"
                  id="status"
                  value={settings.topics.status}
                  onChange={(e) => handleTopicChange('status', e.target.value)}
                  placeholder="sea_urchin/status"
                />
                <small>系統運行狀態主題</small>
              </div>

              <div className="input-group">
                <label htmlFor="alarms">警報通知</label>
                <input
                  type="text"
                  id="alarms"
                  value={settings.topics.alarms}
                  onChange={(e) => handleTopicChange('alarms', e.target.value)}
                  placeholder="sea_urchin/alarms"
                />
                <small>警報和異常通知主題</small>
              </div>
            </div>
          </div>
        </div>

        <div className="mqtt-settings-footer">
          <button className="reset-btn" onClick={handleReset}>
            重設為預設值
          </button>
          <div className="action-buttons">
            <button className="cancel-btn" onClick={onClose}>
              取消
            </button>
            <button className="save-btn" onClick={handleSave}>
              儲存設定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MQTTSettings;