// src/container/SignupFlowContainer.tsx
import React, { type ChangeEvent } from 'react'
import {
  SignupPageWrapper,
  SignupCard,
} from '../components/auth/SignupFlow.styles'
import { SignupStepIntro } from '../components/auth/SignupStepIntro'
import { SignupStepRole } from '../components/auth/SignupStepRole'
import { SignupStepForm } from '../components/auth/SignupStepForm'
import { SignupStepCode } from '../components/auth/SignupStepCode'
import { SignupStepSuccess } from '../components/auth/SignupStepSuccess'
import type {
  CampusKey,
  CampusOption,
  RoleState,
  SignupRole,
  SignupStep,
} from '../components/auth/signupTypes'

interface SignupFlowContainerProps {
  step: SignupStep
  role: RoleState
  isStudent: boolean
  campus: CampusKey | ''
  classNumber: string
  name: string
  mmId: string
  code: string
  campusOptions: CampusOption[]
  classOptions: string[]
  canGoFromRoleStep: boolean
  canClickRequestCode: boolean
  canClickVerifyCode: boolean
  onNextFromIntro: () => void
  onNextFromRole: () => void
  onChangeCampus: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeClass: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeMmId: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeCode: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeRole: (role: SignupRole) => void
  onClickRequestCode: () => void
  onClickResendCode: () => void
  onClickVerifyCode: () => void
  onClickGoToCookie: () => void
  onBackFromForm: () => void
}

export const SignupFlowContainer: React.FC<SignupFlowContainerProps> = ({
  step,
  role,
  isStudent,
  campus,
  classNumber,
  name,
  mmId,
  code,
  campusOptions,
  classOptions,
  canGoFromRoleStep,
  canClickRequestCode,
  canClickVerifyCode,
  onNextFromIntro,
  onNextFromRole,
  onChangeCampus,
  onChangeClass,
  onChangeName,
  onChangeMmId,
  onChangeCode,
  onChangeRole,
  onClickRequestCode,
  onClickResendCode,
  onClickVerifyCode,
  onClickGoToCookie,
  onBackFromForm,
}) => {
  return (
    <SignupPageWrapper>
      <SignupCard>
        {step === 'intro' && (
          <SignupStepIntro onNext={onNextFromIntro} />
        )}

        {step === 'selectRole' && (
          <SignupStepRole
            role={role}
            onChangeRole={onChangeRole}
            canNext={canGoFromRoleStep}
            onNext={onNextFromRole}
          />
        )}

        {step === 'form' && (
          <SignupStepForm
            isStudent={isStudent}
            campus={campus}
            classNumber={classNumber}
            name={name}
            mmId={mmId}
            campusOptions={campusOptions}
            classOptions={classOptions}
            canRequestCode={canClickRequestCode}
            onChangeCampus={onChangeCampus}
            onChangeClass={onChangeClass}
            onChangeName={onChangeName}
            onChangeMmId={onChangeMmId}
            onClickRequestCode={onClickRequestCode}
            onClickBack={onBackFromForm}
          />
        )}

        {step === 'code' && (
          <SignupStepCode
            code={code}
            canVerifyCode={canClickVerifyCode}
            onChangeCode={onChangeCode}
            onClickResendCode={onClickResendCode}
            onClickVerifyCode={onClickVerifyCode}
          />
        )}

        {step === 'success' && (
          <SignupStepSuccess
            onClickGoToCookie={onClickGoToCookie}
          />
        )}
      </SignupCard>
    </SignupPageWrapper>
  )
}

export default SignupFlowContainer
