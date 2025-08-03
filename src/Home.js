import React, { useState } from 'react';
import './Home.css';
import phSvg from './graphicfile/ph.svg';
import saltSvg from './graphicfile/salt.svg';
import waterpoolImg from './graphicfile/waterpool.svg';
import { useMQTT } from './useMQTT';

const Home = ({ mqttSettings }) => {

  const { isConnected, subscribe, messages } = useMQTT(mqttSettings.brokerUrl, mqttSettings);
  const [currentTemperature, setCurrentTemperature] = useState('--.-');
  const [currentNH2, setCurrentNH2] = useState('--.-');
  const [currentO2, setCurrentO2] = useState('--.-');
  const [currentPH, setCurrentPH] = useState('--.-');
  const [currentSalt, setCurrentSalt] = useState('--.-');
  const [temperatureUpdateInterval, setTemperatureUpdateInterval] = useState(null);




  // 處理 MQTT 收到的感測器消息
  React.useEffect(() => {
    messages.forEach(msg => {
      console.log(`收到 MQTT 消息 - 主題: ${msg.topic}, 內容: ${msg.message}`);
      
      // 檢查是否為感測器相關的主題
      if (msg.topic === mqttSettings.topics.temperature || 
          msg.topic === mqttSettings.topics.ammonia ||
          msg.topic === mqttSettings.topics.oxygen ||
          msg.topic === mqttSettings.topics.ph ||
          msg.topic === mqttSettings.topics.salinity ||
          msg.topic === mqttSettings.topics.sensorData) {
        try {
          const data = JSON.parse(msg.message);
          
          // 處理溫度數據
          let temperature;
          if (msg.topic === mqttSettings.topics.temperature) {
            // 單一溫度數據
            temperature = data.value;
          } else if (msg.topic === mqttSettings.topics.sensorData) {
            // 完整感測器數據
            temperature = data.temperature;
          }
          
          if (temperature !== undefined) {
            setCurrentTemperature(parseFloat(temperature).toFixed(1));
            console.log(`溫度已更新: ${temperature}°C`);
          }

          // 處理 NH2/氨氮數據
          let nh2Value;
          if (msg.topic === mqttSettings.topics.ammonia) {
            // 單一氨氮數據
            nh2Value = data.value;
          } else if (msg.topic === mqttSettings.topics.sensorData) {
            // 完整感測器數據
            nh2Value = data.ammonia;
          }
          
          if (nh2Value !== undefined) {
            setCurrentNH2(parseFloat(nh2Value).toFixed(3));
            console.log(`NH2已更新: ${nh2Value} mg/L`);
          }

          // 處理 O2/氧氣數據
          let o2Value;
          if (msg.topic === mqttSettings.topics.oxygen) {
            // 單一氧氣數據
            o2Value = data.value;
          } else if (msg.topic === mqttSettings.topics.sensorData) {
            // 完整感測器數據
            o2Value = data.oxygen;
          }
          
          if (o2Value !== undefined) {
            setCurrentO2(parseFloat(o2Value).toFixed(1));
            console.log(`O2已更新: ${o2Value} mg/L`);
          }

          // 處理 pH 數據
          let phValue;
          if (msg.topic === mqttSettings.topics.ph) {
            // 單一 pH 數據
            phValue = data.value;
          } else if (msg.topic === mqttSettings.topics.sensorData) {
            // 完整感測器數據
            phValue = data.ph;
          }
          
          if (phValue !== undefined) {
            setCurrentPH(parseFloat(phValue).toFixed(1));
            console.log(`pH已更新: ${phValue}`);
          }

          // 處理鹽度數據
          let saltValue;
          if (msg.topic === mqttSettings.topics.salinity) {
            // 單一鹽度數據
            saltValue = data.value;
          } else if (msg.topic === mqttSettings.topics.sensorData) {
            // 完整感測器數據
            saltValue = data.salinity;
          }
          
          if (saltValue !== undefined) {
            setCurrentSalt(parseFloat(saltValue).toFixed(1));
            console.log(`鹽度已更新: ${saltValue}‰`);
          }
        } catch (error) {
          console.error('解析感測器數據失敗:', error);
        }
      }
    });
  }, [messages, mqttSettings.topics]);

  // 連線狀態變化時的處理
  React.useEffect(() => {
    if (isConnected) {
      // 訂閱溫度主題
      subscribe(mqttSettings.topics.temperature, (_, message) => {
        console.log(`收到溫度數據: ${message}`);
      });
      
      // 訂閱氨氮主題
      subscribe(mqttSettings.topics.ammonia, (_, message) => {
        console.log(`收到氨氮數據: ${message}`);
      });
      
      // 訂閱氧氣主題
      subscribe(mqttSettings.topics.oxygen, (_, message) => {
        console.log(`收到氧氣數據: ${message}`);
      });
      
      // 訂閱pH主題
      subscribe(mqttSettings.topics.ph, (_, message) => {
        console.log(`收到pH數據: ${message}`);
      });
      
      // 訂閱鹽度主題
      subscribe(mqttSettings.topics.salinity, (_, message) => {
        console.log(`收到鹽度數據: ${message}`);
      });
      
      // 訂閱完整感測器數據主題
      subscribe(mqttSettings.topics.sensorData, (_, message) => {
        console.log(`收到感測器數據: ${message}`);
      });

      // 設置5秒更新頻率 - 定期請求溫度數據
      const interval = setInterval(() => {
        // 這裡可以發送請求溫度數據的指令，或者等待自動更新
        console.log('等待溫度數據更新...');
      }, 5000);
      
      setTemperatureUpdateInterval(interval);
    } else {
      // 斷線時清除更新間隔
      if (temperatureUpdateInterval) {
        clearInterval(temperatureUpdateInterval);
        setTemperatureUpdateInterval(null);
      }
      setCurrentTemperature('--.-');
      setCurrentNH2('--.-');
      setCurrentO2('--.-');
      setCurrentPH('--.-');
      setCurrentSalt('--.-');
    }
  }, [isConnected, mqttSettings.topics, subscribe]);


  React.useEffect(() => {
    return () => {
      if (temperatureUpdateInterval) {
        clearInterval(temperatureUpdateInterval);
      }
    };
  }, [temperatureUpdateInterval]);

  return (
    <div className="home-container">


      {/* 中央水池圖片 */}
      <img 
        src={waterpoolImg} 
        alt="水池圖" 
        className="waterpool-img"
      />

      <div className="ph-svg-container">
        <svg width="190.493103" height="160.565109" viewBox="0 0 190.493 160.565" fill="none" xmlns="http://www.w3.org/2000/svg" className="ph-svg">
          <desc>Created with Pixso.</desc>
          <defs>
            <radialGradient gradientTransform="translate(54 46) rotate(0) scale(35 35)" cx="0.000000" cy="0.000000" r="1.000000" id="paint_radial_2_39_0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.298039"/>
              <stop offset="1.000000" stopColor="#4A90B8" stopOpacity="0.000000"/>
            </radialGradient>
          </defs>
          <g opacity="0.800000">
            <circle id="circle" cx="54.000000" cy="46.000000" r="45.000000" fill="#000000" fillOpacity="0"/>
            <circle id="circle" cx="54.000000" cy="46.000000" r="45.000000" stroke="#4A90B8" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          </g>
          <circle id="circle" cx="54.000000" cy="46.000000" r="35.000000" fill="url(#paint_radial_2_39_0)" fillOpacity="1.000000"/>
          <path id="pH" d="M51.26 44L49.4 44L49.4 29.32L51.26 29.32L51.26 35.47L58.09 35.47L58.09 29.32L59.93 29.32L59.93 44L58.09 44L58.09 37.08L51.26 37.08L51.26 44ZM38.66 48.58L36.84 48.58L36.84 33.14L38.33 33.14L38.5 34.38L38.55 34.38C39.54 33.58 40.76 32.86 42.02 32.86C44.81 32.86 46.33 35.05 46.33 38.39C46.33 42.12 44.12 44.25 41.62 44.25C40.63 44.25 39.59 43.79 38.61 42.99L38.66 44.89L38.66 48.58ZM38.66 41.59C39.63 42.44 40.6 42.74 41.31 42.74C43.12 42.74 44.43 41.11 44.43 38.41C44.43 36.02 43.63 34.4 41.58 34.4C40.65 34.4 39.72 34.91 38.66 35.89L38.66 41.59Z" fill="#D4A574" fillOpacity="1.000000" fillRule="evenodd"/>
          <circle id="circle" cx="62.000000" cy="58.000000" r="12.000000" fill="#000000" fillOpacity="0"/>
          <circle id="circle" cx="62.000000" cy="58.000000" r="12.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          <path id="7" d="M62.27 66L60.56 66C60.77 60.99 61.69 57.8 64.27 54.2L57.88 54.2L57.88 52.79L66.14 52.79L66.14 53.79C63.04 57.75 62.47 60.83 62.27 66Z" fill="#D4A574" fillOpacity="1.000000" fillRule="evenodd"/>
          <path id="pH值" d="M48.1 112.28L48.1 123.36L49.62 123.36L49.62 125.36L36.16 125.36L36.16 123.36L37.88 123.36L37.88 112.28L41.34 112.28C41.42 111.86 41.5 111.4 41.58 110.91L37.04 110.91L37.04 108.87L41.86 108.87C41.92 108.23 41.98 107.66 42.02 107.1L44.54 107.17C44.46 107.74 44.34 108.3 44.24 108.87L49.16 108.87L49.16 110.91L43.82 110.91C43.7 111.42 43.6 111.86 43.48 112.28L48.1 112.28ZM30.78 114.6C32.5 112.77 34.14 109.96 35.1 107.12L37.26 107.83C36.74 109.29 36.06 110.78 35.32 112.19L35.32 125.71L33.12 125.71L33.12 115.73C32.76 116.22 32.4 116.66 32.04 117.08C31.82 116.5 31.18 115.2 30.78 114.6ZM28.27 110.12L25.81 110.12L25.81 115.7L18.38 115.7L18.38 110.12L15.92 110.12L15.92 124L18.38 124L18.38 117.97L25.81 117.97L25.81 124L28.27 124L28.27 110.12ZM45.9 115.11L45.9 114.02L39.98 114.02L39.98 115.11L45.9 115.11ZM8.24 114.31Q7.55 114.16 6.82 114.16Q6.36 114.16 5.91 114.22Q4.81 114.35 3.75 114.81L3.53 114.35L1.75 114.35L1.75 129.18L4.25 129.18L4.25 123.86Q4.8 124.03 5.37 124.11Q5.92 124.19 6.49 124.19Q8.6 124.19 9.96 123.18Q10.18 123.02 10.39 122.83Q10.7 122.53 10.95 122.19Q11.83 120.95 11.83 119.07Q11.83 117.98 11.53 117.12Q11.23 116.25 10.74 115.71Q10.63 115.59 10.51 115.47Q10.1 115.09 9.58 114.81Q8.92 114.45 8.24 114.31ZM4.25 116.63Q5.22 116.29 6.19 116.29Q6.63 116.29 7.04 116.35Q7.45 116.42 7.91 116.62Q8.36 116.83 8.7 117.14Q9.03 117.46 9.25 118.02Q9.47 118.59 9.47 119.32Q9.47 119.98 9.25 120.49Q9.04 121.01 8.71 121.31Q8.37 121.61 7.92 121.8Q7.48 121.99 7.07 122.06Q6.66 122.13 6.22 122.13Q5.27 122.13 4.25 121.84L4.25 116.63ZM39.98 117.86L45.9 117.86L45.9 116.75L39.98 116.75L39.98 117.86ZM45.9 120.6L45.9 119.45L39.98 119.45L39.98 120.6L45.9 120.6ZM45.9 122.24L39.98 122.24L39.98 123.36L45.9 123.36L45.9 122.24Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <text id="svg_phvalue" x="100" y="140" fill="#FFFFFF" fontSize="36" fontWeight="bold" textAnchor="middle">
            {currentPH}
          </text>
          <g opacity="0.600000">
            <line id="line" x1="88.000000" y1="71.000000" x2="190.000000" y2="160.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          </g>
        </svg>
      </div>

      <div className="temperature-svg-container">
        <svg width="300" height="197.223724" viewBox="0 0 177.716 197.224" fill="none" xmlns="http://www.w3.org/2000/svg" className="trmperature-svg">
          <desc>Created with Pixso.</desc>
          <defs>
            <radialGradient gradientTransform="translate(49.7159 46) rotate(0) scale(35 35)" cx="0.000000" cy="0.000000" r="1.000000" id="paint_radial_2_3_0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.298039"/>
              <stop offset="1.000000" stopColor="#4A90B8" stopOpacity="0.000000"/>
            </radialGradient>
          </defs>
          <g opacity="0.800000">
            <circle id="circle" cx="49.715874" cy="46.000000" r="45.000000" fill="#000000" fillOpacity="0"/>
            <circle id="circle" cx="49.715874" cy="46.000000" r="45.000000" stroke="#4A90B8" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          </g>
          <circle id="circle" cx="49.715874" cy="46.000000" r="35.000000" fill="url(#paint_radial_2_3_0)" fillOpacity="1.000000"/>
          <rect id="rect" x="44.715874" y="21.000000" rx="3.000000" width="10.000000" height="36.764706" fill="#000000" fillOpacity="0"/>
          <rect id="rect" x="44.715874" y="21.000000" rx="3.000000" width="10.000000" height="36.764706" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          <ellipse id="circle" cx="49.715874" cy="62.176483" rx="10.000000" ry="8.823528" fill="#D4A574" fillOpacity="1.000000"/>
          <ellipse id="circle" cx="49.715874" cy="62.176483" rx="10.000000" ry="8.823528" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          <path id="path" d="" fill="#000000" fillOpacity="0" fillRule="nonzero"/>
          <path id="path" d="M49.71 28.35L49.71 50.41" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          <path id="溫度" d="M88.75 105L74.35 105L74.35 108.07C74.35 111.44 74.09 116.44 72.43 119.69C71.95 119.36 70.87 118.85 70.25 118.67C71.85 115.59 71.99 111.14 71.99 108.09L71.99 102.78L79.45 102.78C79.31 102.32 79.15 101.83 78.97 101.46L81.39 100.92C81.67 101.48 81.95 102.16 82.15 102.78L88.75 102.78L88.75 105ZM52.69 101.12C53.85 101.59 55.39 102.39 56.15 103.05L54.77 105.02C54.05 104.33 52.55 103.43 51.35 102.92L52.69 101.12ZM57.27 101.92L67.11 101.92L67.11 110.04L57.27 110.04L57.27 101.92ZM59.41 108.25L64.85 108.25L64.85 103.67L59.41 103.67L59.41 106.99C60.65 106.34 61.31 105.08 61.49 103.82L63.07 104C62.99 104.42 62.85 104.84 62.69 105.24C63.41 105.84 64.27 106.57 64.71 107.03L63.63 108.05C63.27 107.63 62.67 107.03 62.07 106.48C61.63 107.14 61.07 107.7 60.37 108.07C60.17 107.78 59.73 107.28 59.41 107.03L59.41 108.25ZM85.69 108.64L85.69 111.76L77.45 111.76L77.45 108.64L74.75 108.64L74.75 106.77L77.45 106.77L77.45 105.46L79.69 105.46L79.69 106.77L83.33 106.77L83.33 105.46L85.69 105.46L85.69 106.77L88.57 106.77L88.57 108.64L85.69 108.64ZM51.61 106.5C52.79 106.92 54.31 107.67 55.07 108.32L53.69 110.3C52.99 109.64 51.51 108.8 50.33 108.27L51.61 106.5ZM83.33 109.95L83.33 108.64L79.69 108.64L79.69 109.95L83.33 109.95ZM67.87 111.06L67.87 117.08L69.09 117.08L69.09 119.13L54.93 119.13L54.93 117.08L56.59 117.08L56.59 111.06L67.87 111.06ZM50.67 118.09C51.59 116.56 52.87 114.04 53.89 111.7L55.75 113.12C54.87 115.26 53.81 117.56 52.79 119.49L50.67 118.09ZM85.67 112.56L86.09 112.48L87.57 113.23C86.73 114.8 85.53 115.99 84.05 116.94C85.57 117.3 87.25 117.52 89.07 117.65C88.61 118.16 88.01 119.11 87.71 119.71C85.27 119.47 83.11 119.02 81.23 118.25C79.33 118.94 77.17 119.36 74.91 119.6C74.73 119.04 74.29 118.14 73.93 117.61C75.59 117.48 77.19 117.28 78.65 116.92C77.73 116.3 76.91 115.55 76.23 114.73L77.03 114.42L74.91 114.42L74.91 112.56L85.67 112.56ZM59.83 113.05L58.71 113.05L58.71 117.08L59.83 117.08L59.83 113.05ZM62.71 117.08L62.71 113.05L61.59 113.05L61.59 117.08L62.71 117.08ZM65.63 117.08L65.63 113.05L64.49 113.05L64.49 117.08L65.63 117.08ZM81.35 116.04C82.37 115.59 83.25 115.08 83.99 114.42L78.71 114.42C79.41 115.06 80.31 115.59 81.35 116.04Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <text id="svg_tempvalue" x="156" y="110" fill="#FFFFFF" fontSize="36" fontWeight="bold" textAnchor="middle">
            {currentTemperature}°C
          </text>
          <g opacity="0.600000">
            <line id="line" x1="35.715858" y1="85.000000" x2="0.715858" y2="197.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          </g>
        </svg>
      </div> 

      <div className="o2-svg-container">
        <svg width="230.620941" height="145.420639" viewBox="0 0 230.621 145.421" fill="none" xmlns="http://www.w3.org/2000/svg" className="O2-svg">
          <desc>Created with Pixso.</desc>
          <defs>
            <radialGradient gradientTransform="translate(105.621 46) rotate(0) scale(35 35)" cx="0.000000" cy="0.000000" r="1.000000" id="paint_radial_7_661_0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.298039"/>
              <stop offset="1.000000" stopColor="#4A90B8" stopOpacity="0.000000"/>
            </radialGradient>
          </defs>
          <g opacity="0.800000">
            <circle id="circle" cx="105.620941" cy="46.000000" r="45.000000" fill="#000000" fillOpacity="0"/>
            <circle id="circle" cx="105.620941" cy="46.000000" r="45.000000" stroke="#4A90B8" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          </g>
          <circle id="circle" cx="105.620941" cy="46.000000" r="35.000000" fill="url(#paint_radial_7_661_0)" fillOpacity="1.000000"/>
          <g opacity="0.800000">
            <circle id="circle" cx="89.120941" cy="34.500000" r="7.500000" fill="#D4A574" fillOpacity="1.000000"/>
          </g>
          <g opacity="0.600000">
            <circle id="circle" cx="110.120941" cy="28.500000" r="5.500000" fill="#D4A574" fillOpacity="1.000000"/>
          </g>
          <g opacity="0.700000">
            <circle id="circle" cx="119.120941" cy="47.500000" r="9.500000" fill="#D4A574" fillOpacity="1.000000"/>
          </g>
          <g opacity="0.500000">
            <circle id="circle" cx="99.120941" cy="58.500000" r="6.500000" fill="#D4A574" fillOpacity="1.000000"/>
          </g>
          <path id="O₂" d="M118.3 56.62C118.3 61.31 115.72 64.25 112.04 64.25C108.36 64.25 105.78 61.31 105.78 56.62C105.78 51.91 108.36 49.05 112.04 49.05C115.72 49.05 118.3 51.91 118.3 56.62ZM107.68 56.62C107.68 60.27 109.4 62.63 112.04 62.63C114.66 62.63 116.4 60.27 116.4 56.62C116.4 52.94 114.66 50.67 112.04 50.67C109.4 50.67 107.68 52.94 107.68 56.62ZM127.02 66.5L120.45 66.5L120.45 65.39L123.77 62.43C124.77 61.55 125.28 61.01 125.28 60.27C125.28 59.42 124.54 58.88 123.58 58.88C122.55 58.88 121.87 59.48 121.87 60.36L120.39 60.36C120.39 58.74 121.73 57.66 123.6 57.66C125.48 57.66 126.76 58.77 126.76 60.25C126.76 61.41 126.08 62.2 124.52 63.57L122.66 65.19L122.66 65.25L127.02 65.25L127.02 66.5Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <path id="溶氧量" d="M173.3 32.11L165.23 32.11L165.23 33.94L163.12 33.94L163.12 30.18L168.26 30.18C168.08 29.61 167.82 29.03 167.56 28.54L169.76 27.88C170.16 28.59 170.6 29.5 170.84 30.18L175.54 30.18L175.54 33.94L173.3 33.94L173.3 32.11ZM195.28 29.67L195.28 31.44L182.06 31.44C181.02 32.95 179.8 34.28 178.52 35.23C178.22 34.78 177.4 33.79 176.94 33.35C178.76 32.13 180.42 30.14 181.36 28.02L183.62 28.68C183.46 29.01 183.3 29.36 183.12 29.67L195.28 29.67ZM159.38 28.41C160.5 28.96 162.11 29.78 162.92 30.4L161.54 32.31C160.78 31.69 159.19 30.78 158.06 30.16L159.38 28.41ZM200.1 28.66L213.1 28.66L213.1 33.59L200.1 33.59L200.1 28.66ZM202.4 30.54L210.7 30.54L210.7 29.9L202.4 29.9L202.4 30.54ZM202.4 32.37L210.7 32.37L210.7 31.71L202.4 31.71L202.4 32.37ZM193.54 32.17L193.54 33.81L181.86 33.81L181.86 32.17L193.54 32.17ZM173.68 37.29C172.92 36.36 171.27 34.87 170.01 33.81L171.66 32.68C172.92 33.63 174.59 35.05 175.43 36L173.68 37.29ZM162.75 35.94C164.18 35.14 165.6 33.92 166.44 32.7L168.55 33.41C167.51 34.98 165.87 36.58 164.39 37.53C164.06 37.11 163.26 36.31 162.75 35.94ZM158.5 33.74C159.7 34.23 161.44 35.09 162.3 35.65L160.96 37.7C160.14 37.09 158.44 36.13 157.22 35.54L158.5 33.74ZM197.6 34.19L215.7 34.19L215.7 35.89L197.6 35.89L197.6 34.19ZM179.68 36.36L179.68 34.56L192.75 34.56C192.7 40.16 192.9 44.36 194.06 44.36C194.36 44.36 194.46 43.24 194.5 41.51C194.94 42.09 195.52 42.68 196 43.01C195.84 45.65 195.4 46.73 193.88 46.73C190.92 46.73 190.43 42.37 190.36 36.36L187.11 36.36L188.42 36.67C188.1 37.13 187.82 37.57 187.56 37.97L189.86 37.97L189.86 39.61L185.34 39.61L185.34 40.36L189.19 40.36L189.19 41.95L185.34 41.95L185.34 42.77L190.22 42.77L190.22 44.5L185.34 44.5L185.34 46.73L183 46.73L183 44.5L177.8 44.5L177.8 42.77L183 42.77L183 41.95L178.99 41.95L178.99 40.36L183 40.36L183 39.61L178.26 39.61L178.26 37.97L180.76 37.97C180.6 37.55 180.38 37.08 180.16 36.69L181.44 36.36L179.68 36.36ZM162.42 40.01C164.96 38.77 167.33 36.8 168.57 34.83L170.84 35.65C170.74 35.83 170.62 36 170.5 36.16C171.88 37.44 174.06 38.72 175.98 39.39C175.6 39.96 175.18 41.02 175.01 41.62C174.66 41.44 174.28 41.25 173.9 41.05L173.9 46.73L171.64 46.73L171.64 46.04L166.86 46.04L166.86 46.75L164.72 46.75L164.72 41.22C164.46 41.38 164.18 41.51 163.92 41.66C163.68 41.27 163.13 40.67 162.7 40.25C161.89 42.33 160.92 44.63 159.96 46.58L157.8 45.18C158.66 43.63 159.86 41.16 160.78 38.86L162.68 40.23C162.58 40.16 162.5 40.07 162.42 40.01ZM182.3 36.36C182.62 36.87 182.92 37.51 183.04 37.97L185.2 37.97C185.5 37.48 185.84 36.86 186.04 36.36L182.3 36.36ZM207.73 43.79L207.73 44.52L215.74 44.52L215.74 46.24L197.56 46.24L197.56 44.52L205.45 44.52L205.45 43.79L199.34 43.79L199.34 42.26L205.45 42.26L205.45 41.62L199.74 41.62L199.74 36.49L213.55 36.49L213.55 41.62L207.73 41.62L207.73 42.26L213.94 42.26L213.94 43.79L207.73 43.79ZM169.26 37.68C168.4 38.61 167.42 39.43 166.36 40.18L172.44 40.18C171.27 39.41 170.18 38.55 169.26 37.68ZM205.45 37.75L201.98 37.75L201.98 38.46L205.45 38.46L205.45 37.75ZM207.73 38.46L211.24 38.46L211.24 37.75L207.73 37.75L207.73 38.46ZM201.98 39.63L201.98 40.34L205.45 40.34L205.45 39.63L201.98 39.63ZM207.73 40.34L211.24 40.34L211.24 39.63L207.73 39.63L207.73 40.34ZM166.86 42.11L166.86 44.1L171.64 44.1L171.64 42.11L166.86 42.11Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <text id="svg_o2value" x="198" y="93" fill="#FFFFFF" fontSize="36" fontWeight="bold" textAnchor="middle">
            {currentO2}
          </text>
          <g opacity="0.600000">
            <line id="line" x1="63.620941" y1="52.000000" x2="0.620941" y2="145.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          </g>
        </svg>
      </div>

      <div className="salt-svg-container">
        <svg width="245.332092" height="184.000000" viewBox="0 0 245.332 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="salt-svg">
          <desc>Created with Pixso.</desc>
          <defs>
            <radialGradient gradientTransform="translate(121.332 46) rotate(0) scale(35 35)" cx="0.000000" cy="0.000000" r="1.000000" id="paint_radial_2_13_0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.298039"/>
              <stop offset="1.000000" stopColor="#4A90B8" stopOpacity="0.000000"/>
            </radialGradient>
          </defs>
          <g opacity="0.800000">
            <circle id="circle" cx="121.332085" cy="46.000000" r="45.000000" fill="#000000" fillOpacity="0"/>
            <circle id="circle" cx="121.332085" cy="46.000000" r="45.000000" stroke="#4A90B8" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          </g>
          <circle id="circle" cx="121.332085" cy="45.999969" r="35.000000" fill="url(#paint_radial_2_13_0)" fillOpacity="1.000000"/>
          <rect id="rect" x="120.959496" y="23.999969" width="31.999996" height="31.999996" transform="rotate(45 120.959496 23.999969)" fill="#000000" fillOpacity="0"/>
          <rect id="rect" x="120.959496" y="23.999969" width="31.999996" height="31.999996" transform="rotate(45 120.959496 23.999969)" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          <path id="path" d="" fill="#000000" fillOpacity="0" fillRule="nonzero"/>
          <path id="path" d="M108.95 34.62L132.95 58.62M132.95 34.62L108.95 58.62" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          <ellipse id="circle" cx="120.959526" cy="46.627411" rx="5.999999" ry="6.000001" fill="#D4A574" fillOpacity="1.000000"/>
          <ellipse id="circle" cx="120.959526" cy="46.627411" rx="5.999999" ry="6.000001" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          <path id="鹽度" d="M160.37 101L145.97 101L145.97 104.07C145.97 107.44 145.71 112.44 144.05 115.69C143.57 115.36 142.49 114.85 141.87 114.67C143.47 111.59 143.61 107.14 143.61 104.09L143.61 98.78L151.07 98.78C150.93 98.32 150.77 97.83 150.59 97.46L153.01 96.91C153.28 97.48 153.57 98.16 153.77 98.78L160.37 98.78L160.37 101ZM139.95 108.48L130.93 108.48L130.93 102.37C130.57 102.08 130.14 101.79 129.85 101.66C131.13 100.27 131.89 98.5 132.33 97.06L134.37 97.35C134.25 97.7 134.13 98.05 133.99 98.41L140.65 98.41L140.65 99.91L136.37 99.91L136.37 100.47L139.63 100.47L139.63 101.68L136.37 101.68L136.37 102.19L139.95 102.19L139.95 108.48ZM130.19 108.48L123.67 108.45L122.87 108.45L122.87 97.7L130.11 97.7L130.11 99.49L127.69 99.49L127.69 100.8L129.69 100.8L129.69 105.2L127.69 105.2L127.69 106.68L130.19 106.68L130.19 108.48ZM126.13 100.8L126.13 99.49L124.63 99.49L124.63 100.8L126.13 100.8ZM134.35 102.19L134.35 99.91L133.35 99.91C132.95 100.71 132.51 101.46 131.95 102.19L134.35 102.19ZM157.31 104.64L157.31 107.76L149.07 107.76L149.07 104.64L146.37 104.64L146.37 102.77L149.07 102.77L149.07 101.46L151.31 101.46L151.31 102.77L154.95 102.77L154.95 101.46L157.31 101.46L157.31 102.77L160.19 102.77L160.19 104.64L157.31 104.64ZM124.63 103.61L127.97 103.61L127.97 102.39L124.63 102.39L124.63 103.61ZM137.41 104.56C137.64 104.67 137.95 104.82 138.17 105L138.17 103.38L135.23 103.38C135.47 103.52 135.73 103.65 135.87 103.8L135.33 104.42C135.07 104.2 134.67 103.92 134.29 103.74L134.67 103.38L132.61 103.38L132.61 105.31L133.05 104.91C133.39 105.06 133.83 105.31 134.07 105.49L133.5 106.11C133.31 105.91 132.95 105.68 132.61 105.47L132.61 107.3L133.83 107.3C133.63 107.12 133.33 106.86 133.11 106.72C133.67 106.33 134.25 105.88 134.77 105.38C134.19 105.06 133.57 104.69 133.03 104.42L133.65 103.81C134.21 104.07 134.83 104.42 135.39 104.76C135.78 104.32 136.15 103.85 136.42 103.39L137.45 103.67C137.11 104.22 136.71 104.76 136.25 105.26C136.83 105.62 137.35 105.98 137.71 106.3L137.05 106.99C136.69 106.68 136.19 106.3 135.61 105.91C135.11 106.44 134.59 106.92 134.07 107.3L135.65 107.3C135.43 107.12 135.21 106.93 134.99 106.79L135.57 106.33C135.91 106.52 136.33 106.79 136.55 107.01L136.25 107.3L138.17 107.3L138.17 105.46L137.85 105.75C137.61 105.51 137.19 105.26 136.83 105.06L137.41 104.56ZM154.95 105.95L154.95 104.64L151.31 104.64L151.31 105.95L154.95 105.95ZM124.63 106.68L126.13 106.68L126.13 105.2L124.63 105.2L124.63 106.68ZM157.29 108.56L157.71 108.48L159.19 109.23C158.35 110.8 157.15 111.99 155.67 112.94C157.19 113.3 158.87 113.52 160.69 113.65C160.23 114.16 159.63 115.11 159.33 115.71C156.89 115.47 154.73 115.02 152.85 114.25C150.95 114.94 148.79 115.36 146.53 115.6C146.35 115.04 145.91 114.14 145.55 113.61C147.21 113.48 148.81 113.28 150.27 112.92C149.35 112.3 148.53 111.55 147.85 110.73L148.65 110.42L146.53 110.42L146.53 108.56L157.29 108.56ZM138.67 109.27L138.67 113.32L140.69 113.32L140.69 115.16L122.01 115.16L122.01 113.32L124.27 113.32L124.27 109.27L138.67 109.27ZM152.97 112.04C153.99 111.59 154.87 111.08 155.61 110.42L150.33 110.42C151.03 111.06 151.93 111.59 152.97 112.04ZM128.31 111.08L126.49 111.08L126.49 113.32L128.31 113.32L128.31 111.08ZM132.31 113.32L132.31 111.08L130.49 111.08L130.49 113.32L132.31 113.32ZM136.33 113.32L136.33 111.08L134.49 111.08L134.49 113.32L136.33 113.32Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <text id="svg_saltvalue" x="170" y="160" fill="#FFFFFF" fontSize="36" fontWeight="bold" textAnchor="middle">
            {currentSalt}‰
          </text>
          <g opacity="0.600000">
            <line id="line" x1="81.332085" y1="50.999996" x2="0.332085" y2="91.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          </g>
        </svg>
      </div>

      <div className="nh2-svg-container">
        <svg width="300" height="153.000000" viewBox="0 0 243.241 153" fill="none" xmlns="http://www.w3.org/2000/svg" className="NH2-svg">
          <desc>Created with Pixso.</desc>
          <defs>
            <radialGradient gradientTransform="translate(121.241 46) rotate(0) scale(35 35)" cx="0.000000" cy="0.000000" r="1.000000" id="paint_radial_2_23_0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.298039"/>
              <stop offset="1.000000" stopColor="#4A90B8" stopOpacity="0.000000"/>
            </radialGradient>
          </defs>
          <g opacity="0.800000">
            <circle id="circle" cx="121.240700" cy="46.000000" r="45.000000" fill="#000000" fillOpacity="0"/>
            <circle id="circle" cx="121.240700" cy="46.000000" r="45.000000" stroke="#4A90B8" strokeOpacity="1.000000" strokeWidth="2.000000"/>
          </g>
          <circle id="circle" cx="121.240700" cy="46.000000" r="35.000000" fill="url(#paint_radial_2_23_0)" fillOpacity="1.000000"/>
          <circle id="circle" cx="121.240700" cy="31.000000" r="9.000000" fill="#D4A574" fillOpacity="1.000000"/>
          <circle id="circle" cx="105.240700" cy="59.000000" r="9.000000" fill="#D4A574" fillOpacity="1.000000"/>
          <circle id="circle" cx="137.240692" cy="59.000000" r="9.000000" fill="#D4A574" fillOpacity="1.000000"/>
          <path id="N" d="M119.49 36L118.44 36L118.44 27.19L119.59 27.19L122.79 32.74L123.73 34.55L123.79 34.55C123.73 33.67 123.64 32.68 123.64 31.77L123.64 27.19L124.7 27.19L124.7 36L123.56 36L120.36 30.44L119.41 28.63L119.36 28.63C119.41 29.51 119.49 30.45 119.49 31.37L119.49 36Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <path id="H" d="M103.55 64L102.44 64L102.44 55.19L103.55 55.19L103.55 58.88L107.66 58.88L107.66 55.19L108.76 55.19L108.76 64L107.66 64L107.66 59.84L103.55 59.84L103.55 64Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <path id="H" d="M135.55 64L134.44 64L134.44 55.19L135.55 55.19L135.55 58.88L139.66 58.88L139.66 55.19L140.76 55.19L140.76 64L139.66 64L139.66 59.84L135.55 59.84L135.55 64Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <line id="line" x1="121.240700" y1="39.000000" x2="110.240700" y2="53.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.000000"/>
          <line id="line" x1="121.240700" y1="39.000000" x2="132.240692" y2="53.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.000000"/>
          <path id="氨氣" d="M126.93 100.02C126.11 101.2 125.2 102.24 124.23 103.1L138.06 103.1C137.99 109.23 138.04 113.34 138.92 113.34C139.17 113.34 139.28 112.08 139.3 110.4C139.72 110.95 140.27 111.59 140.74 111.95C140.58 114.51 140.18 115.66 138.74 115.66C135.98 115.66 135.74 111.5 135.69 104.8L130 104.8C130.1 105.11 130.22 105.47 130.29 105.84L134.96 105.84L134.96 108.52L132.95 108.52L132.95 107.5L125.12 107.5L125.12 108.52L123.26 108.52L123.26 105.84L127.94 105.84C127.9 105.6 127.84 105.33 127.77 105.13L129.48 104.8L122.7 104.8L122.7 103.1L123.08 103.1C122.66 102.68 122.12 102.21 121.75 101.95C123.5 100.8 125.12 98.9 126 96.95L128.34 97.66C128.22 97.88 128.12 98.12 127.97 98.34L139.78 98.34L139.78 100.02L126.93 100.02ZM146.44 101.48C145.78 102.35 145.1 103.18 144.36 103.85L157.32 103.85C157.26 109.29 157.46 113.32 158.61 113.32C158.92 113.32 159.01 112.21 159.03 110.51C159.5 111.1 160.07 111.7 160.56 112.04C160.4 114.6 159.94 115.69 158.44 115.69C155.45 115.69 155 111.48 154.92 105.64L144.14 105.64L144.14 104.05C143.9 104.27 143.68 104.47 143.44 104.65C143.12 104.18 142.28 103.18 141.78 102.72C143.64 101.44 145.32 99.32 146.24 97.08L148.56 97.77C148.41 98.1 148.26 98.43 148.08 98.78L159.8 98.78L159.8 100.55L147.06 100.55C146.89 100.82 146.71 101.08 146.53 101.33L158.12 101.33L158.12 103.05L146.44 103.05L146.44 101.48ZM138.81 100.71L138.81 102.37L126.44 102.37L126.44 100.71L138.81 100.71ZM150.02 110.86L150.02 112.15L151.11 111.22C152.3 111.86 153.94 112.88 154.76 113.58L153.19 114.96C152.52 114.32 151.16 113.38 150.02 112.68L150.02 115.69L147.77 115.69L147.77 112.24C146.6 113.58 145.12 114.76 143.64 115.49C143.32 114.96 142.66 114.14 142.18 113.74C143.7 113.14 145.29 112.04 146.46 110.86L142.84 110.86L142.84 109.05L145.14 109.05C144.94 108.39 144.43 107.44 143.92 106.77L145.72 106.06C146.28 106.77 146.86 107.72 147.04 108.38L145.38 109.05L147.77 109.05L147.77 106.04L150.02 106.04L150.02 109.05L151.7 109.05L150.62 108.63C151.08 107.94 151.67 106.88 152 106.13L154.1 106.77C153.44 107.59 152.77 108.43 152.26 109.05L154.65 109.05L154.65 110.86L150.02 110.86ZM135.38 109.03L135.38 110.71L133.26 110.71C132.95 111.5 132.55 112.15 132.06 112.72C133.5 113.21 134.76 113.72 135.76 114.2L134.43 115.78C133.37 115.22 131.95 114.62 130.38 114.05C128.75 114.98 126.49 115.46 123.46 115.75C123.32 115.18 122.97 114.38 122.7 113.96C124.85 113.85 126.56 113.65 127.9 113.23C126.73 112.88 125.54 112.54 124.32 112.26C124.63 111.82 124.98 111.3 125.32 110.71L122.68 110.71L122.68 109.03L126.22 109.03C126.48 108.54 126.7 108.03 126.88 107.56L128.98 107.99C128.83 108.34 128.68 108.67 128.52 109.03L135.38 109.03ZM131.09 110.71L127.66 110.71L127.33 111.3C128.26 111.53 129.17 111.77 130.05 112.06C130.47 111.7 130.82 111.24 131.09 110.71Z" fill="#FFFFFF" fillOpacity="1.000000" fillRule="evenodd"/>
          <text id="svg_nh2value" x="210" y="148" fill="#FFFFFF" fontSize="36" fontWeight="bold" textAnchor="middle">
            {currentNH2}
          </text>
          <g opacity="0.600000">
            <line id="line" x1="121.240700" y1="91.000015" x2="0.240692" y2="132.000000" stroke="#D4A574" strokeOpacity="1.000000" strokeWidth="1.500000"/>
          </g>
        </svg>
      </div>

    </div>
  );
};

export default Home;