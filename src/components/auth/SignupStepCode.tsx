// src/components/auth/SignupStepCode.tsx
import React, { type ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import {
  CodeForm,
  CodeHeader,
  CodeSubText,
  CodeTitle,
  FieldGroup,
  FieldLabel,
  ResendText,
  CodeInputRow,
  CodeInputField,
  CodeInputHint,
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
        <CodeSubText>메시지 도착까지 1분 정도 소요될 수 있어요</CodeSubText>
      </CodeHeader>

      <CodeForm>
        <FieldGroup>
          <FieldLabel htmlFor="code">인증 코드</FieldLabel>

          {/* ✅ 인풋 + “코드는 10분 동안 유효해요” 한 박스 안에 배치 */}
          <CodeInputRow>
            <CodeInputField
              id="code"
              value={code}
              onChange={onChangeCode}
              placeholder="입력"
            />

            <CodeInputHint $hidden={Boolean(code?.trim())}>
              코드는 10분 동안 유효해요
            </CodeInputHint>
          </CodeInputRow>
        </FieldGroup>
                <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor={canVerifyCode ? '#2F2F2F' : '#C4C4C4'}
          color="#FFFFFF"
          _hover={{
            backgroundColor: canVerifyCode ? '#1f1f1f' : '#C4C4C4',
          }}
          disabled={!canVerifyCode}
          onClick={onClickVerifyCode}
        >
          인증하기
        </Button>

        {/* ✅ 버튼 아래에 재발송 텍스트 */}
        <ResendText type="button" onClick={onClickResendCode}>
          인증 코드 재발송
        </ResendText>
      </CodeForm>
    </>
  )
}
