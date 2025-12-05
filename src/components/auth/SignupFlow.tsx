// src/components/auth/SignupFlow.tsx
import React, { useMemo, useState, type ChangeEvent } from 'react'
import {
  SignupPageWrapper,
  SignupCard,
} from './SignupFlow.styles'
import {
  CAMPUS_OPTIONS,
  type CampusKey,
  type CampusOption,
  type RoleState,
  type SignupRole,
  type SignupStep,
} from './signupTypes'
import { SignupStepIntro } from './SignupStepIntro'
import { SignupStepRole } from './SignupStepRole'
import { SignupStepForm } from './SignupStepForm'
import { SignupStepCode } from './SignupStepCode'
import { SignupStepSuccess } from './SignupStepSuccess'

interface SignupFlowProps {
  /** 인증 완료 후 다음 페이지로 이동 시 사용할 콜백 (선택) */
  onCompleted?: () => void
}

const SignupFlow: React.FC<SignupFlowProps> = ({ onCompleted }) => {
  const [step, setStep] = useState<SignupStep>('intro')
  const [role, setRole] = useState<RoleState>(null)

  const [campus, setCampus] = useState<CampusKey | ''>('')
  const [classNumber, setClassNumber] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [mmId, setMmId] = useState<string>('')

  const [code, setCode] = useState<string>('')

  const isStudent = role === 'student'

  const campusOptions: CampusOption[] = CAMPUS_OPTIONS

  const classOptions = useMemo(() => {
    if (!campus) return []
    const campusInfo = CAMPUS_OPTIONS.find((c) => c.key === campus)
    if (!campusInfo) return []
    return Array.from({ length: campusInfo.maxClass }, (_, index) =>
      String(index + 1),
    )
  }, [campus])

  const canGoFromRoleStep = role !== null

  const canRequestCode =
    role === 'instructor'
      ? name.trim().length > 0 && mmId.trim().length > 0
      : campus !== '' &&
        classNumber !== '' &&
        name.trim().length > 0 &&
        mmId.trim().length > 0

  const canVerifyCode = code.trim().length > 0

  const handleCampusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === '') {
      setCampus('')
      setClassNumber('')
      return
    }
    const found = CAMPUS_OPTIONS.find((c) => c.key === value)
    if (!found) return
    setCampus(found.key)
    setClassNumber('')
  }

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setClassNumber(event.target.value)
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleMmIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMmId(event.target.value)
  }

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const goToNextFromIntro = () => {
    setStep('selectRole')
  }

  const goToFormStep = () => {
    if (!canGoFromRoleStep || !role) return
    setStep('form')
  }

  const handleRequestCode = () => {
    if (!canRequestCode) return
    // TODO: Mattermost DM으로 인증코드 요청 API 연동
    setStep('code')
  }

  const handleResendCode = () => {
    // TODO: 인증 코드 재발송 API 연동
    console.log('인증 코드 재발송 요청')
  }

  const handleVerifyCode = () => {
    if (!canVerifyCode) return
    // TODO: 인증 코드 검증 API 연동
    setStep('success')
  }

  const handleGoToCookie = () => {
    if (onCompleted) {
      onCompleted()
      return
    }
    // TODO: 쿠키 만들기 페이지 라우팅 연결
    console.log('쿠키 만들기 페이지로 이동')
  }

  return (
    <SignupPageWrapper>
      <SignupCard>
        {step === 'intro' && (
          <SignupStepIntro onNext={goToNextFromIntro} />
        )}

        {step === 'selectRole' && (
          <SignupStepRole
            role={role}
            onChangeRole={(r: SignupRole) => setRole(r)}
            canNext={canGoFromRoleStep}
            onNext={goToFormStep}
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
            canRequestCode={canRequestCode}
            onChangeCampus={handleCampusChange}
            onChangeClass={handleClassChange}
            onChangeName={handleNameChange}
            onChangeMmId={handleMmIdChange}
            onClickRequestCode={handleRequestCode}
          />
        )}

        {step === 'code' && (
          <SignupStepCode
            code={code}
            canVerifyCode={canVerifyCode}
            onChangeCode={handleCodeChange}
            onClickResendCode={handleResendCode}
            onClickVerifyCode={handleVerifyCode}
          />
        )}

        {step === 'success' && (
          <SignupStepSuccess onClickGoToCookie={handleGoToCookie} />
        )}
      </SignupCard>
    </SignupPageWrapper>
  )
}

export default SignupFlow
