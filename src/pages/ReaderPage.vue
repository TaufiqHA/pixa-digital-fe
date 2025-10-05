<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeShelves } from '../data/media.js'

const route = useRoute()
const router = useRouter()

const ebookShelf = homeShelves.find((s) => s.id === 'ebooks')
const allEbooks = computed(() => ebookShelf?.items ?? [])
const media = computed(() => allEbooks.value.find((m) => m.id === route.params.id))

const reading = ref(false)
const handleBack = () => {
  router.back()
}

const startReading = () => {
  reading.value = true
}
</script>

<template>
  <div v-if="media" class="reader-layout">
    <div class="reader-header">
      <button type="button" class="back-button" @click="handleBack">Kembali</button>
    </div>

    <div class="reader-main">
      <aside class="reader-aside">
        <img :src="media.poster" :alt="media.title" class="book-cover" />
        <h1 class="book-title">{{ media.title }}</h1>
        <p class="book-meta">{{ media.duration }} • {{ media.rating }}</p>
        <p class="book-synopsis">{{ media.synopsis }}</p>
        <button type="button" class="primary-action" @click="startReading">Baca Sekarang</button>
      </aside>

      <section class="reader-content">
        <div v-if="!reading" class="reader-placeholder">
          <p class="hint">Tekan "Baca Sekarang" untuk mulai membaca.</p>
        </div>

        <article v-else class="book-pages">
          <h2 class="chapter">Bab 1</h2>
          <p v-for="n in 12" :key="n">{{ media.synopsis }}</p>
        </article>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Konten ebook tidak ditemukan.</p>
  </div>
</template>

<style scoped>
.reader-layout { display: flex; flex-direction: column; gap: 1rem; padding: clamp(1rem, 4vw, 2rem) clamp(1rem, 5vw, 3rem); }
.reader-header { display: flex; }
.back-button { background: rgba(255,255,255,0.08); padding: 0.5rem 1rem; }

.reader-main { display: flex; gap: 1.5rem; }
.reader-aside { width: 22rem; display: flex; flex-direction: column; gap: 0.75rem; }
.book-cover { width: 100%; border-radius: 0.6rem; object-fit: cover; }
.book-title { margin: 0; font-size: 1.25rem; }
.book-meta { margin: 0; color: var(--text-secondary); }
.book-synopsis { color: var(--text-secondary); }

.reader-content { flex: 1; background: var(--surface-elevated); padding: 1.25rem; border-radius: 0.75rem; min-height: 40vh; }
.reader-placeholder { color: var(--text-secondary); display: grid; place-items: center; height: 100%; }
.book-pages { column-count: 2; column-gap: 2rem; line-height: 1.7; }
.chapter { margin-top: 0; }

@media (max-width: 900px) {
  .reader-main { flex-direction: column; }
  .reader-aside { width: 100%; }
  .book-pages { column-count: 1; }
}
</style>
