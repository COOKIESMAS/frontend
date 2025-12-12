// src/components/auth/SignupFlow.styles.ts
import styled from 'styled-components'

/**
 * 전체 가입 플로우 공통 래퍼
 * - 배경색: #BAEBFF
 * - 내부 컨텐츠는 max-width 375px, height: 100vh
 */
export const SignupPageWrapper = styled.div`
  /* ===== 폰트 로딩 (public/fonts 기준) ===== */
  @font-face {
    font-family: 'DNFBitBitv2';
    src: url('/fonts/DNFBitBitv2.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/fonts/Pretendard-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/fonts/Pretendard-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'IM_Hyemin-Bold';
    src: url('/fonts/IM_Hyemin-Bold.ttf') format('truetype');
    font-weight: bold;
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

  font-family: 'Pretendard-Medium', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;

  width: 100%;
  min-height: 100vh;
  background-color: #baebff;
  display: flex;
  justify-content: center;
  align-items: stretch;
`

/**
 * 실제 화면 내용 컨테이너
 * - width: 100%, max-width: 375px, height: 100vh
 */
export const SignupCard = styled.div`
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  background-color: transparent;
  border-radius: 0;
  padding: 32px 24px 88px;
  box-shadow: none;
  position: relative;
  box-sizing: border-box;
`

/* ===== 인트로(1번 화면) ===== */

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
  text-align: left;
  margin-top: 12px;
`

/** 친구들에게 쿠키를 구워주려면 ~ SSAFY 인증이 필요해요 */
export const IntroLine = styled.p`
  font-family: 'Pretendard-Medium', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  color: #2c231c;
  line-height: 1.4;
`

/** 하단 버튼 공통 레이아웃 */
export const BottomButtonContainer = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 32px;
`

/* ===== 역할 선택(2번 화면) ===== */

export const StepTitle = styled.h2`
  font-family: 'Pretendard-Medium', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  color: #2c231c;
  text-align: left;
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
  border: 2px solid ${({ selected }) => (selected ? '#E83B40' : '#e0d0b3')};
  background-color: ${({ selected }) => (selected ? '#fff0eb' : '#ffffff')};
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

/** 싸피생 / 프로님 / 강사님 */
export const RoleText = styled.span`
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
  color: #2c231c;
`

/* ===== 정보 입력 폼(3, 4번 화면) ===== */

export const FormContainer = styled.div`
  margin-top: 4px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

/** 라벨: IM_Hyemin Bold 16px */
export const FieldLabel = styled.label`
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  margin-bottom: 4px;
  color: #2c231c;
`

export const SelectField = styled.select`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #c4c4c4;
  padding: 0 12px;
  font-size: 16px;
  background-color: #ffffff;
  font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
  font-size: 16px;
  background-color: #ffffff;
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  outline: none;

  &::placeholder {
    font-family: 'Galmuri14', system-ui, -apple-system,
      BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 18px;
    color: #c4c4c4;
  }

  &:focus {
    border-color: #2baeff;
  }
`

/** 안내 문구: IM_Hyemin Bold 14px */
export const NoticeText = styled.p`
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #666666;
  margin-top: 4px;
`

/* ===== 코드 입력(5번 화면) ===== */

export const CodeHeader = styled.div`
  text-align: left;
  margin-top: 16px;
`

/** Mattermost로 도착한 인증 코드를 입력해주세요 */
export const CodeTitle = styled.h2`
  font-family: 'Pretendard-Medium', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  color: #000000;
  line-height: 1.4;
  margin-bottom: 8px;
`

/** 메시지 도착까지 1분 정도 소요될 수 있어요 */
export const CodeSubText = styled.p`
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #21112c;
`

export const CodeForm = styled.div`
  margin-top: 32px;
`

/**
 * 코드 입력 박스
 * - 왼쪽: 입력 필드
 * - 오른쪽: "코드는 10분 동안 유효해요"
 */
export const CodeInputRow = styled.div`
  width: 100%;
  height: 56px; /* 높이 명시 */
  border-radius: 16px;
  background-color: #ffffff; /* 흰색 배경 */
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  /* box-shadow: 0 0 0 2px #c4c4c4 inset; // 이미지에 맞게 제거 */
  gap: 8px;
`;

// 왼쪽 입력 필드 (이미지 디자인 반영)
export const CodeInputField = styled.input`
  flex: 1;
  width: 120px;
  height: 48px; /* 높이 조정 */
  border: none;
  outline: none;
  background: transparent;
  padding: 0; /* CodeInputRow의 padding으로 대체 */
    font-family: 'Galmuri14', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 18px;
    &::placeholder {
    font-family: 'Galmuri14', system-ui, -apple-system,
      BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 18px;
    color: #c4c4c4;
  }
`;

// 오른쪽 힌트 텍스트 (코드는 10분 동안 유효해요)
export const CodeInputHint = styled.span`
  margin-left: 8px;
  flex-shrink: 0;       /* 너무 줄어들지 않게 */
  white-space: nowrap;  /* 한 줄 유지 */

  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #6b6a6a;
`;

/** 인증 코드 재발송 */
export const ResendText = styled.button`
  margin-top: 12px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #5d5d5d;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

/* ===== 인증 완료(6번 화면) ===== */

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

/** SSAFY 인증 완료! */
export const SuccessTitle = styled.h2`
  font-family: 'Pretendard-Regular', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 28px;
  color: #2c231c;
  margin-bottom: 8px;
`

/** 이제 친구들의 오븐에 쿠키를 구우러 가볼까요? */
export const SuccessSubText = styled.p`
  font-family: 'IM_Hyemin-Bold', system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #2c231c;
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