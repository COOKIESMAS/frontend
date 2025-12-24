import styled from 'styled-components'
import HomeImage from '@/assets/image/home.png'
import BottomNavigation from '@/components/BottomNavigation'
import ActionButton from '@/components/ActionButton'
import { useNavigate } from 'react-router-dom'
import Text1 from '@/assets/image/text_1.svg'
import mainLogo0 from '@/assets/image/main_logo_d_0.svg'
// import mainLogo1 from '@/assets/image/main_logo_d_1.svg'
// import mainLogo2 from '@/assets/image/main_logo_d_2.svg'
// import mainLogo3 from '@/assets/image/main_logo_d_3.svg'
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
import { useApi } from '@/utils/useApi'
import CookieImageRenderer2 from '@/components/cookie/CookieImageRenderer2'
import type { CookieDesignImgDataCamel } from '@/types/cookie'
// import { getDDay } from '@/utils/getDDay'

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

const CookieImageRendererWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
`
const OvenButtonWrapper = styled.div`
  position: relative;
  flex: 1.5;
`

const UnreadBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ff4d4f;
  color: #ffffff;
  font-size: 11px;
  font-family:
    'DNFBitBitv2',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;

  box-shadow: 0 0 0 2px #ffffff; /* 버튼과 구분되게 흰색 테두리 느낌 */
`

const PageWrapper = styled.main`
  position: relative;
  max-width: 375px;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  margin-bottom: 80px;
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

const HomeTitle = styled.img`
  margin-top: 50px;
`

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
  left: 0;
  transform: translate(0, -80%);
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

// const MAIN_LOGO_BY_DDAY: Record<number, string> = {
//   0: mainLogo0, // D-day
//   1: mainLogo1, // D-1
//   2: mainLogo2, // D-2
//   3: mainLogo3, // D-3
// }

export default function Home() {
  const makeCookieRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  const { isLoading } = useUser()
  const { mutate } = useEditUser()
  const { data: user } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)
  const [showActionGuide, setShowActionGuide] = useState(false)
  const [unreadCount, setUnreadCount] = useState<number>(0)

  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (showActionGuide && makeCookieRef.current) {
      setButtonRect(makeCookieRef.current.getBoundingClientRect())
    }
  }, [showActionGuide])

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await useApi.get<{ count: number }>('/cookies/unread-count')
        setUnreadCount(res.data?.count ?? 0)
      } catch {
        setUnreadCount(0)
      }
    }

    void fetchUnreadCount()
  }, [])

  const handleNavigate = (dst: string) => {
    navigate(dst)
  }

  // const TARGET_DATE = new Date('2025-12-25') // 🎄 예시

  // const dDay = getDDay(TARGET_DATE)

  // 0~3 범위로 clamp
  // const displayDDay = Math.max(0, Math.min(3, dDay))

  // const logoSrc = MAIN_LOGO_BY_DDAY[displayDDay]

  if (isLoading) return null

  const shouldShowTutorial = !!user && !user.isTutorialCompleted
  // const shouldShowTutorial = true

  return (
    // <AppContainer>
    //   <PageWrapper>

    //   </PageWrapper>
    // </AppContainer>
    <PageWrapper>
      <ImageRenderer>
        <HomeTitle src={mainLogo0} />
      </ImageRenderer>
      <MenuButton onClick={openMenu}>
        <MenuIcon icon={faBars} />
      </MenuButton>

      <FlexWrapper
        direction="column"
        width="100%"
        height="100%"
        justify="flex-end"
        align="center"
      >
        <CookieImageRendererWrapper>
          <TextBoxImage src={Text1} />
          <CookieImageRenderer2
            designData={user?.designData as CookieDesignImgDataCamel}
            isPen={false}
          />
        </CookieImageRendererWrapper>
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
            <OvenButtonWrapper>
              <ActionButton
                backgroundColor="white"
                titleColor="black"
                textColor="#555555"
                style={{ width: '100%' }}
                onClick={() => handleNavigate('/myoven')}
              >
                <ButtonTitle2>내 오븐</ButtonTitle2>
                <ButtonText>받은 쿠키 구경하기</ButtonText>
              </ActionButton>

              {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
            </OvenButtonWrapper>

            {/* 3. Coming Soon (Frame 3374) - 제목만 있음, 비활성화 처리 */}
            <ActionButton
              backgroundColor="#ffffff"
              textColor="#000000"
              style={{
                flex: 1,
                borderWidth: '8px',
                borderStyle: 'solid',
                borderImage: 'repeating-linear-gradient(45deg, #e0e0e0 0px, #e8e8e8 16px, #00a84f 16px, #00a84f 32px, #ff2b2b 32px, #ff2b2b 48px) 1',
                borderRadius: '16px', // 외곽선만 둥글게 설정
                padding: '10px', // 내용이 경계선에 가까워지지 않도록 여백을 설정
              }}
            >
              <ButtonText style={{ whiteSpace: 'pre-line', fontWeight: 'bold' }}
                  onClick={() => handleNavigate('/d-day')}
              >{`쿠키 보러가기`}</ButtonText>
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
      <BottomNavigation />
    </PageWrapper>
  )
}
