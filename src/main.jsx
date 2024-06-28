import React from 'react'
import ReactDOM from 'react-dom/client'
import Body from './Body.jsx'
import Header from './Header.jsx'
import Keyboard from './Keyboard.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Body />
    <Keyboard />
  </React.StrictMode>,
)
