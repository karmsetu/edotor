"use client"
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react';

const LogoutButton = ({children}:{children?: ReactNode}) => {
    const router = useRouter();
    const onLogout = async()=>{
        await signOut()
        router.refresh()
    }
  return (
    <span className='cursor-pointer' onClick={onLogout}>
        {children}
    </span>
  )
}

export default LogoutButton
