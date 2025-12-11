import React from 'react'
import styled, { css } from 'styled-components'

// --- Props 타입 정의 수정 ---
interface ActionButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  // title, text prop 대신 children을 사용
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  // children prop은 이미 React.ComponentPropsWithoutRef<'button'>에 포함되어 있습니다.
}

// --- 공통 스타일 정의 ---

const ButtonContainer = styled.button<ActionButtonProps>`
  /* 1. 레이아웃 설정 */
  width: 100%;
  max-width: 375px;
  padding: 14px 0;
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  /* 2. 배경 및 모양 */
  border-radius: 20px;
  border: 1px solid black;
  background-color: ${(props) => props.backgroundColor || '#CC8A2E'};

  /* 3. 테두리 텍스처 (Box-Shadow로 거친 느낌 흉내) */
  box-shadow:
    0 0 0 4px rgba(0, 0, 0, 0.1),
    0 0 0 6px rgba(0, 0, 0, 0.05),
    0 4px 8px rgba(0, 0, 0, 0.1);

  /* 4. 내용 정렬: children 구조에 맞게 중앙 정렬 유지 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* 5. 비활성화 스타일 */
  ${(props) =>
    props.disabled &&
    css`
      box-shadow: none;
    `}
`

// --- 텍스트 스타일 헬퍼 정의 (선택 사항: 내부 children에 적용 가능) ---
// 사용자가 직접 이 컴포넌트들을 children으로 사용하도록 가이드합니다.

export const ActionButtonTitle = styled.span<{ color?: string }>`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => props.color || 'black'};
  font-family: 'Pretendard', sans-serif;
`

export const ActionBodyText = styled.span<{ color?: string }>`
  margin-top: 8px; /* 제목과의 간격 */
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.color || 'black'};
  line-height: 1.2;
  font-family: 'Pretendard', sans-serif;
  white-space: pre-wrap;
`

// --- 컴포넌트 정의 ---
export default function ActionButton({
  backgroundColor,
  onClick,
  disabled = false,
  children, // children prop을 명시적으로 구조 분해
  ...rest // style, className 등을 받기 위한 나머지 props
}: ActionButtonProps) {
  return (
    <ButtonContainer
      onClick={onClick}
      backgroundColor={backgroundColor}
      disabled={disabled}
      {...rest} // style, className 등을 ButtonContainer에 전달
    >
      {children} {/* children을 ButtonContainer 내부에 렌더링 */}
    </ButtonContainer>
  )
}
