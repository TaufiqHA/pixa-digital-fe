<script setup>
import { computed, ref } from 'vue'
import FeaturedBanner from '../components/FeaturedBanner.vue'
import ContentShelf from '../components/ContentShelf.vue'
import { filmCollections, filmGenres, filmSpotlight } from '../data/media.js'
import AuthGate from '../components/AuthGate.vue'

const selectedGenre = ref(filmGenres[0])

const filteredCollections = computed(() => {
  if (selectedGenre.value === 'Semua') {
    return filmCollections
  }

  const term = selectedGenre.value.toLowerCase()
  return filmCollections
    .map((collection) => {
      const items = collection.items.filter((item) =>
        item.category.toLowerCase().includes(term)
      )
      return { ...collection, items }
    })
    .filter((collection) => collection.items.length > 0)
})

const handleGenreSelect = (genre) => {
  selectedGenre.value = genre
}
</script>

<template>
  <AuthGate>
    <div class="films-wrapper">
      <FeaturedBanner :media="filmSpotlight" />

      <section class="films-toolbar" aria-label="Filter film">
        <div class="films-heading">
          <h1 class="films-title">Jelajahi Film</h1>
          <p class="films-description">
            Temukan berbagai pilihan film eksklusif, rilisan terbaru, hingga dokumenter inspiratif hanya di Pixa Digital.
          </p>
        </div>

        <div class="genre-filters" role="list">
          <button
            v-for="genre in filmGenres"
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

      <div v-if="filteredCollections.length > 0" class="films-shelves">
        <ContentShelf
          v-for="collection in filteredCollections"
          :key="collection.id"
          :heading="collection.heading"
          :section-id="collection.id"
          :items="collection.items"
          :show-cta="false"
        />
      </div>
      <p v-else class="films-empty">Tidak ada film yang cocok dengan filter saat ini.</p>
    </div>
  </AuthGate>
</template>

<style scoped>
.films-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.films-toolbar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 clamp(1.5rem, 5vw, 3.5rem);
}

.films-heading {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.films-title {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.films-description {
  margin: 0;
  color: var(--text-secondary);
  max-width: 46rem;
  font-size: 1rem;
  line-height: 1.6;
}

.genre-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.genre-button {
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.3rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease, transform 160ms ease;
}

.genre-button:hover,
.genre-button:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.genre-button--active {
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  box-shadow: 0 12px 20px -16px var(--accent-glow);
}

.films-shelves {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.films-empty {
  margin: 0;
  padding: 0 clamp(1.5rem, 5vw, 3.5rem) clamp(2rem, 7vw, 4rem);
  color: var(--text-secondary);
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .films-wrapper {
    gap: 1.5rem;
  }

  .films-description {
    font-size: 0.95rem;
  }
}
</style>
