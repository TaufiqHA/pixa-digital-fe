<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const route = useRoute()
const router = useRouter()
const { login } = useAuth()

async function handleSubmit() {
  errorMessage.value = ''
  loading.value = true
  try {
    await login({ email: email.value, password: password.value })
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.replace(redirect)
  } catch (err) {
    errorMessage.value = err?.message || 'Terjadi kesalahan'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Masuk ke Pixa Digital</h1>
        <p class="auth-subtitle">
          Belum punya akun?
          <RouterLink class="inline-link" :to="{ name: 'register' }">Daftar</RouterLink>
        </p>

        <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
          <div class="form-field">
            <label class="field-label" for="email">Email</label>
            <input
              id="email"
              class="text-input"
              type="email"
              autocomplete="email"
              v-model="email"
              required
            />
          </div>

          <div class="form-field">
            <label class="field-label" for="password">Kata sandi</label>
            <input
              id="password"
              class="text-input"
              type="password"
              autocomplete="current-password"
              v-model="password"
              required
            />
          </div>

          <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>

          <div class="form-actions">
            <button class="primary-button" type="submit" :disabled="loading">
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  display: grid;
  place-items: center;
  padding: 2rem clamp(1rem, 5vw, 2rem);
}

.auth-container {
  width: 100%;
  max-width: 420px;
}

.auth-card {
  background: var(--surface-elevated);
  border-radius: 1rem;
  padding: 1.5rem;
  display: grid;
  gap: 1rem;
  box-shadow: 0 20px 40px -24px rgba(0, 0, 0, 0.5);
}

.auth-title {
  margin: 0;
  font-size: 1.4rem;
  color: var(--text-primary);
}

.auth-subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.inline-link {
  color: var(--text-primary);
  text-decoration: underline;
}

.auth-form {
  display: grid;
  gap: 1rem;
}

.form-field {
  display: grid;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.text-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: var(--text-primary);
  padding: 0.75rem 0.9rem;
  border-radius: 0.75rem;
}

.text-input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.form-error {
  margin: 0;
  color: #ff6b6b;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.primary-button {
  width: 100%;
}

@media (max-width: 512px) {
  .auth-card {
    padding: 1.25rem;
    border-radius: 0.85rem;
  }
}
</style>
