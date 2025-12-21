import React from 'react'
import { useLocation } from 'react-router-dom'

const CookieMessageDetailPage: React.FC = () => {
  const location = useLocation() as {
    state?: { cookiePk?: number }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}
    >
      <div>
        <h1>쿠키 상세 페이지 (2번 페이지 예정)</h1>
        <p>넘어온 cookiePk: {location.state?.cookiePk ?? '없음'}</p>
      </div>
    </div>
  )
}

export default CookieMessageDetailPage
