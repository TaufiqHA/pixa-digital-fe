<script setup>
import { computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeShelves, filmCollections } from '../data/media.js'

const router = useRouter()
const route = useRoute()

// Gabungkan semua item dari rak dan koleksi
const allMedia = computed(() => {
  const fromHome = homeShelves.flatMap((shelf) => shelf.items ?? [])
  const fromCollections = filmCollections.flatMap((collection) => collection.items)
  return [...fromHome, ...fromCollections]
})

// Cari media berdasarkan ID dari route params
const media = computed(() => allMedia.value.find((m) => m.id === route.params.id))

// Bangun URL stream berdasarkan ID media
const videoSrc = computed(() => {
  const mediaId = route.params.id
  if (mediaId) {
    return `http://localhost:8000/api/stream/3/?`
  }
  // Fallback ke contoh ID jika tidak ada
  return 'http://localhost:8000/api/stream/3/?'
})

let hls = null

/**
 * Inisialisasi pemutar HLS
 * Mendukung browser dengan hls.js atau native HLS (Safari)
 */
const initializeHLS = () => {
  const video = document.getElementById('video')
  if (!video) return

  // Reset sumber video sebelumnya
  video.src = ''
  video.load()

  const src = videoSrc.value

  try {
    if (window.Hls && window.Hls.isSupported()) {
      // Gunakan hls.js untuk browser modern (Chrome, Firefox, Edge)
      hls = new window.Hls({
        startPosition: 0,
        // Tambahkan konfigurasi opsional di sini
      })

      hls.loadSource(src)
      hls.attachMedia(video)

      hls.on(window.Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log('Stream HLS berhasil dimuat, mulai putar...', data)
        video.play().catch(error =>
          console.warn('Autoplay diblokir oleh browser:', error.message)
        )
      })

      hls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case 'network_error':
              console.error('Kesalahan jaringan HLS:', data)
              hls.startLoad()
              break
            case 'media_error':
              console.error('Kesalahan media HLS:', data)
              hls.recoverMediaError()
              break
            default:
              console.error('Kesalahan fatal HLS:', data)
              hls.destroy()
              break
          }
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari (iOS/macOS): dukungan native HLS
      video.src = src
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(error =>
          console.warn('Autoplay diblokir oleh Safari:', error.message)
        )
      })
    } else {
      // Browser tidak mendukung HLS
      alert('Browser Anda tidak mendukung pemutaran HLS. Gunakan Chrome, Firefox, atau Safari.')
    }
  } catch (err) {
    console.error('Gagal inisialisasi HLS:', err)
  }
}

/**
 * Muat script hls.js secara dinamis jika belum tersedia
 */
onMounted(() => {
  const loadHLS = () => {
    if (typeof window.Hls === 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest' // ❗ Perhatikan: tanpa spasi
      script.crossOrigin = 'anonymous'
      script.onload = () => {
        console.log('hls.js berhasil dimuat')
        initializeHLS()
      }
      script.onerror = () => {
        console.error('Gagal memuat hls.js dari CDN')
        alert('Gagal memuat pemutar video. Periksa koneksi internet Anda.')
      }
      document.head.appendChild(script)
    } else {
      initializeHLS()
    }
  }

  // Jika media belum tersedia, tunggu nextTick agar reactive
  if (!media.value) {
    nextTick(loadHLS)
  } else {
    loadHLS()
  }
})

/**
 * Update player saat videoSrc berubah (misal: ganti episode/film)
 */
watch(videoSrc, () => {
  if (hls) {
    hls.destroy()
    hls = null
  }
  nextTick(initializeHLS)
})

/**
 * Bersihkan instance HLS saat komponen di-unmount
 */
onUnmounted(() => {
  if (hls) {
    hls.destroy()
    hls = null
  }
})

/**
 * Kembali ke halaman sebelumnya atau ke daftar film
 */
const handleBack = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push({ name: 'films' })
  }
}
</script>

<template>
  <div class="player-layout" v-if="media">
    <!-- Header dengan tombol kembali -->
    <div class="player-header">
      <button type="button" class="back-button" @click="handleBack" aria-label="Kembali ke daftar film">
        <svg class="back-icon" viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
        </svg>
        Kembali
      </button>
    </div>

    <!-- Area pemutar video -->
    <div class="player-stage">
      <video
        id="video"
        class="video-canvas"
        :poster="media.poster"
        controls
        preload="metadata"
        playsinline
      ></video>
    </div>

    <!-- Informasi film -->
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

  <!-- Tampilkan pesan jika media tidak ditemukan -->
  <div v-else class="not-found">
    <p class="not-found-text">Film tidak ditemukan.</p>
    <RouterLink class="link-back" :to="{ name: 'films' }">Kembali ke Daftar Film</RouterLink>
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
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
}

.back-button:hover,
.back-button:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  outline: 2px solid rgba(255, 255, 255, 0.2);
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
  border-radius: 1rem;
}

.player-details {
  display: grid;
  gap: 0.5rem;
  max-width: 60rem;
}

.title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 600;
  color: white;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.dot {
  opacity: 0.45;
}

.synopsis {
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
}

.not-found {
  padding: clamp(2rem, 8vw, 3rem) clamp(1rem, 5vw, 3rem);
  display: grid;
  gap: 1rem;
  text-align: center;
  color: var(--text-primary);
}

.not-found-text {
  margin: 0;
  font-size: 1.2rem;
}

.link-back {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0.55rem 1.35rem;
  border-radius: 999px;
  text-decoration: none;
  margin: 0 auto;
  width: fit-content;
  font-size: 0.95rem;
}

.link-back:hover {
  background: rgba(255, 255, 255, 0.18);
}

@media (max-width: 768px) {
  .player-layout {
    gap: 1rem;
    padding: 1rem;
  }
}
</style>