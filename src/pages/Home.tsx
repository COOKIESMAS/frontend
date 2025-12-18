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
import { useEffect, useRef, useState } from 'react'
import SideMenu from '@/components/SideMenu'
import tutorialCookieImg1 from '@/assets/image/tutorial/tutorial_img_1.png'
import tutorialCookieImg2 from '@/assets/image/tutorial/tutorial_img_2.png'
import tutorialCookieImg3 from '@/assets/image/tutorial/tutorial_img_3.png'
import tutorialCookieImg4 from '@/assets/image/tutorial/tutorial_img_4.png'
import tutorialCookieImg5 from '@/assets/image/tutorial/tutorial_img_5.png'
import tutorialCookieImg6 from '@/assets/image/tutorial/tutorial_img_6.png'
import tutorialTextImg1 from '@/assets/image/tutorial/tutorial_text_1.png'
import tutorialTextImg2 from '@/assets/image/tutorial/tutorial_text_2.png'
import tutorialTextImg3 from '@/assets/image/tutorial/tutorial_text_3.png'
import tutorialTextImg4 from '@/assets/image/tutorial/tutorial_text_4.png'
import tutorialTextImg5 from '@/assets/image/tutorial/tutorial_text_5.png'
import tutorialTextImg6 from '@/assets/image/tutorial/tutorial_text_6.png'
import TutorialOverlay from '@/components/TutorialOverlay'
import { useUser } from '@/hooks/queries/useUser'
import ActionHighlightOverlay from '@/components/ActionHighlightOverlay'
import { useEditUser } from '@/hooks/mutations/useEditUser'

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

const MakeButtonWrapper = styled.div`
  width: 100%;
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
  font-family: 'IM_Hyemin';
  line-height: 24px;
  margin: 0;
  margin-bottom: 4px;
`

const ButtonTitle2 = styled.h3`
  font-size: 20px;
  font-weight: bold;

  font-family: 'IM_Hyemin';
  line-height: 24px;
  margin: 0;
  margin-bottom: 4px;
`

const ButtonText = styled.span`
  font-size: 14px;
  line-height: 24px;
  font-family: 'Galmuri14';
  margin: 0;
`

const tutorialSteps = [
  {
    id: 's1',
    image: tutorialCookieImg1,
    textImg: tutorialTextImg1,
    textImgTranslate: { x: '-80%', y: '-60%' },
    durationMs: 3500,
  },
  {
    id: 's2',
    image: tutorialCookieImg2,
    textImg: tutorialTextImg2,
    textImgTranslate: { x: '-65%', y: '-90%' },
    durationMs: 3500,
  },
  {
    id: 's3',
    image: tutorialCookieImg3,
    textImg: tutorialTextImg3,
    textImgTranslate: { x: '-70%', y: '-90%' },
    durationMs: 3500,
  },
  {
    id: 's4',
    image: tutorialCookieImg4,
    textImg: tutorialTextImg4,
    textImgTranslate: { x: '-70%', y: '-90%' },
    durationMs: 3500,
  },
  {
    id: 's5',
    image: tutorialCookieImg5,
    textImg: tutorialTextImg5,
    textImgTranslate: { x: '-80%', y: '-90%' },
    durationMs: 3500,
  },
  {
    id: 's6',
    image: tutorialCookieImg6,
    textImg: tutorialTextImg6,
    textImgTranslate: { x: '-70%', y: '-90%' },
    durationMs: 3500,
  },
]

export default function Home() {
  const makeCookieRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const { isLoading } = useUser()
  const { mutate } = useEditUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)
  const [showActionGuide, setShowActionGuide] = useState(false)

  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (showActionGuide && makeCookieRef.current) {
      setButtonRect(makeCookieRef.current.getBoundingClientRect())
    }
  }, [showActionGuide])

  const handleNavigate = (dst: string) => {
    navigate(dst)
  }

  if (isLoading) return null

  // const shouldShowTutorial = !!user && !user.isTutorialCompleted
  const shouldShowTutorial = true

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
            <MakeButtonWrapper ref={makeCookieRef}>
              <ActionButton
                backgroundColor="#E2AE71"
                titleColor="black"
                textColor="black"
                onClick={() => handleNavigate('/cookie/step1')}
              >
                <ButtonTitle>쿠키 만들기</ButtonTitle>
                <ButtonText>친구와 강사님, 프로님에게 마음 전하기</ButtonText>
              </ActionButton>
            </MakeButtonWrapper>

            <FlexWrapper gap="8px" width="100%" align="stretch">
              <ActionButton
                backgroundColor="white"
                titleColor="black"
                textColor="#555555"
                style={{ flex: 1.5 }}
              >
                <ButtonTitle2 onClick={() => handleNavigate('/myoven')}>
                  내 오븐
                </ButtonTitle2>
                <ButtonText>받은 쿠키 구경하기</ButtonText>
              </ActionButton>

              {/* 3. Coming Soon (Frame 3374) - 제목만 있음, 비활성화 처리 */}
              <ActionButton
                backgroundColor="#cfcfcf" // 회색 배경
                textColor="black"
                disabled={true} // 비활성화
                style={{ flex: 1 }}
              >
                <ButtonText style={{ whiteSpace: 'pre-line' }}>{`comming
              soon`}</ButtonText>
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
              setShowActionGuide(true)
            }}
          />
        )}
        {showActionGuide && buttonRect && (
          <ActionHighlightOverlay
            targetRect={buttonRect}
            onClick={() => {
              setShowActionGuide(false)
              mutate(
                { isTutorialCompleted: true },
                {
                  onSuccess: () => {
                    navigate('/cookie/step1')
                  },
                  onError: () => {
                    alert('에러 발생')
                  },
                },
              )
            }}
          />
        )}

        <SideMenu open={isMenuOpen} onClose={closeMenu} />
      </PageWrapper>

      <BottomNavigation />
    </AppContainer>
  )
}
