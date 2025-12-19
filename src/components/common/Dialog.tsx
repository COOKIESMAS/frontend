import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface DialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
}

const DialogOverlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const DialogContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  max-width: 400px;
  min-height: 186px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`

const DialogTitle = styled.h2`
  font-family: 'IM_Hyemin';
  font-size: 20px;
  margin: 8px;
`

const DialogMessage = styled.p`
  margin-bottom: 20px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`

const StyledButton = styled.button`
  font-family: 'Pretendard';
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border: none;
`

const ConfirmButton = styled(StyledButton)`
  background-color: #2f2f2f;
  color: white;
`

const CancelButton = styled(StyledButton)`
  background-color: #d9534f;
  color: white;
`

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = '나가기',
  cancelText = '계속하기',
}) => {
  return (
    <DialogOverlay isOpen={isOpen}>
      <DialogContent>
        <CloseButton onClick={onCancel}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
        <DialogTitle>{title}</DialogTitle>
        {message && <DialogMessage>{message}</DialogMessage>}
        <ButtonGroup>
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
        </ButtonGroup>
      </DialogContent>
    </DialogOverlay>
  )
}

export default Dialog
