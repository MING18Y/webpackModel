console.log('hello from index.js')

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

const init = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

init()