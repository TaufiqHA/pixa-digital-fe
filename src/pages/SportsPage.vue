<script setup>
import { ref, computed } from 'vue'
import FeaturedBanner from '../components/FeaturedBanner.vue'
import ContentShelf from '../components/ContentShelf.vue'
import { homeShelves } from '../data/media.js'

const sportsShelf = homeShelves.find((s) => s.id === 'sports')

// derive genres from sports items similar to FilmPage
const genres = computed(() => {
  if (!sportsShelf) return ['Semua']
  const set = new Set(sportsShelf.items.map((i) => i.category || 'Lainnya'))
  return ['Semua', ...Array.from(set)]
})

const selectedGenre = ref(genres.value[0])

const filteredItems = computed(() => {
  if (!sportsShelf) return []
  if (selectedGenre.value === 'Semua') return sportsShelf.items
  const term = selectedGenre.value.toLowerCase()
  return sportsShelf.items.filter((item) => (item.category || '').toLowerCase().includes(term))
})

const handleGenreSelect = (g) => {
  selectedGenre.value = g
}
</script>

<template>
  <div class="sports-wrapper">
    <FeaturedBanner v-if="false" :media="{}" />

    <section class="films-toolbar" aria-label="Filter olahraga">
      <div class="films-heading">
        <h1 class="films-title">Olahraga</h1>
        <p class="films-description">Tonton pertandingan langsung, tayangan ulang, dan sorotan terbaik olahraga dari seluruh Nusantara.</p>
      </div>

      <div class="genre-filters" role="list">
        <button
          v-for="genre in genres"
          :key="genre"
          type="button"
          class="genre-button"
          :class="{ 'genre-button--active': genre === selectedGenre }"
          :aria-pressed="genre === selectedGenre"
          @click="handleGenreSelect(genre)"
        >
          {{ genre }}
        </button>
      </div>
    </section>

    <div v-if="filteredItems.length > 0" class="films-shelves">
      <ContentShelf
        :heading="sportsShelf.heading"
        :section-id="sportsShelf.id"
        :items="filteredItems"
        :show-cta="false"
      />
    </div>
    <p v-else class="films-empty">Tidak ada konten olahraga yang cocok dengan filter saat ini.</p>
  </div>
</template>

<style scoped>
.sports-wrapper { display: flex; flex-direction: column; gap: 2rem; }

.films-toolbar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 clamp(1.5rem, 5vw, 3.5rem);
}

.films-heading { display: flex; flex-direction: column; gap: 0.75rem; }

.films-title { margin: 0; font-size: clamp(2rem, 4vw, 2.8rem); }

.films-description { margin: 0; color: var(--text-secondary); max-width: 46rem; font-size: 1rem; line-height: 1.6; }

.genre-filters { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.genre-button { border: none; border-radius: 999px; padding: 0.5rem 1.3rem; background: rgba(255, 255, 255, 0.08); color: var(--text-primary); font-weight: 500; cursor: pointer; transition: background-color 160ms ease, transform 160ms ease; }

.genre-button:hover,
.genre-button:focus-visible { background: rgba(255, 255, 255, 0.18); transform: translateY(-1px); }

.genre-button--active { background: linear-gradient(135deg, var(--accent), var(--accent-soft)); box-shadow: 0 12px 20px -16px var(--accent-glow); }

.films-shelves { display: flex; flex-direction: column; gap: 1.5rem; }

.films-empty { margin: 0; padding: 0 clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 7vw, 4rem); color: var(--text-secondary); font-size: 1.05rem; }

@media (max-width: 768px) {
  .sports-wrapper { gap: 1.5rem; }

  .films-description { font-size: 0.95rem; }
}
</style>
