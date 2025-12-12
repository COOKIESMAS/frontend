// src/components/auth/SignupFlow.tsx
import React, {
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'
import {
  CAMPUS_OPTIONS,
  type CampusKey,
  type CampusOption,
  type RoleState,
  type SignupRole,
  type SignupStep,
} from './signupTypes'
import {
  useApi,
  type ApiError,
  setAccessToken,
} from '../../utils/useApi'
import { SignupFlowContainer } from '../../container/SignupFlowContainer'

interface SignupFlowProps {
  /** 인증 완료 후 다음 페이지로 이동 시 사용할 콜백 */
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

  const [isLoadingSendCode, setIsLoadingSendCode] = useState(false)
  const [isLoadingVerify, setIsLoadingVerify] = useState(false)

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

  const canClickRequestCode = canRequestCode && !isLoadingSendCode
  const canClickVerifyCode = canVerifyCode && !isLoadingVerify

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

  const goBackFromForm = () => {
    setStep('selectRole')
  }

  /** 백엔드 role 매핑: student -> STUDENT, instructor -> STAFF */
  const getBackendRole = () => {
    if (role === 'student') return 'STUDENT'
    if (role === 'instructor') return 'STAFF'
    return 'STUDENT'
  }

  /** campus key -> 실제 백엔드에 보낼 label(캠퍼스 이름) */
  const getCampusLabel = () => {
    if (!campus) return null
    const campusInfo = CAMPUS_OPTIONS.find((c) => c.key === campus)
    return campusInfo?.label ?? null
  }

  /** 인증코드 요청 (Mattermost DM 발송) */
  const handleRequestCode = async () => {
    if (!canRequestCode || !mmId.trim()) return

    try {
      setIsLoadingSendCode(true)

      await useApi.post('/auth/send-code', {
        mm_id: mmId.trim(),
      })

      setStep('code')
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        apiError.response?.data?.message ??
        apiError.response?.data?.detail ??
        '인증 코드 요청 중 오류가 발생했습니다.'
      window.alert(message)
    } finally {
      setIsLoadingSendCode(false)
    }
  }

  /** 인증코드 재발송 */
  const handleResendCode = async () => {
    if (!mmId.trim()) return

    try {
      setIsLoadingSendCode(true)

      await useApi.post('/auth/send-code', {
        mm_id: mmId.trim(),
      })

      window.alert('인증 코드가 다시 전송되었습니다.')
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        apiError.response?.data?.message ??
        apiError.response?.data?.detail ??
        '인증 코드 재발송 중 오류가 발생했습니다.'
      window.alert(message)
    } finally {
      setIsLoadingSendCode(false)
    }
  }

  /** 인증코드 검증 + 정회원 토큰 발급 */
  const handleVerifyCode = async () => {
    if (!canVerifyCode || !mmId.trim()) return

    try {
      setIsLoadingVerify(true)

      const campusLabel = getCampusLabel()
      const backendRole = getBackendRole()

      const payload = {
        code: code.trim(),
        mm_id: mmId.trim(),
        campus: campusLabel,
        class_number:
          campusLabel && classNumber ? Number(classNumber) : null,
        name: name.trim(),
        role: backendRole,
      }

      const response = await useApi.post('/auth/verify-join', payload)

      const data = response.data as { token?: string; access_token?: string }
      const newToken = data.token ?? data.access_token

      if (!newToken) {
        window.alert('새 토큰을 받지 못했습니다. 관리자에게 문의해주세요.')
      } else {
        setAccessToken(newToken)
      }

      setStep('success')
    } catch (error: unknown) {
      const apiError = error as ApiError
      const message =
        apiError.response?.data?.message ??
        apiError.response?.data?.detail ??
        '인증 코드 검증 중 오류가 발생했습니다.'
      window.alert(message)
    } finally {
      setIsLoadingVerify(false)
    }
  }

  const handleGoToCookie = () => {
    if (onCompleted) {
      onCompleted()
      return
    }
    console.log('쿠키 만들기 페이지로 이동')
  }

  return (
    <SignupFlowContainer
      step={step}
      role={role}
      isStudent={isStudent}
      campus={campus}
      classNumber={classNumber}
      name={name}
      mmId={mmId}
      code={code}
      campusOptions={campusOptions}
      classOptions={classOptions}
      canGoFromRoleStep={canGoFromRoleStep}
      canClickRequestCode={canClickRequestCode}
      canClickVerifyCode={canClickVerifyCode}
      onNextFromIntro={goToNextFromIntro}
      onNextFromRole={goToFormStep}
      onBackFromForm={goBackFromForm}
      onChangeCampus={handleCampusChange}
      onChangeClass={handleClassChange}
      onChangeName={handleNameChange}
      onChangeMmId={handleMmIdChange}
      onChangeCode={handleCodeChange}
      onChangeRole={(r: SignupRole) => setRole(r)}
      onClickRequestCode={handleRequestCode}
      onClickResendCode={handleResendCode}
      onClickVerifyCode={handleVerifyCode}
      onClickGoToCookie={handleGoToCookie}
    />
  )
}

export default SignupFlow
