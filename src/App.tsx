import { useAtom } from 'jotai'
import Router from './routes/Router'
import GlobalStyle from './styles/GlobalStyle'
import Dialog from './components/common/Dialog'
import { dialogAtom } from './store/dialog'
import './styles/fonts.css'
import { createGlobalStyle } from 'styled-components'

const AppBaseTextColor = createGlobalStyle`
  html, body {
    color: #000000;
  }
`

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
      <AppBaseTextColor />
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
