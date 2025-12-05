import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import GoogleConnectingPage from '../pages/GoogleConnectingPage'
import SignupPage from '../pages/SignupPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/google/loading" element={<GoogleConnectingPage />} />
        <Route path="/auth/ssafy" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
