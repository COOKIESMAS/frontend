import styled from 'styled-components'

export const SignupPageWrapper = styled.div`
  @font-face {
    font-family: 'DNFBitBitv2';
    src: url('/DNFBitBitv2.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'DNFBitBitv2', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;

  width: 100%;
  min-height: 100vh;
  background-color: #e8c393;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
`

export const SignupCard = styled.div`
  width: 100%;
  max-width: 480px;
  background-color: #fff7ea;
  border-radius: 24px;
  padding: 24px 20px 88px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  min-height: 520px;
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

export const IntroLine = styled.p`
  font-size: 20px;
  color: #2c231c;
  line-height: 1.4;
`

export const BottomButtonContainer = styled.div`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 24px;
`

export const StepTitle = styled.h2`
  font-size: 22px;
  color: #2c231c;
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

export const RoleText = styled.span`
  font-size: 18px;
  color: #2c231c;
`

export const FormContainer = styled.div`
  margin-top: 4px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`

export const FieldLabel = styled.label`
  font-size: 14px;
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
  font-family: inherit;
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
  font-family: inherit;
  outline: none;

  &:focus {
    border-color: #2baeff;
  }
`

export const NoticeText = styled.p`
  font-size: 12px;
  color: #666666;
  margin-top: 4px;
`

export const CodeHeader = styled.div`
  text-align: center;
  margin-top: 16px;
`

export const CodeTitle = styled.h2`
  font-size: 20px;
  color: #2c231c;
  line-height: 1.4;
  margin-bottom: 8px;
`

export const CodeSubText = styled.p`
  font-size: 12px;
  color: #666666;
`

export const CodeForm = styled.div`
  margin-top: 32px;
`

export const ResendText = styled.button`
  margin-top: 4px;
  font-size: 12px;
  color: #2baeff;
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

export const SuccessTitle = styled.h2`
  font-size: 22px;
  color: #2c231c;
  margin-bottom: 8px;
`

export const SuccessSubText = styled.p`
  font-size: 14px;
  color: #2c231c;
  line-height: 1.5;
`
