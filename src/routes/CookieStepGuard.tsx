import { Navigate, Outlet } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { cookieStepAtom } from '@/store/atoms/cookieStepAtoms'

export default function CookieStepGuard({
  allow,
}: {
  allow: ('step1' | 'step2' | 'step3' | 'finish')[]
}) {
  const step = useAtomValue(cookieStepAtom)

  if (!step || !allow.includes(step)) {
    return <Navigate to="/cookie/step1" replace />
  }

  return <Outlet />
}
