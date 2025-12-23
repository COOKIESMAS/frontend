import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useSendCookieDetail } from '@/hooks/queries/useSendCookieDetail'
import { useRequiredParam } from '@/hooks/useRequiredParam'
import BottomNavigation from '@/components/BottomNavigation'

/* ------------------ 스타일 ------------------ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 16px 0;
  box-sizing: border-box;
  gap: 18px;
  background-color: #e2ae71;
  margin-bottom: 80px;
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

const PageTitle = styled.h2`
  font-family: 'Galmuri14';
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`

const LetterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end; /* 가로 가운데 */
  justify-content: center; /* 세로 가운데 */
  flex: 1;
  gap: 20px;
`

const ToPill = styled.div`
  background: #ffffff;
  min-width: 240px;
  padding: 4px 20px;
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

const FriendOvenButton = styled.button`
  background-color: #b36a2e;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 8px 12px;
  box-shadow: 0 4px 0 #8c4f1f;
  font-family: 'DNFBitBitv2';
  font-size: 16px;
  line-height: 1.2;
  cursor: pointer;

  /* 🔑 텍스트 줄바꿈 그대로 적용 */
  white-space: pre-line;
  text-align: center;

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0 #8c4f1f;
  }
`

/* ------------------ 컴포넌트 ------------------ */

export default function CookieDetail() {
  const navigate = useNavigate()
  const id = useRequiredParam('id')

  const { data } = useSendCookieDetail(id)

  if (!data) return null

  console.log(data)
  return (
    <Container>
      <HeaderRow>
        <BackButton aria-label="뒤로" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackButton>

        <PageTitle>보낸 쿠키</PageTitle>
      </HeaderRow>
      <LetterWrapper>
        <ToPill aria-label={`받는사람: ${data[0]?.receiverName}`}>
          <ToLabel>To.</ToLabel>
          <ToNameText>
            {/* {data.toMeta ? `${data.toMeta} ${data.toName}` : data.toName} */}
            {data[0]?.receiverName}
          </ToNameText>
        </ToPill>
        <LetterBox id="letter-heading" aria-label="편지 내용">
          {data[0]?.content}
        </LetterBox>
        <FriendOvenButton
          onClick={() => navigate(`/oven/${data[0]?.receiverId}`)}
        >
          {`친구 오븐
          놀러가기`}
        </FriendOvenButton>
      </LetterWrapper>
      <BottomNavigation />
    </Container>
  )
}
