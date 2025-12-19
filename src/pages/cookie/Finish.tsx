import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import celebrate from '@/assets/image/celebrate.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const FlexWrapper = styled.div<{
  direction?: 'row' | 'column'
  justify?: string
  align?: string
  gap?: string
  wrap?: string
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'start'};
  gap: ${(props) => props.gap || '0'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`

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
  background-color: #e8c696;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 48px 24px;
`

const MainWrapper = styled(FlexWrapper)``

const CelebrateImg = styled.img`
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-family: 'Pretendard';
  font-size: 28px;
  margin: 0;
  margin-bottom: 10px;
`

const Text = styled.p`
  font-family: 'IM_Hyemin';
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  white-space: pre-line;
  line-height: 26px;
`

const BottomButtonWrapper = styled(FlexWrapper)``

const StyledButton = styled.button<{
  backgroundColor?: 'primary' | 'secondary'
}>`
  position: relative;
  width: 100%;
  padding: 16px;
  border-radius: 40px;
  border: 1px solid black;
  font-size: 16px;
  font-family: 'IM_Hyemin';
  font-weight: 700;
  background: ${(props) =>
    props.backgroundColor == 'primary' ? '#e2ae71' : '#ffffff'};
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`
const IconWrapper = styled.span`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
`

/* ===== tooltip 관련 스타일 (Label을 hover 또는 focus-within 했을 때 프로필 카드 노출) ===== */

function Finish() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url)
  }

  return (
    <AppContainer>
      <PageWrapper>
        <div></div>
        <MainWrapper direction="column" align="center" justify="center">
          <CelebrateImg src={celebrate} />
          <Title>쿠키 배달 완료!</Title>
          <Text>{`${location.state.name ?? '김싸피'} 님의 오븐에서 
          따뜻하게 구워지고 있어요`}</Text>
        </MainWrapper>
        <BottomButtonWrapper direction="column" gap="16px">
          <StyledButton
            onClick={() => handleNavigate('/cookie/step1')}
            backgroundColor="primary"
          >
            다른 쿠키 더 굽기
            <IconWrapper>
              <FontAwesomeIcon icon={faArrowRight} />
            </IconWrapper>
          </StyledButton>
          <StyledButton
            onClick={() => handleNavigate('/home')}
            backgroundColor="secondary"
          >
            홈으로 가기
            <IconWrapper>
              <FontAwesomeIcon icon={faArrowRight} />
            </IconWrapper>
          </StyledButton>
        </BottomButtonWrapper>
      </PageWrapper>
    </AppContainer>
  )
}

export default Finish
