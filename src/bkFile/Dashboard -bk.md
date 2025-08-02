/* Dashboard.css */
.dashboard {
  background-image: url('./background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dashboard > * {
  position: relative;
  z-index: 2;
}

/* ==========================================
   頂部標題欄
   ========================================== */
.header {
  background-color: transparent;
  padding: 20px 20px;
  border-bottom: none;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  background-color: #ff6b3d;
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
}

/* ==========================================
   主要布局
   ========================================== */
.dashboard-layout {
  display: flex;
  min-height: calc(100vh - 60px);
}

/* ==========================================
   左側垂直導航欄
   ========================================== */
.sidebar {
  width: 255px;
  background-color: transparent;
  padding: 90px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-item {
  background: none;
  border: none;
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  min-height: 52px;
  justify-content: flex-start;
  transition: all 0.3s ease;
  color: #666;
  font-size: 16px;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sidebar-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: #333;
}

.sidebar-icon {
  font-size: 16px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%);
  color: #555;
}

.sidebar-label {
  text-align: left;
  line-height: 1.2;
  font-weight: 500;
  white-space: nowrap;
  flex: 1;
  display: flex;
  align-items: center;
}

/* ==========================================
   主要內容區域
   ========================================== */
.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 155px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
}

/* ==========================================
   頂部數據卡片
   ========================================== */
.top-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.data-card {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.data-card h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #ccc;
}

.data-value {
  font-size: 36px;
  font-weight: bold;
  color: #00ff88;
  margin-bottom: 10px;
}

.data-chart {
  flex: 1;
}

/* ==========================================
   圖表區域
   ========================================== */
.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-container h3 {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #fff;
}

.chart-legend {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #ccc;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* ==========================================
   警報資料表
   ========================================== */
.alert-section {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.alert-section h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #fff;
}

.alert-table {
  overflow-x: auto;
}

.alert-table table {
  width: 100%;
  border-collapse: collapse;
}

.alert-table th,
.alert-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #444;
}

.alert-table th {
  background-color: #374151; /* ✅ 保持稍深的標題背景 */
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}

.alert-table td {
  color: #ccc;
  font-size: 13px;
}

/* ==========================================
   圓形進度指示器
   ========================================== */
.progress-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.circular-progress-container {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.circular-progress {
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: bold;
  color: #00ff88;
}

.progress-title {
  font-size: 12px;
  color: #fff;
  margin-bottom: 5px;
}

.progress-series {
  font-size: 11px;
  color: #00ff88;
}

/* ==========================================
   頻率分析頁面樣式
   ========================================== */
.frequency-chart-container {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  background: inherit;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  text-align: left;
}

/* 統一顏色的統計卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.stat-card.uniform-color {
  background-color: #1F2937; /* ✅ 統一顏色 */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stat-card.uniform-color .stat-title {
  font-size: 14px;
  color: #E5E7EB;
  margin-bottom: 8px;
  font-weight: normal;
}

.stat-card.uniform-color .stat-value {
  font-size: 24px;
  font-weight: bold;
  color: white;
  line-height: 1.2;
}

.stat-card.uniform-color .stat-unit {
  font-size: 14px;
  font-weight: normal;
  color: #D1D5DB;
  margin-left: 4px;
}

/* 頁籤按鈕 */
.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #374151;
  color: #D1D5DB;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-family: inherit;
}

.tab-button:hover {
  background-color: #4B5563;
  color: white;
}

.tab-button.active {
  background-color: #059669;
  color: white;
}

/* 主圖表容器 */
.main-chart {
  min-height: 500px;
  margin-bottom: 20px;
}

.chart-container.main-chart {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border: 1px solid #374151;
  padding: 20px;
  border-radius: 12px;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
  padding-left: 5px;
}

/* 分析摘要 */
.analysis-summary {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
  margin-top: 20px;
}

.summary-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
}

.summary-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.summary-section-title {
  font-weight: 500;
  color: #10B981;
  margin-bottom: 10px;
  font-size: 16px;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary-list li {
  color: #D1D5DB;
  font-size: 14px;
  margin-bottom: 5px;
  line-height: 1.4;
}

/* ==========================================
   ✅ 新增：橫向滿版分析摘要樣式
   ========================================== */

/* 橫向滿版分析摘要 */
.analysis-summary-fullwidth {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
  margin-bottom: 25px;
  width: 100%;
}

.analysis-summary-fullwidth .summary-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
}

.summary-content-horizontal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.analysis-summary-fullwidth .summary-section {
  display: flex;
  flex-direction: column;
}

.analysis-summary-fullwidth .summary-section-title {
  font-weight: 500;
  color: #10B981;
  margin-bottom: 12px;
  font-size: 16px;
}

.analysis-summary-fullwidth .summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.analysis-summary-fullwidth .summary-list li {
  color: #D1D5DB;
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.5;
  padding-left: 0;
}

/* ==========================================
   ✅ 新增：表格資料區域樣式
   ========================================== */

/* 表格區域容器 */
.data-table-section {
  background-color: #1F2937; /* ✅ 統一顏色 */
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
  margin-top: 25px;
}

.table-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
  margin-top: 0;
}

/* 表格容器 */
.data-table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #374151;
}

/* 表格樣式 */
.data-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #1F2937; /* ✅ 統一顏色，修改自原本的 #111827 */
}

.data-table th {
  background-color: #374151; /* ✅ 保持稍深的標題背景 */
  color: #F3F4F6;
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  border-bottom: 2px solid #4B5563;
}

.data-table td {
  padding: 12px 16px;
  color: #D1D5DB;
  font-size: 13px;
  border-bottom: 1px solid #374151;
}

.data-table tbody tr:hover {
  background-color: #374151; /* ✅ hover 效果稍微深一點 */
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

/* 狀態標籤 */
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  min-width: 50px;
  display: inline-block;
}

.status-normal {
  background-color: #10B981;
  color: white;
}

.status-warning {
  background-color: #F59E0B;
  color: white;
}

.status-error {
  background-color: #EF4444;
  color: white;
}

/* ==========================================
   iframe 容器樣式
   ========================================== */
.iframe-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1F2937; /* ✅ 統一顏色，修改自原本的 #1a1a1a */
  border-radius: 8px;
  overflow: hidden;
}

.iframe-header {
  background-color: #374151; /* ✅ 修改自原本的 #2a2a2a */
  padding: 15px 20px;
  border-bottom: 1px solid #4B5563; /* ✅ 修改自原本的 #3a3a3a */
}

.iframe-title {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.iframe-wrapper {
  flex: 1;
  position: relative;
  min-height: 600px;
  background-color: #ffffff;
}

.iframe-content {
  width: 100%;
  height: 100%;
  min-height: 600px;
  border: none;
  background-color: #ffffff;
}

.iframe-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #9CA3AF;
  font-size: 16px;
}

.iframe-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #EF4444;
  text-align: center;
}

.iframe-error h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.iframe-error p {
  margin: 0;
  color: #9CA3AF;
  font-size: 14px;
}

/* ==========================================
   Recharts 圖表樣式自定義
   ========================================== */
.recharts-cartesian-grid-horizontal line,
.recharts-cartesian-grid-vertical line {
  stroke: #374151 !important;
}

.recharts-xaxis-tick text,
.recharts-yaxis-tick text {
  fill: #9CA3AF !important;
  font-size: 11px;
}

.recharts-cartesian-axis-tick-value {
  fill: #9CA3AF !important;
}

.recharts-tooltip-wrapper {
  border-radius: 8px !important;
}

.recharts-default-tooltip {
  background-color: #1F2937 !important;
  border: 1px solid #374151 !important;
  border-radius: 8px !important;
  color: white !important;
}

/* ==========================================
   響應式設計
   ========================================== */
@media (max-width: 1400px) {
  .charts-section {
    grid-template-columns: 1fr 1fr;
  }
  
  .progress-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 1000px) {
  .dashboard-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    flex-direction: row;
    padding: 10px;
    overflow-x: auto;
  }
  
  .sidebar-item {
    min-width: 80px;
    padding: 8px 12px;
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .top-cards {
    grid-template-columns: 1fr;
  }
  
  .progress-section {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .main-content {
    margin-left: 0;
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .summary-content {
    grid-template-columns: 1fr;
  }
  
  .tab-buttons {
    flex-wrap: wrap;
  }
  
  .tab-button {
    flex: 1;
    min-width: 120px;
  }
  
  .frequency-chart-container {
    padding: 15px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .iframe-container {
    margin: 10px;
    border-radius: 4px;
  }
  
  .iframe-header {
    padding: 12px 15px;
  }
  
  .iframe-title {
    font-size: 16px;
  }
  
  .iframe-wrapper {
    min-height: 500px;
  }
  
  .iframe-content {
    min-height: 500px;
  }
  
  .summary-content-horizontal {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .analysis-summary-fullwidth {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .data-table-section {
    padding: 15px;
    margin-top: 20px;
  }
  
  .data-table th,
  .data-table td {
    padding: 8px 12px;
    font-size: 12px;
  }
  
  .table-title {
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .stats-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .stat-card.uniform-color {
    min-height: 80px;
    padding: 15px;
  }
  
  .stat-card.uniform-color .stat-value {
    font-size: 20px;
  }
  
  /* 表格在小螢幕上的處理 */
  .data-table-container {
    font-size: 11px;
  }
  
  .data-table th,
  .data-table td {
    padding: 6px 8px;
  }
  
  .status-badge {
    font-size: 10px;
    padding: 2px 6px;
    min-width: 40px;
  }
}

@media (max-width: 600px) {
  .main-content {
    padding: 10px;
  }
  
  .progress-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .tab-button {
    font-size: 12px;
    padding: 8px 15px;
  }
  
  .summary-content {
    gap: 15px;
  }
  
  .iframe-wrapper {
    min-height: 400px;
  }
  
  .iframe-content {
    min-height: 400px;
  }
  
  .analysis-summary-fullwidth .summary-list li {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  .summary-content-horizontal {
    gap: 15px;
  }
}