import { computed, reactive } from 'vue'

const STORAGE_KEYS = {
  users: 'auth.users',
  currentUser: 'auth.currentUser',
}

const state = reactive({
  users: [],
  currentUser: null,
})

function loadState() {
  try {
    const usersRaw = localStorage.getItem(STORAGE_KEYS.users)
    const currentRaw = localStorage.getItem(STORAGE_KEYS.currentUser)
    state.users = Array.isArray(JSON.parse(usersRaw)) ? JSON.parse(usersRaw) : []
    state.currentUser = currentRaw ? JSON.parse(currentRaw) : null
  } catch {
    state.users = []
    state.currentUser = null
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users))
  localStorage.setItem(
    STORAGE_KEYS.currentUser,
    state.currentUser ? JSON.stringify(state.currentUser) : ''
  )
}

function toHex(buffer) {
  const bytes = new Uint8Array(buffer)
  let hex = ''
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0')
  }
  return hex
}

function simpleHash(input) {
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i)
  }
  return (hash >>> 0).toString(16)
}

async function hashWithSalt(text, salt) {
  const input = `${salt}|${text}`
  try {
    const enc = new TextEncoder()
    const data = enc.encode(input)
    if (crypto && crypto.subtle && crypto.subtle.digest) {
      const digest = await crypto.subtle.digest('SHA-256', data)
      return toHex(digest)
    }
  } catch {
    // fallthrough to simple hash
  }
  return simpleHash(input)
}

function randomSalt(length = 16) {
  try {
    const bytes = new Uint8Array(length)
    crypto.getRandomValues(bytes)
    return toHex(bytes)
  } catch {
    // fallback if crypto not available
    return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  }
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
    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) throw new Error('Email tidak valid')
    if (pw.length < 6) throw new Error('Kata sandi minimal 6 karakter')
    if (pw !== cpw) throw new Error('Konfirmasi kata sandi tidak cocok')

    const exists = state.users.find((u) => u.email === em)
    if (exists) throw new Error('Email sudah terdaftar')

    const salt = randomSalt()
    const hash = await hashWithSalt(pw, salt)

    const userRecord = { name: nm, email: em, salt, hash }
    state.users.push(userRecord)
    state.currentUser = { name: nm, email: em }
    persist()
  }

  async function login({ email, password }) {
    const em = normalizeEmail(email)
    const pw = String(password || '')

    if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) throw new Error('Email tidak valid')
    if (!pw) throw new Error('Kata sandi wajib diisi')

    const user = state.users.find((u) => u.email === em)
    if (!user) throw new Error('Akun tidak ditemukan')

    const hash = await hashWithSalt(pw, user.salt)
    if (hash !== user.hash) throw new Error('Email atau kata sandi salah')

    state.currentUser = { name: user.name, email: user.email }
    persist()
  }

  function logout() {
    state.currentUser = null
    persist()
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
  }
}
