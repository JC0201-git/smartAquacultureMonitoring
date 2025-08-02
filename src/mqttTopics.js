export const DEFAULT_MQTT_TOPICS = {
  sensorData: 'sea_urchin/sensors/data',
  temperature: 'sea_urchin/sensors/temperature',
  ph: 'sea_urchin/sensors/ph',
  salinity: 'sea_urchin/sensors/salinity',
  oxygen: 'sea_urchin/sensors/oxygen',
  ammonia: 'sea_urchin/sensors/ammonia',
  control: 'sea_urchin/control',
  status: 'sea_urchin/status',
  alarms: 'sea_urchin/alarms'
};

export const TOPIC_DESCRIPTIONS = {
  sensorData: {
    label: '感測器數據',
    description: '所有感測器數據的主題',
    example: '{"temperature": 25.5, "ph": 7.8, "salinity": 32.1, "oxygen": 7.2, "ammonia": 0.05}'
  },
  temperature: {
    label: '溫度感測器',
    description: '水溫度感測器數據',
    example: '{"value": 25.5, "unit": "°C", "timestamp": "2024-01-01T12:00:00Z"}'
  },
  ph: {
    label: 'PH 值感測器',
    description: '水質酸鹼值感測器數據',
    example: '{"value": 7.8, "unit": "pH", "timestamp": "2024-01-01T12:00:00Z"}'
  },
  salinity: {
    label: '鹽度感測器',
    description: '水質鹽度感測器數據',
    example: '{"value": 32.1, "unit": "ppt", "timestamp": "2024-01-01T12:00:00Z"}'
  },
  oxygen: {
    label: '氧氣感測器',
    description: '溶解氧感測器數據',
    example: '{"value": 7.2, "unit": "mg/L", "timestamp": "2024-01-01T12:00:00Z"}'
  },
  ammonia: {
    label: '氨氮感測器',
    description: '氨氮含量感測器數據',
    example: '{"value": 0.05, "unit": "mg/L", "timestamp": "2024-01-01T12:00:00Z"}'
  },
  control: {
    label: '控制指令',
    description: '設備控制指令主題',
    example: '{"device": "pump", "action": "start", "duration": 300}'
  },
  status: {
    label: '系統狀態',
    description: '系統運行狀態主題',
    example: '{"system": "online", "devices": {"pump": "running", "heater": "off"}}'
  },
  alarms: {
    label: '警報通知',
    description: '警報和異常通知主題',
    example: '{"type": "warning", "message": "溫度過高", "value": 28.5, "threshold": 28.0}'
  }
};

export const MQTT_QOS_LEVELS = {
  0: '最多一次 (At most once)',
  1: '至少一次 (At least once)',
  2: '恰好一次 (Exactly once)'
};

export const generateSensorData = () => {
  return {
    timestamp: new Date().toISOString(),
    temperature: (20 + Math.random() * 10).toFixed(2),
    ph: (7.5 + Math.random() * 1).toFixed(2),
    salinity: (30 + Math.random() * 5).toFixed(2),
    oxygen: (6 + Math.random() * 2).toFixed(2),
    ammonia: (Math.random() * 0.5).toFixed(3)
  };
};

export const generateIndividualSensorData = (sensorType) => {
  const baseData = generateSensorData();
  const timestamp = new Date().toISOString();
  
  switch (sensorType) {
    case 'temperature':
      return {
        value: baseData.temperature,
        unit: '°C',
        timestamp
      };
    case 'ph':
      return {
        value: baseData.ph,
        unit: 'pH',
        timestamp
      };
    case 'salinity':
      return {
        value: baseData.salinity,
        unit: 'ppt',
        timestamp
      };
    case 'oxygen':
      return {
        value: baseData.oxygen,
        unit: 'mg/L',
        timestamp
      };
    case 'ammonia':
      return {
        value: baseData.ammonia,
        unit: 'mg/L',
        timestamp
      };
    default:
      return baseData;
  }
};

export const createControlMessage = (device, action, options = {}) => {
  return {
    device,
    action,
    timestamp: new Date().toISOString(),
    ...options
  };
};

export const createStatusMessage = (systemStatus, deviceStates = {}) => {
  return {
    system: systemStatus,
    devices: deviceStates,
    timestamp: new Date().toISOString()
  };
};

export const createAlarmMessage = (type, message, value = null, threshold = null) => {
  return {
    type,
    message,
    value,
    threshold,
    timestamp: new Date().toISOString()
  };
};