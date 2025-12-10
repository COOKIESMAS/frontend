import React from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import SignupFlow from '../components/auth/SignupFlow'

const SignupPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <ChakraProvider value={defaultSystem}>
      <SignupFlow onCompleted={() => navigate('/home')} />
    </ChakraProvider>
  )
}

export default SignupPage
