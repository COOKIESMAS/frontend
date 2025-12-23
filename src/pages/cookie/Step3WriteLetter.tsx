import {
  faArrowRight,
  faChevronLeft,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { dialogAtom } from '@/store/dialog'
import { selectedItemsAtom } from '@/store/atoms/cookieAtoms'
import { receiverAtom } from '@/store/atoms/receiverAtoms'
import { letterAtom } from '@/store/atoms/letterAtoms'
import { useBakeCookie } from '@/hooks/mutations/useBakeCookie'
import type { SendCookieRequest } from '@/types/cookie'
import { compactDesignData } from '@/constant/items'
import { resetAllCookieMakeAtom } from '@/store/effects/resetAllCookieMakeAtom'
import { cookieStepAtom } from '@/store/atoms/cookieStepAtoms'
import { validateReceiver } from '@/utils/validateReceiver'

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

const HeaderWrapper = styled(FlexWrapper)`
  align-items: end;
  margin-top: 22px;
  height: 40px;
`

const HeaderLeftWrapper = styled(FlexWrapper)`
  align-items: center;
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
`

const PageTitle = styled.h1`
  font-family: 'Galmuri14';
  font-size: 15px;
  margin: 0;
`

const Title = styled.h1`
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 20px;
  margin: 20px 0 16px;
`

// 폼 영역
const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  position: relative;
`

const TextareaWrapper = styled.div`
  position: relative;
  height: 100%;
  max-height: 374px;
`

const LetterTextarea = styled.textarea`
  resize: none;
  height: 100%;
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  font-family: 'Galmuri14';

  /* 1. 스크롤바 전체 컨테이너 스타일 */
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 너비 */
    background-color: transparent; /* 배경을 투명하게 설정 */
  }

  /* 2. 스크롤바 핸들 (실제 움직이는 막대) 스타일 */
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* 어두운 색상에 20% 투명도 적용 */
    border-radius: 10px; /* 둥근 모서리 */
  }

  /* 3. 스크롤바 트랙 (핸들이 움직이는 경로) 스타일 */
  &::-webkit-scrollbar-track {
    background-color: transparent; /* 트랙을 투명하게 설정 */
  }
`

const CharacterCounter = styled.div`
  font-family: 'IM_Hyemin';
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 15px;
  color: #888;
`

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: transparent;
  font-family: 'IM_Hyemin';
`

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

const NoticeIconWrapper = styled.div`
  color: #f43f5e;
  font-size: 20px;
  display: flex;
  align-items: center;
`

const NoticeTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  letter-spacing: -0.5px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  font-size: 15px;
  color: #000000;
  line-height: 1.5;

  &::before {
    content: '•';
    margin-right: 8px;
    font-weight: bold;
  }
`

// 하단 버튼 영역
const BottomSection = styled.section`
  margin-top: auto;
  margin-bottom: 32px;
  width: 100%;
`

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

function Step3WriteLetter() {
  const navigate = useNavigate()
  const setDialogState = useSetAtom(dialogAtom)

  const selectedItems = useAtomValue(selectedItemsAtom)
  const receiver = useAtomValue(receiverAtom)
  const [letter, setLetter] = useAtom(letterAtom)
  const resetAll = useSetAtom(resetAllCookieMakeAtom)
  const setCookieStep = useSetAtom(cookieStepAtom)

  const { mutate } = useBakeCookie()

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleConfirm = async () => {
    const body: SendCookieRequest = {
      content: letter,
      design_data: compactDesignData(selectedItems),
      receiver_info: {
        campus: receiver.campus?.label as string,
        class_number: receiver.classNumber as number,
        mm_id: receiver.mmId as string,
        name: receiver.name as string,
        role: receiver.role,
      },
    }
    mutate(body, {
      onSuccess: () => {
        resetAll()
        setCookieStep('finish')
        navigate('/cookie/finish', {
          state: {
            name: receiver.name as string,
          },
          replace: true,
        })
      },
      onError: () => {
        alert('알 수 없는 에러 발생')
      },
    })
  }

  const handleSubmit = () => {
    if (!letter.trim()) {
      alert('편지를 한 자 이상 채워주세요.')
      return
    }

    const receiverError = validateReceiver(receiver)
    if (receiverError) {
      alert(receiverError)
      return
    }
    setDialogState({
      isOpen: true,
      title: '이대로 편지를 보낼까요?',
      cancelText: '아니오',
      confirmText: '네!',
      onConfirm: handleConfirm,
      onCancel: () => {},
    })
  }

  return (
    <FlexWrapper
      direction="column"
      align="center"
      height="100%"
      style={{ padding: '0 12px' }}
    >
      {/* 상단 헤더 */}
      <HeaderWrapper
        justify="space-between"
        align="start"
        width="100%"
        style={{ padding: '0 10px' }}
      >
        <HeaderLeftWrapper>
          <BackButton onClick={handleGoBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </BackButton>
          <PageTitle>편지 쓰기</PageTitle>
        </HeaderLeftWrapper>
      </HeaderWrapper>

      {/* 타이틀 */}
      <Title>쿠키 뒷면에 따뜻한 마음을 담아주세요.</Title>

      {/* 입력폼 */}
      <FormSection>
        <TextareaWrapper>
          <LetterTextarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            maxLength={300}
          />
          <CharacterCounter>{letter.length}/300</CharacterCounter>
        </TextareaWrapper>
        <NoticeContainer>
          <NoticeHeader>
            <NoticeIconWrapper>
              <FontAwesomeIcon icon={faExclamationCircle} />
            </NoticeIconWrapper>
            <NoticeTitle>전송 전 확인!</NoticeTitle>
          </NoticeHeader>

          <List>
            <ListItem>편지는 크리스마스 전까지 익명으로 유지됩니다.</ListItem>
            <ListItem>욕설이나 비방은 절대 금지!</ListItem>
            <ListItem>한 번 구운 쿠키는 되돌릴 수 없어요.</ListItem>
          </List>
        </NoticeContainer>
      </FormSection>

      {/* 하단 버튼 */}
      <BottomSection>
        <StyledButton onClick={handleSubmit} backgroundColor="primary">
          오븐에 넣어주기
          <IconWrapper>
            <FontAwesomeIcon icon={faArrowRight} />
          </IconWrapper>
        </StyledButton>
      </BottomSection>
    </FlexWrapper>
  )
}

export default Step3WriteLetter
