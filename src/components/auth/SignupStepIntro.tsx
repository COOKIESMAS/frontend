// src/components/auth/SignupStepIntro.tsx
import React from 'react'
import { Button } from '@chakra-ui/react'
import {
  TopGraphic,
  CloudImageTop,
  CloudImageBottom,
  SignupMainImage,
  IntroTextContainer,
  IntroLine,
  BottomButtonContainer,
} from './SignupFlow.styles'

interface SignupStepIntroProps {
  onNext: () => void
}

export const SignupStepIntro: React.FC<SignupStepIntroProps> = ({
  onNext,
}) => {
  return (
    <>
      <TopGraphic>
        <CloudImageTop src="/Cloud.png" alt="구름 장식" />
        <SignupMainImage src="/signup01.png" alt="쿠키 이미지" />
        <CloudImageBottom src="/Cloud.png" alt="구름 장식" />
      </TopGraphic>

      <IntroTextContainer>
        <IntroLine>친구들에게 쿠키를 구워주려면</IntroLine>
        <IntroLine>SSAFY 인증이 필요해요</IntroLine>
      </IntroTextContainer>

      <BottomButtonContainer>
        <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor="#2F2F2F"
          color="#FFFFFF"
          _hover={{ backgroundColor: '#1f1f1f' }}
          fontFamily="'MoneygraphyPixel', system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="16px"
          onClick={onNext}
        >
          다음
        </Button>
      </BottomButtonContainer>
    </>
  )
}
