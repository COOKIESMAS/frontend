import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MakePage from '../pages/MakePage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/make" element={<MakePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
