import { computed, reactive } from 'vue'
import { authAPI } from '../services/api.js'

const STORAGE_KEYS = {
  currentUser: 'auth.currentUser',
  token: 'auth_token',
}

const state = reactive({
  currentUser: null,
})

function loadState() {
  try {
    const currentRaw = localStorage.getItem(STORAGE_KEYS.currentUser)
    state.currentUser = currentRaw ? JSON.parse(currentRaw) : null
  } catch {
    state.currentUser = null
  }
}

function persist() {
  localStorage.setItem(
    STORAGE_KEYS.currentUser,
    state.currentUser ? JSON.stringify(state.currentUser) : ''
  )
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function getInitials(name, email) {
  const n = String(name || '').trim()
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean)
    const first = parts[0]?.[0] || ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase() || (n[0] || '').toUpperCase()
  }
  const e = normalizeEmail(email)
  return e ? e[0].toUpperCase() : 'U'
}

loadState()

export function useAuth() {
  const isAuthenticated = computed(() => !!state.currentUser)

  async function register({ name, email, password, confirmPassword }) {
    const nm = String(name || '').trim()
    const em = normalizeEmail(email)
    const pw = String(password || '')
    const cpw = String(confirmPassword || '')

    if (!nm) throw new Error('Nama wajib diisi')
    if (!em || !/^[^\s@]+@[^@\s]+\.[^@\s]+$/.test(em)) throw new Error('Email tidak valid')
    if (pw.length < 8) throw new Error('Kata sandi minimal 8 karakter')
    if (pw !== cpw) throw new Error('Konfirmasi kata sandi tidak cocok')

    // Call the API to register the user
    const response = await authAPI.register({ name: nm, email: em, password: pw, password_confirmation: cpw })
    
    // Store the user data and token
    state.currentUser = response.user
    localStorage.setItem(STORAGE_KEYS.token, response.token)
    persist()
  }

  async function login({ email, password }) {
    const em = normalizeEmail(email)
    const pw = String(password || '')

    if (!em || !/^[^\s@]+@[^@\s]+\.[^@\s]+$/.test(em)) throw new Error('Email tidak valid')
    if (!pw) throw new Error('Kata sandi wajib diisi')

    // Call the API to login
    const response = await authAPI.login({ email: em, password: pw })
    
    // Store the user data and token
    state.currentUser = response.user
    localStorage.setItem(STORAGE_KEYS.token, response.token)
    persist()
  }

  async function logout() {
    try {
      // Call the API to logout (revoke the token)
      await authAPI.logout()
    } catch (error) {
      // If logout API call fails, still clear local state
      console.warn('Logout API call failed, but clearing local session', error)
    } finally {
      // Clear the user data and token
      state.currentUser = null
      localStorage.removeItem(STORAGE_KEYS.token)
      localStorage.removeItem(STORAGE_KEYS.currentUser)
    }
  }

  async function fetchUser() {
    try {
      const response = await authAPI.getUser()
      state.currentUser = response
      persist()
      return response
    } catch (error) {
      // If fetching user fails, clear the session
      state.currentUser = null
      localStorage.removeItem(STORAGE_KEYS.token)
      localStorage.removeItem(STORAGE_KEYS.currentUser)
      throw error
    }
  }

  const userInitials = computed(() =>
    state.currentUser ? getInitials(state.currentUser.name, state.currentUser.email) : 'U'
  )

  return {
    currentUser: state,
    isAuthenticated,
    userInitials,
    register,
    login,
    logout,
    fetchUser,
  }
}