import { useUser } from '@/hooks/queries/useUser'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

/* PageWrapper 이 relative 인 것을 이용하여
   오버레이와 사이드메뉴를 'absolute'로 PageWrapper 기준에 맞춥니다. */

const SideMenuOverlay = styled.div<{ open: boolean }>`
  position: absolute; /* PageWrapper 기준 */
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(1px);
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
  z-index: 998;
  pointer-events: ${({ open }) =>
    open ? 'auto' : 'none'}; /* 닫힌 상태에는 클릭 무시 */
`

const SideMenuWrapper = styled.div<{ open: boolean }>`
  position: absolute; /* PageWrapper 기준 */
  top: 0;
  right: 0;
  width: 280px;
  max-width: 80%;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
  transform: translateX(${({ open }) => (open ? '0' : '100%')});
  transition: transform 0.25s ease;
  z-index: 999;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const UserSection = styled.div`
  margin-bottom: 20px;
`

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const UserClass = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
`

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MenuItem = styled(Link)`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    opacity: 0.7;
  }
`

export default function SideMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { data, isLoading } = useUser()

  const handleGmailClick = () => {
    const targetEmail = 'cookiesmasteam@gmail.com'
    const subject = encodeURIComponent('[문의] 쿠키스마스 관련 문의')
    const body = encodeURIComponent(
      '안녕하세요, 팀 쿠키스마스입니다.\n\n문의 내용을 입력해주세요.',
    )

    // 구글 메일 쓰기 URL 형식
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  if (isLoading) return null

  return (
    <>
      {/* 뒤 배경 */}
      <SideMenuOverlay open={open} onClick={onClose} />

      {/* 메뉴 패널 */}
      <SideMenuWrapper open={open}>
        <UserSection>
          <UserClass>
            {data?.campus} {data?.classNumber}반
          </UserClass>
          <UserName>{data?.name}</UserName>
        </UserSection>

        <MenuList>
          <MenuItem to="/mypage">
            마이페이지 <span>›</span>
          </MenuItem>
          <MenuItem
            as="a"
            to=""
            href="https://cookiesmas.notion.site/notice"
            target="_blank"
            rel="noopener noreferrer"
          >
            공지사항 <span>›</span>
          </MenuItem>
          <MenuItem as="div" to="" onClick={handleGmailClick}>
            문의하기 <span>›</span>
          </MenuItem>
        </MenuList>
      </SideMenuWrapper>
    </>
  )
}
