import styled from 'styled-components'
import HomeImage from '@/assets/image/home.png'
import BottomNavigation from '@/components/BottomNavigation'
import ActionButton from '@/components/ActionButton'
import { useNavigate } from 'react-router-dom'
import HomeCookie from '@/assets/image/home_cookie.svg'
import Text1 from '@/assets/image/text_1.svg'
import HomeTitleImg from '@/assets/image/home_title.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import SideMenu from '@/components/SideMenu'
import tutorialCookieImg1 from '@/assets/image/tutorial/tutorial_img_1.png'
import tutorialCookieImg2 from '@/assets/image/tutorial/tutorial_img_2.png'
import tutorialCookieImg3 from '@/assets/image/tutorial/tutorial_img_3.png'
import tutorialCookieImg4 from '@/assets/image/tutorial/tutorial_img_4.png'
import TutorialOverlay from '@/components/TutorialOverlay'
import { useUser } from '@/hooks/queries/useUser'

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
  padding-top: 20px;
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background-image: url('${HomeImage}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const ImageRenderer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HomeTitle = styled.img``

const MenuButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-50%, 100%);
  background: none;
  border: none;
  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }
`

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
`

const TextBoxImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-15%, -60%);
`

const ButtonTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  // font will IM_Hyemin
  line-height: 24px;
  margin: 0;
  margin-bottom: 4px;
`

const ButtonText = styled.span`
  font-size: 14px;
  line-height: 24px;
  // font will Galmuri14
  margin: 0;
`

const tutorialSteps = [
  {
    id: 's1',
    image: tutorialCookieImg1,
    bubbleImage: '',
    text: `매일 밤 늦게까지 함께 코딩하던 친구들,\n묵묵히 도와주시던 프로님...`,
    durationMs: 3500,
  },
  {
    id: 's2',
    image: tutorialCookieImg2,
    bubbleImage: 'bubbleImg',
    text: `고마운 마음은 가득한데,\n쑥스러워서 전하지 못한 말이 있지 않나요?`,
    durationMs: 3500,
  },
  {
    id: 's3',
    image: tutorialCookieImg3,
    bubbleImage: 'bubbleImg',
    text: `서로의 오븐을 따뜻하게 데워볼까요?`,
    durationMs: 4500,
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { data: user, isLoading } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  const handleNavigate = (dst: string) => {
    navigate(dst)
  }

  if (isLoading) return null

  const shouldShowTutorial = !!user && !user.isTutorialCompleted

  return (
    <AppContainer>
      <PageWrapper>
        <ImageRenderer>
          <HomeTitle src={HomeTitleImg} />
        </ImageRenderer>
        <MenuButton onClick={openMenu}>
          <MenuIcon icon={faBars} />
        </MenuButton>

        <FlexWrapper
          direction="column"
          width="100%"
          height="100%"
          justify="flex-end"
          style={{ marginBottom: '80px' }}
        >
          <ImageRenderer>
            <TextBoxImage src={Text1} />
            <img src={HomeCookie} />
          </ImageRenderer>
          <FlexWrapper
            direction="column"
            gap="18px"
            width="100%"
            style={{ padding: '24px' }}
          >
            <ActionButton
              backgroundColor="#E2AE71"
              titleColor="black"
              textColor="black"
              onClick={() => handleNavigate('/cookie/step1')}
            >
              <ButtonTitle>쿠키 만들기</ButtonTitle>
              <ButtonText>친구와 강사님, 프로님에게 마음 전하기</ButtonText>
            </ActionButton>
            <FlexWrapper gap="8px" width="100%" align="stretch">
              <ActionButton
                backgroundColor="white"
                titleColor="black"
                textColor="#555555"
              >
                <ButtonTitle onClick={()=> handleNavigate('/myoven')}>내 오븐</ButtonTitle>
                <ButtonText>받은 쿠키 구경하기</ButtonText>
              </ActionButton>

              {/* 3. Coming Soon (Frame 3374) - 제목만 있음, 비활성화 처리 */}
              <ActionButton
                backgroundColor="#cfcfcf" // 회색 배경
                textColor="black"
                disabled={true} // 비활성화
              >
                <span style={{ whiteSpace: 'pre-line' }}>{`comming
              soon`}</span>
              </ActionButton>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
        {shouldShowTutorial && (
          <TutorialOverlay
            steps={tutorialSteps}
            open={shouldShowTutorial}
            enableAutoAdvance={false}
            autoAdvanceMs={0}
            onFinish={() => {
              console.log('tutorial finished')
            }}
          />
        )}

        <SideMenu open={isMenuOpen} onClose={closeMenu} />
      </PageWrapper>

      <BottomNavigation />
    </AppContainer>
  )
}
