import mqtt from 'mqtt'

class MQTTService {
  constructor() {
    this.client = null
    this.isConnected = false
    this.subscribers = new Map()
  }

  connect(brokerUrl, options = {}) {
    const defaultOptions = {
      keepalive: 60,
      clientId: 'dashboard_' + Math.random().toString(16).substring(2, 8),
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally',
        qos: 0,
        retain: false
      }
    }

    const finalOptions = { ...defaultOptions, ...options }

    return new Promise((resolve, reject) => {
      try {
        this.client = mqtt.connect(brokerUrl, finalOptions)

        this.client.on('connect', () => {
          console.log('MQTT 連線成功')
          this.isConnected = true
          resolve(this.client)
        })

        this.client.on('error', (error) => {
          console.error('MQTT 連線錯誤:', error)
          this.isConnected = false
          reject(error)
        })

        this.client.on('close', () => {
          console.log('MQTT 連線已關閉')
          this.isConnected = false
        })

        this.client.on('reconnect', () => {
          console.log('MQTT 重新連線中...')
        })

        this.client.on('offline', () => {
          console.log('MQTT 離線')
          this.isConnected = false
        })

        this.client.on('message', (topic, message) => {
          const messageStr = message.toString()
          console.log(`收到消息 - 主題: ${topic}, 內容: ${messageStr}`)
          
          if (this.subscribers.has(topic)) {
            this.subscribers.get(topic).forEach(callback => {
              try {
                callback(topic, messageStr)
              } catch (error) {
                console.error('處理訊息回調時發生錯誤:', error)
              }
            })
          }
        })

      } catch (error) {
        reject(error)
      }
    })
  }

  disconnect() {
    if (this.client && this.isConnected) {
      this.client.end()
      this.isConnected = false
      this.subscribers.clear()
      console.log('MQTT 連線已中斷')
    }
  }

  publish(topic, message, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.client || !this.isConnected) {
        reject(new Error('MQTT 客戶端未連線'))
        return
      }

      const defaultOptions = {
        qos: 0,
        retain: false
      }

      const finalOptions = { ...defaultOptions, ...options }

      this.client.publish(topic, message, finalOptions, (error) => {
        if (error) {
          console.error('發送消息失敗:', error)
          reject(error)
        } else {
          console.log(`消息已發送 - 主題: ${topic}, 內容: ${message}`)
          resolve()
        }
      })
    })
  }

  subscribe(topic, callback, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.client || !this.isConnected) {
        reject(new Error('MQTT 客戶端未連線'))
        return
      }

      const defaultOptions = {
        qos: 0
      }

      const finalOptions = { ...defaultOptions, ...options }

      this.client.subscribe(topic, finalOptions, (error) => {
        if (error) {
          console.error('訂閱主題失敗:', error)
          reject(error)
        } else {
          console.log(`已訂閱主題: ${topic}`)
          
          if (!this.subscribers.has(topic)) {
            this.subscribers.set(topic, [])
          }
          this.subscribers.get(topic).push(callback)
          
          resolve()
        }
      })
    })
  }

  unsubscribe(topic) {
    return new Promise((resolve, reject) => {
      if (!this.client || !this.isConnected) {
        reject(new Error('MQTT 客戶端未連線'))
        return
      }

      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.error('取消訂閱失敗:', error)
          reject(error)
        } else {
          console.log(`已取消訂閱主題: ${topic}`)
          this.subscribers.delete(topic)
          resolve()
        }
      })
    })
  }

  getConnectionStatus() {
    return this.isConnected
  }

  getClient() {
    return this.client
  }
}

const mqttService = new MQTTService()
export default mqttService