import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

/* ---------------- styles ---------------- */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  gap: 12px;
  background-color: white;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6px 0;
`

const BackButton = styled.button`
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

/* tabs */
const TabsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const TabBtn = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border-radius: 999px;
  border: none;
  background: ${({ active }) => (active ? '#111' : '#f1f1f1')};
  color: ${({ active }) => (active ? '#fff' : '#222')};
  font-weight: ${({ active }) => (active ? 700 : 500)};
  cursor: pointer;
  font-size: 14px;

  &:focus {
    outline: 2px solid rgba(0, 0, 0, 0.08);
  }
`

/* list */
const ListArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  padding-bottom: 80px; /* 하단 네비 / 여유 공간 */
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const NoticeCard = styled.button`
  display: block;
  text-align: left;
  padding: 16px;
  width: 100%;
  border-radius: 14px;
  background: #f7f7f7;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
  transition:
    transform 120ms ease,
    box-shadow 120ms ease;
  color: inherit;

  &:active {
    transform: translateY(1px);
  }

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  }
`

const Tag = styled.div`
  font-size: 12px;
  color: #8a8a8a;
  margin-bottom: 8px;
`

const NoticeTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #111;
  margin-bottom: 10px;
  word-break: keep-all;
`

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DateText = styled.div`
  font-size: 12px;
  color: #9b9b9b;
`

/* empty */
const Empty = styled.div`
  padding: 28px;
  border-radius: 12px;
  background: #fff;
  color: #777;
  text-align: center;
`

/* ---------------- mock data & types ---------------- */

type Notice = {
  id: string
  kind: 'update' | 'info' | 'other'
  title: string
  date: string
  body?: string
}

const MOCK_NOTICE: Notice[] = [
  {
    id: 'n1',
    kind: 'update',
    title: '10/29 날씨돌 업데이트 사용 설명서',
    date: '2025.10.30',
  },
  {
    id: 'n2',
    kind: 'update',
    title: '나들이 날씨 기능 OPEN!',
    date: '2025.09.26',
  },
  {
    id: 'n3',
    kind: 'update',
    title: 'New! 날씨옷장 완전 정복 가이드',
    date: '2025.09.19',
  },
  {
    id: 'n4',
    kind: 'update',
    title: '🔥 날씨돌 업데이트 사용 설명서 🔥',
    date: '2025.09.05',
  },
  {
    id: 'n5',
    kind: 'info',
    title: '서비스 점검 안내 (2025-08-31)',
    date: '2025.08.20',
  },
  {
    id: 'n6',
    kind: 'other',
    title: '커뮤니티 이용 가이드',
    date: '2025.07.02',
  },
  // ... 더미 추가 가능
]

/* ---------------- page component ---------------- */

export default function NoticePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'all' | 'info' | 'update'>('all')

  const filtered = useMemo(() => {
    if (tab === 'all') return MOCK_NOTICE
    if (tab === 'info') return MOCK_NOTICE.filter((n) => n.kind === 'info')
    return MOCK_NOTICE.filter((n) => n.kind === 'update')
  }, [tab])

  const onOpen = (id: string) => {
    // 상세 페이지로 이동: 예) /notice/:id (라우터에 route 추가하세요)
    // navigate(`/notice/${id}`)
    console.log('open notice', id)
  }

  return (
    <PageContainer>
      <Header>
        <BackButton aria-label="뒤로" onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackButton>
        <Title>공지사항</Title>
      </Header>

      <TabsRow role="tablist" aria-label="공지 필터">
        <TabBtn
          active={tab === 'all'}
          onClick={() => setTab('all')}
          role="tab"
          aria-selected={tab === 'all'}
        >
          전체
        </TabBtn>
        <TabBtn
          active={tab === 'info'}
          onClick={() => setTab('info')}
          role="tab"
          aria-selected={tab === 'info'}
        >
          안내
        </TabBtn>
        <TabBtn
          active={tab === 'update'}
          onClick={() => setTab('update')}
          role="tab"
          aria-selected={tab === 'update'}
        >
          업데이트
        </TabBtn>
      </TabsRow>

      <ListArea role="list">
        {filtered.length === 0 ? (
          <Empty role="status">공지사항이 없습니다.</Empty>
        ) : (
          filtered.map((n) => (
            <NoticeCard
              key={n.id}
              role="listitem"
              aria-label={`${n.title} (${n.date})`}
              onClick={() => onOpen(n.id)}
            >
              <Tag>
                {n.kind === 'update'
                  ? '업데이트'
                  : n.kind === 'info'
                    ? '안내'
                    : '기타'}
              </Tag>
              <NoticeTitle>{n.title}</NoticeTitle>
              <MetaRow>
                <DateText>{n.date}</DateText>
              </MetaRow>
            </NoticeCard>
          ))
        )}
      </ListArea>
    </PageContainer>
  )
}
