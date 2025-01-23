"use client"

import React from 'react'
import SignUp from '../(components)/SignUp'
import useAuthStore from '@/lib/stores/authStore'
import { useEffect } from 'react'
const page = () => {
  const{register} = useAuthStore(state => state);
  useEffect(() => {
      register();
    }, [])
  return (
    <div className='w-full h-full'><SignUp/></div>
  )
}

export default page