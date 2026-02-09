import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { ScreenOrientation } from '@capacitor/screen-orientation'

if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark })
  StatusBar.hide()
  ScreenOrientation.lock({ orientation: 'landscape' })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
