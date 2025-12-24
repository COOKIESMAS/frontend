/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styled from 'styled-components'
import CookieImageRenderer2 from './cookie/CookieImageRenderer2'
import type { CookieItem, CookieDesignImgDataCamel } from '@/types/cookie'

interface Props {
  loading: boolean
  errorMessage: string | null
  cookie: CookieItem | null
  onClickClose: () => void
  onRetry?: () => void
}

export const DdayCookieDetailComponent: React.FC<Props> = ({
  loading,
  errorMessage,
  cookie,
  onClickClose,
  onRetry,
}) => {
  // ───────────── 로딩 ─────────────
  if (loading) {
    return (
      <PageWrapper>
        <TopDecoration src="/ddayTop.png" alt="top" />
        <BottomDecoration src="/ddayBottom.png" alt="bottom" />
        <ContentInner>
          <LoadingText>쿠키를 여는 중입니다...</LoadingText>
        </ContentInner>
      </PageWrapper>
    )
  }

  // ───────────── 에러 ─────────────
  if (errorMessage || !cookie) {
    return (
      <PageWrapper>
        <TopDecoration src="/ddayTop.png" alt="top" />
        <BottomDecoration src="/ddayBottom.png" alt="bottom" />
        <ContentInner>
          <ErrorCard>
            <ErrorTitle>쿠키를 불러오지 못했어요</ErrorTitle>
            <ErrorMessage>{errorMessage ?? '쿠키 정보를 찾을 수 없습니다.'}</ErrorMessage>
            {onRetry && (
              <RetryButton type="button" onClick={onRetry}>
                다시 시도하기
              </RetryButton>
            )}
          </ErrorCard>
        </ContentInner>
      </PageWrapper>
    )
  }

  const senderName =
    (cookie as any).sender_name ?? (cookie as any).senderName ?? ''
  const senderAffiliation =
    (cookie as any).sender_affiliation ??
    (cookie as any).senderAffiliation ??
    ''
  const content =
    (cookie as any).content ??
    '메시지 내용을 불러오는 중입니다.'

  return (
    <PageWrapper>
      

      <ContentInner>
        {/* 상·하단 장식 이미지 */}
        <TopDecoration src="/ddayTop.png" alt="top decoration" />
        <BottomDecoration src="/ddayBottom.png" alt="bottom decoration" />
        {/* 우상단 닫기 버튼 */}
        <CloseButton type="button" onClick={onClickClose} aria-label="닫기">
          ×
        </CloseButton>

        {/* D-Day 로고 */}
        <LogoWrapper>
          <Logo src="/d_day_logo.svg" alt="쿠키스마스 D-day" />
        </LogoWrapper>

        {/* From 배지 */}
        <FromBadge>
          <FromLabel>From.</FromLabel>
          <FromText>
            {senderAffiliation ? `${senderAffiliation} ` : ''}
            {senderName}
          </FromText>
        </FromBadge>

        {/* 메시지 말풍선 (CSS로 구현) */}
        <MessageBubble>
          <MessageText>{content}</MessageText>
        </MessageBubble>

        {/* 쿠키 이미지 영역 */}
        <CookieArea>
          <CookieBox>
            <CookieImageRenderer2
              designData={
                cookie.design_data as unknown as CookieDesignImgDataCamel
              }
              isPen={false}
              isRound
            />
          </CookieBox>
        </CookieArea>
      </ContentInner>
    </PageWrapper>
  )
}

/* ───────────── styled-components ───────────── */

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #efefef; /* 변경: 전체 배경색 */
  color: #000000;
  overflow: hidden;
`

const TopDecoration = styled.img`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  max-width: 480px;
  z-index: 0;
  pointer-events: none;
`

const BottomDecoration = styled.img`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  max-width: 480px;
  z-index: 0;
  pointer-events: none;
`

const ContentInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  padding: 80px 20px 120px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  background-color: #c08b55;
  flex-direction: column;
  align-items: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 20px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.45);
  color: #ffffff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
`

const Logo = styled.img`
  height: auto;
  width: 80%;
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
`

const FromBadge = styled.div`
  width: 100%;
  border-radius: 18px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  padding: 10px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 20px;
`

const FromLabel = styled.span`
  font-family: 'DNFBitBitv2', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 25px;
  font-weight: 400;
  color: #9d6a37;
`

const FromText = styled.span`
  font-family: 'DNFBitBitv2', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 25px;
  font-weight: 400;
  color: #000000;
`

/**
 * 메시지 말풍선 (outline.9.png → CSS 형태 말풍선)
 */
const MessageBubble = styled.div`
  position: relative;
  width: 100%;
  min-height: 180px;
  max-height: 260px;
  padding: 26px 22px 30px;
  margin-bottom: 24px;
  box-sizing: border-box;

  background-color: #ffffff;
  border-radius: 24px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18); /* 말풍선 그림자 */

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  &::after {
    /* 말풍선 꼬리 */
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 22px;
    height: 22px;
    background-color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
    transform-origin: center;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  }
`

const MessageText = styled.p`
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #000000;
`

const CookieArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

/**
 * 쿠키 렌더링 영역 + 그림자
 */
const CookieBox = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 999px;
  overflow: hidden;
`

const LoadingText = styled.div`
  margin-top: 120px;
  text-align: center;
  font-size: 15px;
  color: #555555;
`

const ErrorCard = styled.div`
  margin-top: 120px;
  width: 100%;
  padding: 24px 18px;
  border-radius: 18px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  text-align: center;
`

const ErrorTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`

const ErrorMessage = styled.p`
  font-size: 13px;
  line-height: 1.4;
`

const RetryButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  background-color: #f1b56a;
  color: #5b3a00;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`
