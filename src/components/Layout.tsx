// src/components/Layout.tsx
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import BottomNavigation from '@/components/BottomNavigation'

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`

const PageWrapper = styled.main`
  position: relative;
  max-width: 375px;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export default function Layout() {
  return (
    <AppContainer>
      <PageWrapper>
        {/* Outlet이 자식 라우트를 렌더링합니다 */}
        <Outlet />
        {/* 공통 컴포넌트 (원하면 Layout 바깥으로 옮겨도 됨) */}
        <BottomNavigation />
      </PageWrapper>
    </AppContainer>
  )
}
