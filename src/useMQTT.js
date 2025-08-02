import { useState, useEffect, useCallback, useRef } from 'react'
import mqttService from './mqttService'

export const useMQTT = (brokerUrl, options = {}) => {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState(null)
  const [messages, setMessages] = useState([])
  const subscriptionsRef = useRef(new Set())

  const connect = useCallback(async () => {
    try {
      setConnectionError(null)
      await mqttService.connect(brokerUrl, options)
      setIsConnected(true)
    } catch (error) {
      setConnectionError(error.message)
      setIsConnected(false)
    }
  }, [brokerUrl, options])

  const disconnect = useCallback(() => {
    mqttService.disconnect()
    setIsConnected(false)
    subscriptionsRef.current.clear()
  }, [])

  const publish = useCallback(async (topic, message, publishOptions = {}) => {
    try {
      await mqttService.publish(topic, message, publishOptions)
      return true
    } catch (error) {
      console.error('發送消息失敗:', error)
      return false
    }
  }, [])

  const subscribe = useCallback(async (topic, callback, subscribeOptions = {}) => {
    try {
      const messageHandler = (receivedTopic, message) => {
        const messageData = {
          topic: receivedTopic,
          message,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev.slice(-99), messageData])
        
        if (callback) {
          callback(receivedTopic, message)
        }
      }

      await mqttService.subscribe(topic, messageHandler, subscribeOptions)
      subscriptionsRef.current.add(topic)
      return true
    } catch (error) {
      console.error('訂閱失敗:', error)
      return false
    }
  }, [])

  const unsubscribe = useCallback(async (topic) => {
    try {
      await mqttService.unsubscribe(topic)
      subscriptionsRef.current.delete(topic)
      return true
    } catch (error) {
      console.error('取消訂閱失敗:', error)
      return false
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  useEffect(() => {
    const checkConnection = () => {
      const connected = mqttService.getConnectionStatus()
      setIsConnected(connected)
    }

    const interval = setInterval(checkConnection, 1000)

    return () => {
      clearInterval(interval)
      if (subscriptionsRef.current.size > 0) {
        disconnect()
      }
    }
  }, [disconnect])

  return {
    isConnected,
    connectionError,
    messages,
    connect,
    disconnect,
    publish,
    subscribe,
    unsubscribe,
    clearMessages
  }
}