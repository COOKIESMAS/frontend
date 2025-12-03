import React from 'react'
import styled from 'styled-components'

const PageWrapper = styled.main`
  max-width: 375px;
  width: 100%;
  height: 100%;
  background-color: #e8c7c7;
`

const StyledButton = styled.button`
  /* 둥근 모서리 */
  border-radius: 20px;
  padding: 10px 30px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;

  /* 배경: 앵귤러 그라디언트 적용 */
  background: conic-gradient(
    from 0deg,
    #d70000 5%,
    #e56000 17%,
    #e6cc00 32%,
    #70cc00 51%,
    #00cddb 67%,
    #0408dd 82%,
    #8000d5 96%
  );

  /* 테두리: 핑크색 아웃라인 (선택 사항) */
  border: 1px solid #ffc0cb; /* 연한 핑크색 */
  box-shadow: 0 0 5px rgba(255, 192, 203, 0.7); /* 핑크색 발광 효과 */

  /* 텍스트 스타일: 흰색 아웃라인 효과 */
  color: white;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000; /* 텍스트 아웃라인을 위한 간단한 그림자 */
  /* 또는, 텍스트에만 얇은 흰색 테두리를 적용할 수도 있지만, CSS에서 구현이 복잡하므로 text-shadow 사용 */
`

function MakePage() {
  return (
    <PageWrapper>
      <StyledButton>랜덤 바꾸기</StyledButton>
    </PageWrapper>
  )
}

export default MakePage
