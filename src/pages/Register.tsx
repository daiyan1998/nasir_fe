import { RegisterForm } from '@/components/register-form'
import React from 'react'

const Register = () => {
  return (
     <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register