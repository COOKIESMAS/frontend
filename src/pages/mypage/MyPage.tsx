import { useCallback } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import IconPencil from '@/assets/icon/icon_pencil.svg'
import IconIdcard from '@/assets/icon/icon_idcard.svg'
import { useUser } from '@/hooks/queries/useUser'
import { useEditUser } from '@/hooks/mutations/useEditUser'
import CookieImageRenderer2 from '@/components/cookie/CookieImageRenderer2'

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

const RowDivider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 12px 0;
`

const ColDivider = styled.hr`
  border: none;
  border-left: 1px solid #d1d1d1;
  height: 100%;
  margin: 0px 4px;
`

const ProfileBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ProfileTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const AvatarWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 999px;
  background-color: #717171;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

const InfoRow = styled.div`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 24px;
  color: #181725;
`

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #181725;
`

const EmailSpan = styled.span`
  font-family: 'Pretendard';
  font-weight: 200;
  font-size: 16px;
  color: #181725;
`

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
  font-family: 'Pretendard';
  font-size: 18px;
  color: #181725;
  font-weight: 500;
`

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

const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  background-color: #f2f3f2;
  border-radius: 30px;
  justify-content: space-around;
  align-items: center;
`

const StatCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const StatLabel = styled.div`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 18px;
  color: #181725;
`

const StatValue = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  font-size: 16px;
  color: #111;
`

const Spacer = styled.div`
  flex: 1;
`

const ThumbEditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background-color: #f2f3f2;
  border: none;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 17px;
  padding: 16px 32px;
  border-radius: 30px;
  cursor: pointer;
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
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);

  svg {
    position: absolute;
    left: 16px;
    font-size: 18px;
  }
`

export default function MyPage() {
  const navigate = useNavigate()

  const { data } = useUser()
  const { mutate, isPending } = useEditUser()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken')
    navigate('/landing', { replace: true })
  }, [navigate])

  if (!data) return null

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
          <AvatarWrapper>
            <CookieImageRenderer2
              designData={data?.designData}
              isPen={false}
              isRound={true}
            />
          </AvatarWrapper>

          <ProfileInfo>
            <InfoRow>
              {data?.campus} {data?.classNumber} 반 {data?.name}
            </InfoRow>
            <EmailRow>
              <EmailSpan>{data?.googleEmail}</EmailSpan>
              <FontAwesomeIcon
                icon={faGoogle}
                style={{ color: '#DB4437', fontSize: 16 }}
              />
            </EmailRow>
          </ProfileInfo>
          <ThumbEditButton onClick={() => navigate('/mypage/edit/cookie')}>
            <img src={IconPencil} />
            대표 쿠키 수정
          </ThumbEditButton>
        </ProfileTop>

        <RowDivider />

        <SettingRow>
          <SettingLeft>
            <img src={IconIdcard} />
            <div>
              <SettingLabel>오븐 공개 설정</SettingLabel>
            </div>
          </SettingLeft>
          <SwitchTrack
            on={!!data?.isOvenOpen}
            disabled={isPending}
            aria-disabled={isPending}
            onClick={() => mutate({ isOvenOpen: !data?.isOvenOpen })}
          >
            <SwitchKnob on={!!data?.isOvenOpen} />
          </SwitchTrack>
        </SettingRow>
      </ProfileBox>

      <StatsRow>
        <StatCol>
          <StatLabel>받은 쿠키</StatLabel>
          <StatValue>{data?.receivedCookiesCount}개</StatValue>
        </StatCol>
        <ColDivider />
        <StatCol>
          <StatLabel>보낸 쿠키</StatLabel>
          <StatValue>{data?.sentCookiesCount}개</StatValue>
        </StatCol>
        <ColDivider />
        <StatCol>
          <StatLabel>쿠키 온도</StatLabel>
          <StatValue>
            {data?.receivedCookiesCount + data?.sentCookiesCount}°C
          </StatValue>
        </StatCol>
      </StatsRow>

      <Spacer />

      <LogoutBtn onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        로그아웃 하기
      </LogoutBtn>
    </Container>
  )
}
