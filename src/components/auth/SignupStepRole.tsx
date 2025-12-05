import React from 'react'
import { Button } from '@chakra-ui/react'
import {
  BottomButtonContainer,
  RoleButton,
  RoleButtonsContainer,
  RoleImage,
  RoleText,
  StepTitle,
} from './SignupFlow.styles'
import type { RoleState, SignupRole } from './signupTypes'

interface SignupStepRoleProps {
  role: RoleState
  onChangeRole: (role: SignupRole) => void
  canNext: boolean
  onNext: () => void
}

export const SignupStepRole: React.FC<SignupStepRoleProps> = ({
  role,
  onChangeRole,
  canNext,
  onNext,
}) => {
  const handleSelect = (value: SignupRole) => () => {
    onChangeRole(value)
  }

  return (
    <>
      <StepTitle>어떤 SSAFY이신가요?</StepTitle>

      <RoleButtonsContainer>
        <RoleButton
          type="button"
          selected={role === 'student'}
          onClick={handleSelect('student')}
        >
          <RoleImage src="/signup01.png" alt="SSAFY생" />
          <RoleText>싸피생 (Student)</RoleText>
        </RoleButton>

        <RoleButton
          type="button"
          selected={role === 'instructor'}
          onClick={handleSelect('instructor')}
        >
          <RoleImage src="/signup02.png" alt="프로님/강사님" />
          <RoleText>프로님 / 강사님 (Instructor)</RoleText>
        </RoleButton>
      </RoleButtonsContainer>

      <BottomButtonContainer>
        <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor={canNext ? '#2F2F2F' : '#C4C4C4'}
          color="#FFFFFF"
          _hover={{ backgroundColor: canNext ? '#1f1f1f' : '#C4C4C4' }}
          disabled={!canNext}
          onClick={onNext}
        >
          SSAFY 인증하기
        </Button>
      </BottomButtonContainer>
    </>
  )
}
