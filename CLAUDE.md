# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based smart sea urchin aquaculture monitoring dashboard system that integrates with MQTT for real-time data collection and control. The application displays sensor data (temperature, pH, salinity, oxygen, ammonia) and provides monitoring capabilities for aquaculture operations.

## Development Commands

- `npm start` - Start development server on http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production
- No linting or type checking scripts are configured

## Architecture & Structure

### Core Architecture
- **Entry Point**: `src/App.js` renders the main `Dashboard` component
- **Main Dashboard**: `src/Dashboard.js` - Central component managing navigation, MQTT connection, and view routing
- **MQTT Integration**: Custom service layer with `mqttService.js` and `useMQTT.js` React hook
- **Component-based UI**: Each major feature is a separate React component

### Key Components
- `Dashboard.js` - Main application shell with MQTT controls and navigation
- `Home.js` - Primary monitoring interface with sensor data visualization
- `FrequencyChart.js` - Power analysis charts using Recharts
- `EQStatus.js` - Equipment status monitoring
- `MonitoringSettings.js` - System configuration
- `MQTTSettings.js` - MQTT broker configuration modal
- `MQTTConsole.js` - Real-time message debugging

### MQTT System
- **Service Layer**: `mqttService.js` - Singleton service for MQTT operations
- **React Hook**: `useMQTT.js` - Hook providing connection management and real-time data
- **Topics Configuration**: Structured topic naming for different sensor types
- **Default Broker**: `ws://localhost:8083/mqtt` (WebSocket MQTT)

### Data Flow
1. MQTT broker receives sensor data from external devices
2. `useMQTT` hook subscribes to relevant topics
3. Components receive real-time updates through React state
4. UI displays current sensor values and historical data
5. Control commands can be published back to devices

### Styling
- CSS modules for component-specific styles
- Custom CSS for dashboard layout and responsive design
- Background images and SVG icons for sensor visualization
- No CSS framework - custom styling throughout

### State Management
- React useState for local component state
- LocalStorage for persisting MQTT settings
- MQTT service maintains connection state globally
- No external state management library (Redux, Context, etc.)

## MQTT Topics Structure

Default topics follow the pattern:
- `sea_urchin/sensors/data` - All sensor data combined
- `sea_urchin/sensors/{type}` - Individual sensor types (temperature, ph, salinity, oxygen, ammonia)
- `sea_urchin/control` - Device control commands
- `sea_urchin/status` - System status updates
- `sea_urchin/alarms` - Alert notifications

## Testing & Development

- Testing setup uses Create React App's default Jest configuration
- Test files follow `*.test.js` naming convention
- No additional testing libraries beyond React Testing Library
- Component testing focuses on user interactions and MQTT integration

## Dependencies

Key libraries:
- `mqtt` - MQTT client for browser WebSocket connections
- `recharts` - Chart library for data visualization
- `react-icons` - Icon components (primarily Bootstrap icons)
- `lucide-react` - Additional icon set
- Tailwind CSS is listed in devDependencies but may not be fully configured