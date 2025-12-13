import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider as JotaiProvider } from 'jotai'
import ReactQueryProvider from './lib/ReactQueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </JotaiProvider>
  </React.StrictMode>,
)
