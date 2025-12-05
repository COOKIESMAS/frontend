// src/pages/SignupPage.tsx (예시 경로)
import React from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import SignupFlow from '../components/auth/SignupFlow'

const SignupPage: React.FC = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <SignupFlow />
    </ChakraProvider>
  )
}

export default SignupPage
