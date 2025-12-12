// src/components/auth/SignupStepSuccess.tsx
import React from 'react'
import { Button } from '@chakra-ui/react'
import {
  BottomButtonContainer,
  SuccessContent,
  SuccessImage,
  SuccessSubText,
  SuccessTitle,
} from './SignupFlow.styles'

interface SignupStepSuccessProps {
  onClickGoToCookie: () => void
}

export const SignupStepSuccess: React.FC<
  SignupStepSuccessProps
> = ({ onClickGoToCookie }) => {
  return (
    <>
      <SuccessContent>
        <SuccessImage
          src="/Authentication successful.png"
          alt="인증 완료"
        />
        <SuccessTitle>SSAFY 인증 완료!</SuccessTitle>
        <SuccessSubText>
          이제 친구들의 오븐에
          <br />
          쿠키를 구우러 가볼까요?
        </SuccessSubText>
      </SuccessContent>

      <BottomButtonContainer>
        <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor="#2BAEFF"
          color="#FFFFFF"
          _hover={{ backgroundColor: '#1693dd' }}
          fontFamily="'MoneygraphyPixel', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="16px"
          onClick={onClickGoToCookie}
        >
          쿠키 만들기
        </Button>
      </BottomButtonContainer>
    </>
  )
}
