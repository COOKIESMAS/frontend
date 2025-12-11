import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faIdCard,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

/* ------------------ 스타일 ------------------ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  gap: 18px;
  background-color: white;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6px 0;
`

const BackBtn = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  font-size: 20px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 4px 0;
`

/* Profile */
const ProfileBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ProfileTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const AvatarPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(180deg, #f6f6f6, #eaeaea);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b5a59b;
  font-weight: 700;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const CampusText = styled.div`
  font-size: 12px;
  color: #666;
`

const NameText = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #111;
  line-height: 1;
`

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
`

/* Settings item */
const SettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: transparent;
`

const SettingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`

const SettingLabel = styled.div`
  font-size: 16px;
  color: #222;
  font-weight: 600;
`

/* Toggle switch */
const SwitchTrack = styled.button<{ on: boolean }>`
  width: 52px;
  height: 28px;
  border-radius: 999px;
  border: none;
  padding: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: ${({ on }) => (on ? 'flex-end' : 'flex-start')};
  background: ${({ on }) => (on ? '#e6f8ee' : '#f1f1f1')};
  box-shadow: ${({ on }) =>
    on ? 'inset 0 0 0 2px rgba(105,200,115,0.08)' : 'none'};
  cursor: pointer;
`

const SwitchKnob = styled.span<{ on: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ on }) => (on ? '#16a34a' : '#fff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
`

/* Stats */
const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 4px;
  background: transparent;
  justify-content: space-around;
  align-items: center;
`

const StatCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #111;
  margin-top: 6px;
`

/* footer logout */
const Spacer = styled.div`
  flex: 1;
`

const LogoutBtn = styled.button`
  position: relative;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #f2f3f2;
  color: #525644;
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center; /* 텍스트 정확히 중앙 */

  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  svg {
    position: absolute;
    left: 16px; /* 좌측 여백 */
    font-size: 18px;
  }
`

/* small icon */
const SmallIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
`

/* ------------------ 컴포넌트 ------------------ */

export default function MyPage() {
  const navigate = useNavigate()

  // 임시 데이터 — 실제앱은 API / jotai 등에서 가져오기
  const [isPublic, setIsPublic] = useState(true)
  const user = {
    campus: '구미 6반',
    name: '김싸피',
    email: 'ssafykim@gmail.com',
    baked: 5,
    received: 8,
  }

  return (
    <Container>
      <Header>
        <BackBtn aria-label="뒤로" onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackBtn>
        <Title>마이페이지</Title>
      </Header>

      <ProfileBox>
        <ProfileTop>
          <AvatarPlaceholder aria-hidden>KS</AvatarPlaceholder>

          <ProfileInfo>
            <CampusText>{user.campus}</CampusText>
            <NameText>{user.name}</NameText>
            <EmailRow>
              <FontAwesomeIcon
                icon={faGoogle}
                style={{ color: '#DB4437', fontSize: 16 }}
              />
              <span>{user.email}</span>
            </EmailRow>
          </ProfileInfo>
        </ProfileTop>

        <Divider />

        <SettingRow>
          <SettingLeft>
            <SmallIcon icon={faIdCard} />
            <div>
              <SettingLabel>오븐 공개 설정</SettingLabel>
              <div style={{ fontSize: 13, color: '#777' }}>
                오븐(프로필)을 공개하시겠어요?
              </div>
            </div>
          </SettingLeft>

          <SwitchTrack
            on={isPublic}
            aria-pressed={isPublic}
            aria-label="오븐 공개 설정"
            onClick={() => setIsPublic((v) => !v)}
          >
            <SwitchKnob on={isPublic} />
          </SwitchTrack>
        </SettingRow>
      </ProfileBox>

      <Divider />

      <StatsRow>
        <StatCol>
          <StatLabel>구운 쿠키</StatLabel>
          <StatValue>{user.baked}</StatValue>
        </StatCol>

        <StatCol>
          <StatLabel>받은 쿠키</StatLabel>
          <StatValue>{user.received}</StatValue>
        </StatCol>
      </StatsRow>

      <Spacer />

      <LogoutBtn
        onClick={() =>
          alert('로그아웃 처리(여기서 API 호출/상태 초기화 등 하세요)')
        }
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        로그아웃 하기
      </LogoutBtn>
    </Container>
  )
}
