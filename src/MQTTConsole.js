import React, { useState, useEffect } from 'react'
import { useMQTT } from './useMQTT'
import './MQTTConsole.css'

const MQTTConsole = () => {
  const [brokerUrl, setBrokerUrl] = useState('ws://localhost:8083/mqtt')
  const [publishTopic, setPublishTopic] = useState('sea_urchin/sensors')
  const [publishMessage, setPublishMessage] = useState('')
  const [subscribeTopic, setSubscribeTopic] = useState('sea_urchin/sensors/+')
  const [subscriptions, setSubscriptions] = useState([])

  const {
    isConnected,
    connectionError,
    messages,
    connect,
    disconnect,
    publish,
    subscribe,
    unsubscribe,
    clearMessages
  } = useMQTT(brokerUrl)

  const handleConnect = async () => {
    await connect()
  }

  const handleDisconnect = () => {
    disconnect()
    setSubscriptions([])
  }

  const handlePublish = async () => {
    if (!publishTopic || !publishMessage) {
      alert('請輸入主題和消息內容')
      return
    }

    const success = await publish(publishTopic, publishMessage)
    if (success) {
      setPublishMessage('')
    }
  }

  const handleSubscribe = async () => {
    if (!subscribeTopic) {
      alert('請輸入要訂閱的主題')
      return
    }

    if (subscriptions.includes(subscribeTopic)) {
      alert('已經訂閱此主題')
      return
    }

    const success = await subscribe(subscribeTopic, (topic, message) => {
      console.log(`收到消息: ${topic} - ${message}`)
    })

    if (success) {
      setSubscriptions(prev => [...prev, subscribeTopic])
      setSubscribeTopic('')
    }
  }

  const handleUnsubscribe = async (topic) => {
    const success = await unsubscribe(topic)
    if (success) {
      setSubscriptions(prev => prev.filter(t => t !== topic))
    }
  }

  const sendSensorData = async () => {
    const sensorData = {
      timestamp: new Date().toISOString(),
      temperature: (20 + Math.random() * 10).toFixed(2),
      ph: (7.5 + Math.random() * 1).toFixed(2),
      salinity: (30 + Math.random() * 5).toFixed(2),
      oxygen: (6 + Math.random() * 2).toFixed(2),
      ammonia: (Math.random() * 0.5).toFixed(3)
    }

    await publish('sea_urchin/sensors/data', JSON.stringify(sensorData))
  }

  return (
    <div className="mqtt-console">
      <h2>MQTT 控制台</h2>
      
      <div className="connection-section">
        <h3>連線設定</h3>
        <div className="input-group">
          <label>Broker URL:</label>
          <input
            type="text"
            value={brokerUrl}
            onChange={(e) => setBrokerUrl(e.target.value)}
            disabled={isConnected}
            placeholder="ws://localhost:8083/mqtt"
          />
        </div>
        
        <div className="connection-controls">
          {!isConnected ? (
            <button onClick={handleConnect} className="connect-btn">
              連線
            </button>
          ) : (
            <button onClick={handleDisconnect} className="disconnect-btn">
              中斷連線
            </button>
          )}
          <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '已連線' : '未連線'}
          </span>
        </div>
        
        {connectionError && (
          <div className="error">連線錯誤: {connectionError}</div>
        )}
      </div>

      {isConnected && (
        <>
          <div className="publish-section">
            <h3>發送消息</h3>
            <div className="input-group">
              <label>主題:</label>
              <input
                type="text"
                value={publishTopic}
                onChange={(e) => setPublishTopic(e.target.value)}
                placeholder="sea_urchin/sensors"
              />
            </div>
            <div className="input-group">
              <label>消息內容:</label>
              <textarea
                value={publishMessage}
                onChange={(e) => setPublishMessage(e.target.value)}
                placeholder="輸入要發送的消息..."
                rows={3}
              />
            </div>
            <div className="button-group">
              <button onClick={handlePublish} className="publish-btn">
                發送消息
              </button>
              <button onClick={sendSensorData} className="sensor-btn">
                發送感測器數據
              </button>
            </div>
          </div>

          <div className="subscribe-section">
            <h3>訂閱主題</h3>
            <div className="input-group">
              <label>主題:</label>
              <input
                type="text"
                value={subscribeTopic}
                onChange={(e) => setSubscribeTopic(e.target.value)}
                placeholder="sea_urchin/sensors/+"
              />
              <button onClick={handleSubscribe} className="subscribe-btn">
                訂閱
              </button>
            </div>

            {subscriptions.length > 0 && (
              <div className="active-subscriptions">
                <h4>已訂閱的主題:</h4>
                {subscriptions.map((topic, index) => (
                  <div key={index} className="subscription-item">
                    <span>{topic}</span>
                    <button
                      onClick={() => handleUnsubscribe(topic)}
                      className="unsubscribe-btn"
                    >
                      取消訂閱
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="messages-section">
            <div className="messages-header">
              <h3>接收的消息</h3>
              <button onClick={clearMessages} className="clear-btn">
                清除消息
              </button>
            </div>
            <div className="messages-list">
              {messages.length === 0 ? (
                <div className="no-messages">尚未收到任何消息</div>
              ) : (
                messages.slice(-10).reverse().map((msg, index) => (
                  <div key={index} className="message-item">
                    <div className="message-header">
                      <span className="topic">{msg.topic}</span>
                      <span className="timestamp">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="message-content">{msg.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MQTTConsole