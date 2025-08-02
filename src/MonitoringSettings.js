import React from 'react';
import './MonitoringSettings.css';

const MonitoringSettings = () => (
  <div className="monitoring-settings">
    
    {/* 設備監控設定 */}
    <div className="settings-section">
      <h3 className="section-title">設備監控設定</h3>
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">監控頻率</label>
          <select className="setting-input">
            <option value="1">每 1 秒</option>
            <option value="5" selected>每 5 秒</option>
            <option value="10">每 10 秒</option>
            <option value="30">每 30 秒</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label className="setting-label">數據保存期間</label>
          <select className="setting-input">
            <option value="7">7 天</option>
            <option value="30" selected>30 天</option>
            <option value="90">90 天</option>
            <option value="365">1 年</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label className="setting-label">自動備份</label>
          <div className="toggle-switch">
            <input type="checkbox" id="auto-backup" defaultChecked />
            <label htmlFor="auto-backup" className="toggle-slider"></label>
          </div>
        </div>
      </div>
    </div>

    {/* 警報設定 */}
    <div className="settings-section">
      <h3 className="section-title">警報設定</h3>
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">電壓上限 (V)</label>
          <input type="number" className="setting-input" defaultValue="220" min="0" max="300" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">電壓下限 (V)</label>
          <input type="number" className="setting-input" defaultValue="200" min="0" max="300" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">功率上限 (kW)</label>
          <input type="number" className="setting-input" defaultValue="100" min="0" max="1000" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">溫度上限 (°C)</label>
          <input type="number" className="setting-input" defaultValue="80" min="0" max="150" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">郵件通知</label>
          <div className="toggle-switch">
            <input type="checkbox" id="email-notify" defaultChecked />
            <label htmlFor="email-notify" className="toggle-slider"></label>
          </div>
        </div>
        
        <div className="setting-item">
          <label className="setting-label">簡訊通知</label>
          <div className="toggle-switch">
            <input type="checkbox" id="sms-notify" />
            <label htmlFor="sms-notify" className="toggle-slider"></label>
          </div>
        </div>
      </div>
    </div>

    {/* 網路設定 */}
    <div className="settings-section">
      <h3 className="section-title">網路設定</h3>
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">伺服器位址</label>
          <input type="text" className="setting-input" defaultValue="192.168.1.100" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">連接埠</label>
          <input type="number" className="setting-input" defaultValue="1880" min="1" max="65535" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">連線超時 (秒)</label>
          <input type="number" className="setting-input" defaultValue="30" min="5" max="300" />
        </div>
        
        <div className="setting-item">
          <label className="setting-label">自動重連</label>
          <div className="toggle-switch">
            <input type="checkbox" id="auto-reconnect" defaultChecked />
            <label htmlFor="auto-reconnect" className="toggle-slider"></label>
          </div>
        </div>
      </div>
    </div>

    {/* 操作按鈕 */}
    <div className="settings-actions">
      <button className="btn btn-primary">儲存設定</button>
      <button className="btn btn-secondary">重設為預設值</button>
      <button className="btn btn-danger">匯出設定</button>
    </div>
  </div>
);

export default MonitoringSettings;