import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useSendCookieList } from '@/hooks/queries/useSendCookieList'
import { mapSendCookieToSendItem } from '@/utils/sendListMapper'
import type { CookieDesignImgDataCamel } from '@/types/cookie'
import CookieImageRenderer2 from '@/components/cookie/CookieImageRenderer2'
import BottomNavigation from '@/components/BottomNavigation'

/* --------------------- 스타일 --------------------- */

// 페이지 내부 레이아웃(이 파일은 Layout의 Outlet 내부에서 렌더됩니다)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
  padding: 16px;
  box-sizing: border-box;
  background-color: #e2ae71;
  padding-bottom: 80px;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  font-size: 20px;
`

const PageTitle = styled.h2`
  font-family: 'Galmuri14';
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`

const BadgeWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`

const CountBadge = styled.div`
  min-width: 64px;
  background: linear-gradient(
    180deg,
    rgba(125, 58, 15, 0.8),
    rgba(125, 58, 15, 0.5) /* 50% 불투명도 (끝) */
  );
  color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  box-shadow: 0 6px 12px rgba(138, 75, 35, 0.25);
  font-weight: 700;
`

const CountLabel = styled.div`
  font-family: 'Galmuri14';
  font-size: 13px;
`

const CountValue = styled.div`
  font-family: 'DNFBitBitv2';
  font-size: 24px;
  line-height: 24px;
`

// 리스트 영역 (스크롤)
const ListArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px; /* 스크롤 여백 */
  padding-bottom: 94px; /* 하단 네비 겹침 방지 */
  display: flex;
  flex-direction: column;
  gap: 12px;

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

// 카드
// 기존: const Card = styled.article`  ...
// 변경 ↓
const Card = styled(Link)`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;

  &:active {
    opacity: 0.8;
  }
`

const Thumb = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 8px;
  object-fit: contain;
  background: #eee;
  flex-shrink: 0;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ToText = styled.div`
  font-family: 'DNFBitBitv2';
  font-size: 16px;
  font-weight: 500;
  color: #2b2b2b;
`

const MessagePreview = styled.div`
  font-family: 'IM_Hyemin';
  font-size: 12px;
  color: #666;
  line-height: 1.2;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`

const DateText = styled.div`
  font-family: 'IM_Hyemin';
  font-size: 12px;
  color: #9b9b9b;
`

const Status = styled.div<{ success?: boolean }>`
  font-family: 'DNFBitBitv2';
  font-size: 12px;
  color: ${({ success }) => (success ? '#2aa84f' : '#c07a3f')};
`

const EmptyStateWrapper = styled.div`
  margin-top: 32px;
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  text-align: center;
  color: #63422b;
`

/* --------------------- 데이터 타입 --------------------- */
type SendItem = {
  id: string
  toName: string
  designData: CookieDesignImgDataCamel
  toMeta?: string // (캠퍼스/반)
  messagePreview: string
  date: string
  status: 'done' | 'sending' | 'failed'
}

/* --------------------- 하위 컴포넌트 --------------------- */

function CookieCard({ item }: { item: SendItem }) {
  return (
    <Card to={`/cookie/${item.id}`}>
      <Thumb>
        <CookieImageRenderer2 designData={item.designData} />
      </Thumb>
      <CardBody>
        <ToText>
          <span style={{ color: '#9D6A37' }}>To. </span>
          <span>
            {item.toName} {item.toMeta ? ` (${item.toMeta})` : ''}
          </span>
        </ToText>
        <MessagePreview>{item.messagePreview}</MessagePreview>

        <CardFooter>
          <DateText>{item.date}</DateText>
          <Status success={item.status === 'done'}>
            {item.status === 'done'
              ? '전송 완료'
              : item.status === 'sending'
                ? '전송 중'
                : '전송 실패'}
          </Status>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

/* --------------------- 페이지 컴포넌트 --------------------- */

export default function SendList() {
  const navigate = useNavigate()

  const { data, isLoading } = useSendCookieList()

  const items = data ? data.map(mapSendCookieToSendItem) : []
  const totalCount = items.length

  if (isLoading) {
    return <Container>로딩중...</Container>
  }

  return (
    <Container>
      <HeaderRow>
        <BackButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackButton>

        <PageTitle>보낸 쿠키</PageTitle>

        <BadgeWrapper>
          <CountBadge>
            <CountLabel style={{ fontSize: 12 }}>보낸 쿠키</CountLabel>
            <CountValue style={{ fontSize: 20, lineHeight: 1.4 }}>
              {totalCount}개
            </CountValue>
          </CountBadge>
        </BadgeWrapper>
      </HeaderRow>

      <ListArea>
        {data?.length === 0 ? (
          <EmptyStateWrapper>
            아직 보낸 쿠키가 없습니다.
            <div style={{ marginTop: 8, fontSize: 13 }}>
              쿠키를 만들어 친구에게 전해보세요.
            </div>
          </EmptyStateWrapper>
        ) : (
          data?.map((item) => {
            console.log(item)
            const cardProps: SendItem = {
              id: String(item.cookiePk),
              toName: item.receiverName,
              toMeta: undefined, // 필요하면 여기서 조합
              designData: item.designData,
              messagePreview: item.content,
              date: item.createdAt.slice(0, 10),
              status: item.isRead ? 'done' : 'sending',
            }

            return <CookieCard key={cardProps.id} item={cardProps} />
          })
        )}
      </ListArea>
      <BottomNavigation />
    </Container>
  )
}
