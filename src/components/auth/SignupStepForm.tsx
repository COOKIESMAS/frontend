// src/components/auth/SignupStepForm.tsx
import React, { type ChangeEvent } from 'react'
import { Button } from '@chakra-ui/react'
import {
  BottomButtonContainer,
  FieldGroup,
  FieldLabel,
  FormContainer,
  NoticeText,
  SelectField,
  TextField,
  StepFormHeader,
  StepFormBackButton,
} from './SignupFlow.styles'
import type { CampusKey, CampusOption } from './signupTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

interface SignupStepFormProps {
  isStudent: boolean
  campus: CampusKey | ''
  classNumber: string
  name: string
  mmId: string
  campusOptions: CampusOption[]
  classOptions: string[]
  canRequestCode: boolean
  onChangeCampus: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeClass: (event: ChangeEvent<HTMLSelectElement>) => void
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeMmId: (event: ChangeEvent<HTMLInputElement>) => void
  onClickRequestCode: () => void

  /** 역할 선택(step=selectRole) 화면으로 돌아가기 */
  onClickBack: () => void
}

export const SignupStepForm: React.FC<SignupStepFormProps> = ({
  isStudent,
  campus,
  classNumber,
  name,
  mmId,
  campusOptions,
  classOptions,
  canRequestCode,
  onChangeCampus,
  onChangeClass,
  onChangeName,
  onChangeMmId,
  onClickRequestCode,
  onClickBack,
}) => {
  return (
    <>
      {/* 🔙 상단 좌측 뒤로가기 영역 */}
      <StepFormHeader>
        <StepFormBackButton type="button" onClick={onClickBack}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </StepFormBackButton>
      </StepFormHeader>

      <FormContainer>
        {isStudent && (
          <>
            <FieldGroup>
              <FieldLabel htmlFor="campus">캠퍼스</FieldLabel>
              <SelectField
                id="campus"
                value={campus}
                onChange={onChangeCampus}
              >
                <option value="">캠퍼스를 선택해주세요</option>
                {campusOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel htmlFor="classNumber">반</FieldLabel>
              <SelectField
                id="classNumber"
                value={classNumber}
                onChange={onChangeClass}
                disabled={!campus}
              >
                <option value="">반을 선택해주세요</option>
                {classOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}반
                  </option>
                ))}
              </SelectField>
            </FieldGroup>
          </>
        )}

        <FieldGroup>
          <FieldLabel htmlFor="name">성명</FieldLabel>
          <TextField
            id="name"
            value={name}
            onChange={onChangeName}
            placeholder="이름을 입력해주세요"
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="mmId">Mattermost 아이디</FieldLabel>
          <TextField
            id="mmId"
            value={mmId}
            onChange={onChangeMmId}
            placeholder="@ 없이 아이디만 입력해주세요"
          />
        </FieldGroup>

        <NoticeText>
          입력하신 정보로 Mattermost DM을 전송합니다
        </NoticeText>
      </FormContainer>

      <BottomButtonContainer>
        <Button
          width="100%"
          height="52px"
          borderRadius="12px"
          backgroundColor={canRequestCode ? '#2F2F2F' : '#C4C4C4'}
          color="#FFFFFF"
          _hover={{
            backgroundColor: canRequestCode ? '#1f1f1f' : '#C4C4C4',
          }}
          disabled={!canRequestCode}
          onClick={onClickRequestCode}
        >
          인증코드 받기
        </Button>
      </BottomButtonContainer>
    </>
  )
}
