// src/components/auth/SignupFlow.styles.ts
import styled from 'styled-components'

export const SignupPageWrapper = styled.div`
  /* 폰트 로딩 */
  @font-face {
    font-family: 'DNFBitBitv2';
    src: url('/fonts/DNFBitBitv2.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Galmuri14';
    src: url('/fonts/Galmuri14.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'MoneygraphyPixel';
    src: url('/fonts/Moneygraphy-Pixel.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'IM_Hyemin';
    src: url('/fonts/IM_Hyemin-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'IM_Hyemin';
    src: url('/fonts/IM_Hyemin-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  font-family: 'Pretendard', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;

  width: 100%;
  min-height: 100vh;
  background-color: #baebff;
  display: flex;
  justify-content: center;
  align-items: stretch;
`

export const SignupCard = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  background-color: transparent;
  border-radius: 0;
  padding: 32px 24px 88px;
  box-sizing: border-box;
  position: relative;
`

export const TopGraphic = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 200px;
  margin: 0 auto 24px;
`

export const CloudImageTop = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 96px;
  height: auto;
`

export const CloudImageBottom = styled.img`
  position: absolute;
  bottom: -10px;
  left: 32px;
  width: 120px;
  height: auto;
`

export const SignupMainImage = styled.img`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  height: 160px;
  width: auto;
`

export const IntroTextContainer = styled.div`
  text-align: center;
  margin-top: 12px;
`

/* Intro 텍스트: Pretendard Medium 24px */
export const IntroLine = styled.p`
  font-family: 'Pretendard', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #21112c;
  line-height: 1.4;
`

export const BottomButtonContainer = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
`

export const StepTitle = styled.h2`
  font-family: 'Pretendard', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #21112c;
  text-align: center;
  margin-bottom: 24px;
`

export const RoleButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`

export const RoleButton = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  border: 2px solid
    ${({ selected }) => (selected ? '#E83B40' : '#e0d0b3')};
  background-color: ${({ selected }) =>
    selected ? '#fff0eb' : '#ffffff'};
  cursor: pointer;
  gap: 12px;
  outline: none;

  &:hover {
    border-color: #e83b40;
  }
`

export const RoleImage = styled.img`
  height: 56px;
  width: auto;
  flex-shrink: 0;
`

/* 싸피생 / 프로님 텍스트: Galmuri14 18px */
export const RoleText = styled.span`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  color: #21112c;
`

export const FormContainer = styled.div`
  margin-top: 4px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

/* 라벨: IM_Hyemin Bold 16px */
export const FieldLabel = styled.label`
  font-family: 'IM_Hyemin', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
  color: #21112c;
`

/* 입력/셀렉트 placeholder 및 텍스트: Galmuri14 18px */
export const SelectField = styled.select`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #c4c4c4;
  padding: 0 12px;
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  background-color: #ffffff;
  outline: none;

  &:focus {
    border-color: #2baeff;
  }

  &:disabled {
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`

export const TextField = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #c4c4c4;
  padding: 0 12px;
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  background-color: #ffffff;
  outline: none;

  &::placeholder {
    font-family: 'Galmuri14', system-ui, -apple-system,
      BlinkMacSystemFont, sans-serif;
    font-size: 18px;
    color: #b0b0b0;
  }

  &:focus {
    border-color: #2baeff;
  }
`

/* 안내 문구: IM_Hyemin Bold 14px */
export const NoticeText = styled.p`
  font-family: 'IM_Hyemin', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #21112c;
  margin-top: 4px;
`

export const CodeHeader = styled.div`
  text-align: left;
  margin-top: 16px;
`

/* 코드 입력 타이틀: Pretendard Medium 24px */
export const CodeTitle = styled.h2`
  font-family: 'Pretendard', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #21112c;
  line-height: 1.4;
  margin-bottom: 8px;
`

/* 서브텍스트: IM_Hyemin Bold 14px, #21112C */
export const CodeSubText = styled.p`
  font-family: 'IM_Hyemin', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #21112c;
`

export const CodeForm = styled.div`
  margin-top: 32px;
`

/* 코드 입력 줄: input + "코드는 10분 동안 유효해요" */
export const CodeInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const CodeValidityText = styled.span`
  white-space: nowrap;
  font-family: 'IM_Hyemin', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #6b6a6a;
`

/* 재발송: IM_Hyemin Bold 14px, #5D5D5D */
export const ResendText = styled.button`
  margin-top: 4px;
  font-family: 'IM_Hyemin', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #5d5d5d;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
`

export const SuccessContent = styled.div`
  text-align: center;
  margin-top: 40px;
`

export const SuccessImage = styled.img`
  width: 220px;
  max-width: 80%;
  margin: 0 auto 24px;
  display: block;
`

/* 성공 타이틀: Pretendard Regular 28px */
export const SuccessTitle = styled.h2`
  font-family: 'Pretendard', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 28px;
  color: #21112c;
  margin-bottom: 8px;
`

/* 성공 서브텍스트: IM_Hyemin Bold 14px */
export const SuccessSubText = styled.p`
  font-family: 'IM_Hyemin', system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #21112c;
  line-height: 1.5;
`

/* 폼/코드 단계에서 왼쪽 상단 뒤로가기 버튼 */
export const BackButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
  background: transparent;
  border: none;
  color: #21112c;
  font-size: 24px;
  cursor: pointer;
`
