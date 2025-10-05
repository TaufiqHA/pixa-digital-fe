<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import LandingPublic from '../pages/LandingPublic.vue'

const router = useRouter()
const { isAuthenticated } = useAuth()
const authenticated = computed(() => isAuthenticated.value)

function goToLogin() {
  router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
}

function goToRegister() {
  router.push({ name: 'register', query: { redirect: router.currentRoute.value.fullPath } })
}
</script>

<template>
  <div>
    <slot v-if="authenticated" />

    <LandingPublic v-else />
  </div>
</template>

<style scoped>
.gate-wrapper {
  display: grid;
  place-items: center;
  padding: 3rem clamp(1rem, 6vw, 2rem);
}

.gate-card {
  background: var(--surface-elevated);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 680px;
  text-align: center;
  box-shadow: 0 20px 40px -24px rgba(0,0,0,0.6);
  display: grid;
  gap: 1rem;
}

.gate-title {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.gate-desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 1rem;
}

.gate-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.ghost-button {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-primary);
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
}

.primary-button {
  padding: 0.6rem 1.2rem;
}

@media (max-width: 512px) {
  .gate-card { padding: 1.25rem; }
}
</style>
