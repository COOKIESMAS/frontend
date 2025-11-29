import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider as JotaiProvider } from 'jotai'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </JotaiProvider>
  </React.StrictMode>,
)
