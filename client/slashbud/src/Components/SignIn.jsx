import React from 'react'
import Register from './Register'
import Login from './Login'

const SignIn = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-600 to-purple-500 ... space ... flex ... justify-around">
        <div class="mt-6 ...">
            <Register />
        </div>
        <div>
            <Login />
        </div>
    </div>
  )
}

export default SignIn