import App from './app'
import ReactDOM from 'react-dom'
import React from 'react'

export { App }

// if (process.env.NODE_ENV === 'development') {
ReactDOM.render(<App />, document.getElementById('app-container'))
// }
