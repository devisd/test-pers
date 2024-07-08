'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('user')

    if (data?.length) {
      setUser(data)
    } else {
      router.push('/auth/')
    }
  }, [router])

  const login = (value) => {
    const data = localStorage.setItem('user', value)
    setUser(data)
    router.push('/')
  }

  const logout = () => {
    router.push('/auth/')
    localStorage.setItem('user', '')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
