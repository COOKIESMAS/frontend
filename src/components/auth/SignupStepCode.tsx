// src/components/auth/SignupStepCode.tsx
import React, { type ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import {
  BottomButtonContainer,
  CodeForm,
  CodeHeader,
  CodeInputRow,
  CodeSubText,
  CodeTitle,
  CodeValidityText,
  FieldGroup,
  FieldLabel,
  ResendText,
  TextField,
} from './SignupFlow.styles'

interface SignupStepCodeProps {
  code: string
  canVerifyCode: boolean
  onChangeCode: (event: ChangeEvent<HTMLInputElement>) => void
  onClickResendCode: () => void
  onClickVerifyCode: () => void
}

export const SignupStepCode: React.FC<SignupStepCodeProps> = ({
  code,
  canVerifyCode,
  onChangeCode,
  onClickResendCode,
  onClickVerifyCode,
}) => {
  return (
    <>
      <CodeHeader>
        <CodeTitle>
          Mattermost로 도착한
          <br />
          인증 코드를 입력해주세요
        </CodeTitle>
        <CodeSubText>
          메세지 도착까지 1분정도 소요될 수 있어요
        </CodeSubText>
      </CodeHeader>

      <CodeForm>
        <FieldGroup>
          <FieldLabel htmlFor="code">인증 코드</FieldLabel>
          <CodeInputRow>
            <TextField
              id="code"
              value={code}
              onChange={onChangeCode}
              placeholder="인증 코드를 입력해주세요"
            />
            <CodeValidityText>
              코드는 10분 동안 유효해요
            </CodeValidityText>
          </CodeInputRow>
        </FieldGroup>

        <ResendText type="button" onClick={onClickResendCode}>
          인증 코드 재발송
        </ResendText>
      </CodeForm>

      <BottomButtonContainer>
        <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor={canVerifyCode ? '#2F2F2F' : '#C4C4C4'}
          color="#FFFFFF"
          _hover={{
            backgroundColor: canVerifyCode
              ? '#1f1f1f'
              : '#C4C4C4',
          }}
          disabled={!canVerifyCode}
          fontFamily="'MoneygraphyPixel', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="16px"
          onClick={onClickVerifyCode}
        >
          인증하기
        </Button>
      </BottomButtonContainer>
    </>
  )
}
