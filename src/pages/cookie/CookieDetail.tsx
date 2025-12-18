import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

/* ------------------ 스타일 ------------------ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  gap: 18px;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin: 0;
  cursor: pointer;
  font-size: 22px;
`

const LetterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 가운데 */
  justify-content: center; /* 세로 가운데 */
  flex: 1;
  gap: 20px;
`

const ToPill = styled.div`
  background: #ffffff;
  min-width: 240px;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin: 0 auto;

  font-family:
    'DNFBitBitv2',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-size: 25px;
  font-weight: 400;
`

const ToLabel = styled.span`
  color: #868686;
  margin-right: 8px;
`

const ToNameText = styled.span`
  color: #000000;
`

const LetterBox = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  height: 100%;
  max-height: 380px;
  overflow-y: auto;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  width: 100%;

  font-family:
    'Galmuri14',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;

  /* 스크롤바 스타일 (웹kit) */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
    border-radius: 8px;
  }
`

/* ------------------ mock / types ------------------ */

type CookieDetailData = {
  id: string
  toName: string
  toMeta?: string
  message: string
  date: string
}

/* 간단한 예시 데이터 — 실제로는 API로 받아오세요 */
const MOCK_DATA: CookieDetailData = {
  id: '1',
  toName: '이싸피',
  toMeta: '구미 6반',
  message:
    '안녕 이싸피!\n올 한 해도 정말 고생 많았어..\n나랑 같이 알고리즘 공부 해줘서 정말 고마워.\n\n우리 2학기도 같이 열심히 프로젝트 해보자!\n항상 응원해 ❤️\n안녕 이싸피!\n올 한 해도 정말 고생 많았어..\n나랑 같이 알고리즘 공부 해줘서 정말 고마워.\n\n우리 2학기도 같이 열심히 프로젝트 해보자!\n항상 응원해 ❤️',
  date: '2025.12.15',
}

/* ------------------ 컴포넌트 ------------------ */

export default function CookieDetail() {
  const navigate = useNavigate()
  // const { id } = useParams<{ id: string }>()
  const data = MOCK_DATA

  return (
    <Container>
      <HeaderRow>
        <BackButton aria-label="뒤로" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackButton>
      </HeaderRow>
      <LetterWrapper>
        <ToPill aria-label={`받는사람: ${data.toName}`}>
          <ToLabel>To.</ToLabel>
          <ToNameText>
            {data.toMeta ? `${data.toMeta} ${data.toName}` : data.toName}
          </ToNameText>
        </ToPill>
        <LetterBox id="letter-heading" aria-label="편지 내용">
          {data.message}
        </LetterBox>
      </LetterWrapper>
    </Container>
  )
}
