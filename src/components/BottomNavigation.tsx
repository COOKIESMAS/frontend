import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCookieBite,
  faHouse,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

// 색상 정의 (원하는 primary, secondary 색상을 여기에 정의합니다)
const COLORS = {
  default: '#d38d3b', // BottomNavWrapper의 기본 배경색과 동일
  primary: '#946135', // 중앙 버튼에 사용할 어두운 색상
} as const

// NavItem의 prop 타입 정의
type NavItemProps = {
  colorStyle?: 'primary'
}

const BottomNavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  height: 80px;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  background: ${COLORS.default}; /* 기본 배경색 */
  display: flex;
  justify-content: space-between;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
`

const NavItem = styled(Link)<NavItemProps>`
  flex: 1;
  height: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  // font will IM_Hyemin
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;

  /* colorStyle prop에 따른 배경색 조건부 적용 */
  ${({ colorStyle }) => {
    let color: string = COLORS.default

    if (colorStyle === 'primary') {
      color = COLORS.primary
    }

    return css`
      color: ${colorStyle && color};
      /* 만약 전체 배경색을 덮고 싶다면, 모든 버튼에 background-color를 설정해야 합니다. */
    `
  }}

  &:active {
    opacity: 0.7;
  }
`

const IconWrapper = styled.div<{ colorStyle?: 'primary' }>`
  font-size: 20px;
  color: ${({ colorStyle }) =>
    colorStyle === 'primary' ? COLORS.primary : 'white'};
`

export default function BottomNavigation() {
  return (
    <BottomNavWrapper>
      <NavItem to="/sent">
        <IconWrapper>
          <FontAwesomeIcon icon={faCookieBite} />
        </IconWrapper>
        보낸 쿠키
      </NavItem>

      {/* 중앙 버튼에 primary 색상 적용 */}
      <NavItem to="/" colorStyle="primary">
        <IconWrapper colorStyle="primary">
          <FontAwesomeIcon icon={faHouse} />
        </IconWrapper>
        홈
      </NavItem>

      <NavItem to="/friends">
        <IconWrapper>
          <FontAwesomeIcon icon={faHeart} />
        </IconWrapper>
        친구 오븐
      </NavItem>
    </BottomNavWrapper>
  )
}
