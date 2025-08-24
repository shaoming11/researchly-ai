"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface User {
  id: string
  email: string
  name: string
  university?: string
  summary?: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, name: string, university?: string, summary?: string) => Promise<boolean>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || '',
          university: session.user.user_metadata?.university,
          summary: session.user.user_metadata?.summary
        })
      }
      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || '',
          university: session.user.user_metadata?.university,
          summary: session.user.user_metadata?.summary
        })
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Sign in error:', error.message)
        return false
      }
      
      return true
      
    } catch (error) {
      console.error('Sign in error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const validateEmail = async (email: string): Promise<boolean> => {
    // Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return false
    }

    try {
      // Check if email domain has MX record (can receive emails)
      const domain = email.split('@')[1]
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`)
      const data = await response.json()
      
      // If MX records exist, domain can receive emails
      return data.Answer && data.Answer.length > 0
    } catch (error) {
      console.warn('Could not validate email domain, proceeding with signup:', error)
      // If validation fails, proceed anyway (network issues, etc.)
      return true
    }
  }

  const signUp = async (email: string, password: string, name: string, university?: string, summary?: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Validate email format and existence
      const isValidEmail = await validateEmail(email)
      if (!isValidEmail) {
        console.error('Invalid or non-existent email address')
        return false
      }
      
      console.log('Attempting signup with:', { email, name, university, summary })
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            university,
            summary
          }
        }
      })
      
      console.log('Signup response:', { data, error })
      console.log('Full error details:', JSON.stringify(error, null, 2))
      
      if (error) {
        console.error('Sign up error code:', error.status)
        console.error('Sign up error message:', error.message)
        console.error('Full error object:', error)
        return false
      }
      
      if (!data.user) {
        console.error('No user returned from signup')
        return false
      }
      
      console.log('Signup successful, user created:', data.user.id)
      return true
      
    } catch (error) {
      console.error('Sign up catch error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
