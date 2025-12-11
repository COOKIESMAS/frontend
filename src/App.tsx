import { useAtom } from 'jotai'
import Router from './routes/Router'
import GlobalStyle from './styles/GlobalStyle'
import Dialog from './components/common/Dialog'
import { dialogAtom } from './store/dialog'

function App() {
  const [dialogState, setDialogState] = useAtom(dialogAtom)

  const handleCancel = () => {
    dialogState.onCancel()
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }

  const handleConfirm = () => {
    dialogState.onConfirm()
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <GlobalStyle />
      <Router />
      <Dialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        message={dialogState.message}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
      />
    </>
  )
}

export default App
