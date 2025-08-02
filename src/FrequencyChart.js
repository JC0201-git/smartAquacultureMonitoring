// src/FrequencyChart.js
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, Clock, Filter } from 'lucide-react';
import './FrequencyChart.css';

const FrequencyChart = () => {
  const [activeTab, setActiveTab] = useState('histogram');
  // 新增時間篩選狀態
  const [timeFilter, setTimeFilter] = useState({
    startDate: '2025-07-01',
    endDate: '2025-07-08',
    timeRange: 'all' // all, morning, afternoon, evening, night
  });
  
  // 模擬的 kWh 頻率數據
  const frequencyData = [
    { range: '0-10', frequency: 12, percentage: 8.5 },
    { range: '10-20', frequency: 28, percentage: 19.9 },
    { range: '20-30', frequency: 45, percentage: 31.9 },
    { range: '30-40', frequency: 38, percentage: 27.0 },
    { range: '40-50', frequency: 15, percentage: 10.6 },
    { range: '50-60', frequency: 3, percentage: 2.1 }
  ];

  // 時間序列頻率數據
  const timeSeriesData = [
    { time: '00:00', frequency: 15 },
    { time: '04:00', frequency: 8 },
    { time: '08:00', frequency: 32 },
    { time: '12:00', frequency: 45 },
    { time: '16:00', frequency: 38 },
    { time: '20:00', frequency: 28 },
    { time: '24:00', frequency: 12 }
  ];

  // 每日使用量分布
  const dailyDistribution = [
    { day: '週一', low: 18, medium: 25, high: 12 },
    { day: '週二', low: 22, medium: 28, high: 15 },
    { day: '週三', low: 20, medium: 32, high: 18 },
    { day: '週四', low: 25, medium: 35, high: 20 },
    { day: '週五', low: 28, medium: 38, high: 22 },
    { day: '週六', low: 15, medium: 20, high: 8 },
    { day: '週日', low: 12, medium: 18, high: 6 }
  ];

  // 表格數據
  const tableData = [
    { time: '2025-07-08 10:15:32', range: '20-30', frequency: 45, percentage: 31.9, status: '正常' },
    { time: '2025-07-08 10:30:18', range: '30-40', frequency: 38, percentage: 27.0, status: '正常' },
    { time: '2025-07-08 10:45:56', range: '10-20', frequency: 28, percentage: 19.9, status: '正常' },
    { time: '2025-07-08 11:02:14', range: '40-50', frequency: 15, percentage: 10.6, status: '注意' },
    { time: '2025-07-08 11:18:33', range: '0-10', frequency: 12, percentage: 8.5, status: '正常' },
    { time: '2025-07-08 11:35:47', range: '50-60', frequency: 3, percentage: 2.1, status: '異常' }
  ];

  // 處理時間篩選變更
  const handleTimeFilterChange = (field, value) => {
    setTimeFilter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 應用篩選按鈕處理
  const handleApplyFilter = () => {
    console.log('應用篩選:', timeFilter);
    // 這裡可以加入實際的篩選邏輯
  };

  // 重置篩選
  const handleResetFilter = () => {
    setTimeFilter({
      startDate: '2025-07-01',
      endDate: '2025-07-08',
      timeRange: 'all'
    });
  };

  const StatCard = ({ title, value, unit }) => (
    <div className="stat-card frequency-stat uniform-color">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value} <span className="stat-unit">{unit}</span></div>
    </div>
  );

  return (
    <div className="frequency-chart-container">
      {/* 標題與時間篩選器 */}
      <div className="page-header">
        
        {/* 時間篩選元件 */}
        <div className="time-filter-container">
          <div className="filter-row">
            <div className="date-range-group">
              <div className="input-group">
                <Calendar className="input-icon" size={16} />
                <label className="input-label">開始日期</label>
                <input
                  type="date"
                  value={timeFilter.startDate}
                  onChange={(e) => handleTimeFilterChange('startDate', e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="input-group">
                <Calendar className="input-icon" size={16} />
                <label className="input-label">結束日期</label>
                <input
                  type="date"
                  value={timeFilter.endDate}
                  onChange={(e) => handleTimeFilterChange('endDate', e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            
            <div className="time-range-group">
              <div className="input-group">
                <Clock className="input-icon" size={16} />
                <label className="input-label">時段</label>
                <select
                  value={timeFilter.timeRange}
                  onChange={(e) => handleTimeFilterChange('timeRange', e.target.value)}
                  className="time-select"
                >
                  <option value="all">全天</option>
                  <option value="morning">早上 (06:00-12:00)</option>
                  <option value="afternoon">下午 (12:00-18:00)</option>
                  <option value="evening">晚上 (18:00-24:00)</option>
                  <option value="night">夜間 (00:00-06:00)</option>
                </select>
              </div>
            </div>
            
            <div className="filter-actions">
              <button 
                onClick={handleApplyFilter}
                className="filter-button apply-button"
              >
                <Filter size={16} />
                套用篩選
              </button>
              <button 
                onClick={handleResetFilter}
                className="filter-button reset-button"
              >
                重置
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 統計卡片 */}
      <div className="stats-row">
        <StatCard 
          title="平均用電量"
          value="32.4"
          unit="kWh"
        />
        <StatCard 
          title="最高頻率區間"
          value="20-30"
          unit="kWh"
        />
        <StatCard 
          title="總樣本數"
          value="141"
          unit="筆"
        />
        <StatCard 
          title="標準差"
          value="12.7"
          unit="kWh"
        />
      </div>

      {/* 分析摘要 */}
      <div className="analysis-summary-fullwidth">
        <h3 className="summary-title">分析摘要</h3>
        <div className="summary-content-horizontal">
          <div className="summary-section">
            <h4 className="summary-section-title">主要發現</h4>
            <ul className="summary-list">
              <li>• 31.9% 的用電量集中在 20-30 kWh 區間</li>
              <li>• 工作日用電量普遍高於週末</li>
              <li>• 下午 12-16 時為用電高峰時段</li>
            </ul>
          </div>
          <div className="summary-section">
            <h4 className="summary-section-title">建議</h4>
            <ul className="summary-list">
              <li>• 可考慮在低峰時段進行高耗能作業</li>
              <li>• 週末可適度調整用電設備使用</li>
              <li>• 監控異常高用電量時段</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 頁籤選擇 */}
      <div className="tab-buttons">
        <button 
          onClick={() => setActiveTab('histogram')}
          className={`tab-button ${activeTab === 'histogram' ? 'active' : ''}`}
        >
          頻率分布圖
        </button>
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
        >
          時間序列
        </button>
        <button 
          onClick={() => setActiveTab('daily')}
          className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
        >
          每日分布
        </button>
      </div>

      {/* 圖表區域 */}
      <div className="chart-container main-chart">
        {activeTab === 'histogram' && (
          <div>
            <h2 className="chart-title">kWh 使用量頻率分布</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="range" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'frequency' ? `${value} 次` : `${value}%`,
                    name === 'frequency' ? '頻率' : '百分比'
                  ]}
                />
                <Bar dataKey="frequency" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h2 className="chart-title">24小時使用頻率趨勢</h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value} 次`, '使用頻率']}
                />
                <Area 
                  type="monotone" 
                  dataKey="frequency" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === 'daily' && (
          <div>
            <h2 className="chart-title">每日用電量分布</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dailyDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="day" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="low" stackId="a" fill="#EF4444" name="低用量 (0-20 kWh)" />
                <Bar dataKey="medium" stackId="a" fill="#F59E0B" name="中用量 (20-40 kWh)" />
                <Bar dataKey="high" stackId="a" fill="#10B981" name="高用量 (40+ kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* 表格資料區域 */}
      <div className="data-table-section">
        <h3 className="table-title">詳細數據記錄</h3>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>時間</th>
                <th>用電區間 (kWh)</th>
                <th>頻率</th>
                <th>百分比 (%)</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.time}</td>
                  <td>{row.range}</td>
                  <td>{row.frequency}</td>
                  <td>{row.percentage}%</td>
                  <td>
                    <span className={`status-badge ${row.status === '正常' ? 'status-normal' : 
                                                    row.status === '注意' ? 'status-warning' : 
                                                    'status-error'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FrequencyChart;