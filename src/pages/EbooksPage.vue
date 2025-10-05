<script setup>
import ContentShelf from '../components/ContentShelf.vue'
import { homeShelves } from '../data/media.js'
import AuthGate from '../components/AuthGate.vue'

const ebookShelf = homeShelves.find((s) => s.id === 'ebooks')
</script>

<template>
  <AuthGate>
    <div class="ebooks-wrapper">
      <section class="ebooks-header">
        <div>
          <h1 class="ebooks-title">Ebook</h1>
          <p class="ebooks-description">Koleksi ebook premium untuk dibaca kapan saja.</p>
        </div>
      </section>

      <div v-if="ebookShelf">
        <ContentShelf :heading="ebookShelf.heading" :section-id="ebookShelf.id" :items="ebookShelf.items" :show-cta="false" />
      </div>
      <p v-else class="empty">Belum ada ebook saat ini.</p>
    </div>
  </AuthGate>
</template>

<style scoped>
.ebooks-wrapper { display: flex; flex-direction: column; gap: 1.25rem; }
.ebooks-header { padding: clamp(1rem, 4vw, 2rem) clamp(1rem, 5vw, 3rem); }
.ebooks-title { margin: 0; font-size: clamp(1.8rem, 4vw, 2.4rem); }
.ebooks-description { margin: 0; color: var(--text-secondary); }
.empty { padding: clamp(1rem, 4vw, 2rem); color: var(--text-secondary); }
</style>
