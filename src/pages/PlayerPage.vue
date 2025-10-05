<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeShelves, filmCollections } from '../data/media.js'

const router = useRouter()
const route = useRoute()

const allMedia = computed(() => {
  const fromHome = homeShelves.flatMap((s) => s.items ?? [])
  const fromCollections = filmCollections.flatMap((c) => c.items)
  return [...fromHome, ...fromCollections]
})

const media = computed(() => allMedia.value.find((m) => m.id === route.params.id))

const videoSrc = computed(() => {
  if (media.value && media.value.streamUrl) return media.value.streamUrl
  return 'https://www.w3schools.com/html/mov_bbb.mp4'
})

const handleBack = () => {
  // Prefer going back to films listing
  if (router.options?.history?.state?.back) {
    router.back()
  } else {
    router.push({ name: 'films' })
  }
}
</script>

<template>
  <div class="player-layout" v-if="media">
    <div class="player-header">
      <button type="button" class="back-button" @click="handleBack" aria-label="Kembali ke daftar film">
        <svg class="back-icon" viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
        </svg>
        Kembali
      </button>
    </div>

    <div class="player-stage">
      <video class="video-canvas" :poster="media.poster" :src="videoSrc" controls preload="metadata"></video>
    </div>

    <section class="player-details" aria-label="Detail film">
      <h1 class="title">{{ media.title }}</h1>
      <p class="meta">
        <span>{{ media.duration }}</span>
        <span class="dot">•</span>
        <span>{{ media.rating }}</span>
        <span class="dot">•</span>
        <span>{{ media.category }}</span>
      </p>
      <p class="synopsis">{{ media.synopsis }}</p>
    </section>
  </div>

  <div v-else class="not-found">
    <p class="not-found-text">Konten tidak ditemukan.</p>
    <RouterLink class="link-back" :to="{ name: 'films' }">Kembali ke Film</RouterLink>
  </div>
</template>

<style scoped>
.player-layout {
  display: grid;
  gap: 1.25rem;
  padding: clamp(1rem, 4vw, 2rem) clamp(1rem, 5vw, 3rem) clamp(2rem, 6vw, 3rem);
}

.player-header {
  display: flex;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.back-button:hover,
.back-button:focus-visible {
  background: rgba(255, 255, 255, 0.18);
}

.back-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.player-stage {
  background: var(--surface-elevated);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 18px 32px -26px rgba(0, 0, 0, 0.75);
}

.video-canvas {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
  background: #000;
}

.player-details {
  display: grid;
  gap: 0.5rem;
  max-width: 60rem;
}

.title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  color: var(--text-secondary);
}

.dot { opacity: 0.45; }

.synopsis {
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

.not-found {
  padding: clamp(2rem, 8vw, 3rem) clamp(1rem, 5vw, 3rem);
  display: grid;
  gap: 1rem;
  text-align: center;
}

.not-found-text { margin: 0; }

.link-back {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.55rem 1.35rem;
  border-radius: 999px;
}

@media (max-width: 768px) {
  .player-layout { gap: 1rem; }
}
</style>
