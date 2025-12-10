import Finish from '@/pages/cookie/Finish'
import Step1MakeCookie from '@/pages/cookie/Step1MakeCookie'
import Step2ChooseReceiver from '@/pages/cookie/Step2ChooseReceiver'
import Step3WriteLetter from '@/pages/cookie/Step3WriteLetter'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cookie">
          {/* /cookie로 들어오면 /cookie/step1로 리다이렉트 */}
          <Route index element={<Navigate to="step1" replace />} />
          <Route path="step1" element={<Step1MakeCookie />} />
          <Route path="step2" element={<Step2ChooseReceiver />} />
          <Route path="step3" element={<Step3WriteLetter />} />
          <Route path="finish" element={<Finish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
