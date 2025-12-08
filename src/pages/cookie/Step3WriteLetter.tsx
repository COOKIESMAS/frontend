import { useState } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { dialogAtom } from '@/store/dialog'

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
  background-color: #e8c7c7;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 48px 24px;
`

const HeaderWrapper = styled(FlexWrapper)`
  align-items: end;
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
  font-size: 18px;
  margin: 0;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
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
  padding: 8px 4px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  // Galmuri14 font 적용 예정

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e7b472;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f7bfbf;
  }
`

const CharacterCounter = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  color: #888;
`

// 하단 버튼 영역
const BottomSection = styled.section`
  margin-top: auto;
  padding: 24px 0 8px;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 40px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  background: #e7b472;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

/* ===== tooltip 관련 스타일 (Label을 hover 또는 focus-within 했을 때 프로필 카드 노출) ===== */

function Step3WriteLetter() {
  const navigate = useNavigate()
  const setDialogState = useSetAtom(dialogAtom)
  const [letterContent, setLetterContent] = useState('')

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    setDialogState({
      isOpen: true,
      title: '이대로 편지를 보낼까요?',
      cancelText: '아니오',
      confirmText: '네!',
      onConfirm: () => navigate('/cookie/finish'),
      onCancel: () => {},
    })
  }

  return (
    <AppContainer>
      <PageWrapper>
        {/* 상단 헤더 */}
        <HeaderWrapper
          justify="space-between"
          align="start"
          width="100%"
          style={{ padding: '10px' }}
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
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              maxLength={300}
            />
            <CharacterCounter>{letterContent.length}/300</CharacterCounter>
          </TextareaWrapper>
        </FormSection>

        {/* 하단 버튼 */}
        <BottomSection>
          <SubmitButton onClick={handleSubmit}>오븐에 넣어주기</SubmitButton>
        </BottomSection>
      </PageWrapper>
    </AppContainer>
  )
}

export default Step3WriteLetter
