<script setup>
import { computed } from 'vue'

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  ctaLabel: {
    type: String,
    default: 'Lihat Semua',
  },
  ctaTo: {
    type: [String, Object],
    default: null,
  },
  showCta: {
    type: Boolean,
    default: true,
  },
})

const linkFor = (item) => {
  if (!item || !item.id) return null
  if (item.id.startsWith('film-') || item.id.startsWith('sport-')) {
    return { name: 'player', params: { id: item.id } }
  }

  if (item.id.startsWith('ebook-')) {
    return { name: 'reader', params: { id: item.id } }
  }

  return null
}
</script>

<template>
  <section :id="sectionId" class="media-shelf">
    <header class="shelf-header">
      <div>
        <h2 class="shelf-title">{{ heading }}</h2>
        <p class="shelf-subtitle">Pilihan terbaik dipilih khusus untuk Anda</p>
      </div>
      <template v-if="showCta">
        <RouterLink v-if="ctaTo" :to="ctaTo" class="shelf-button">{{ ctaLabel }}</RouterLink>
        <button v-else type="button" class="shelf-button">{{ ctaLabel }}</button>
      </template>
    </header>

    <div class="shelf-track" role="list">
      <article v-for="item in items" :key="item.id" class="media-card" role="listitem">
        <RouterLink
          v-if="linkFor(item)"
          :to="linkFor(item)"
          class="card-link"
          :aria-label="item.id && item.id.startsWith('ebook-') ? `Baca ${item.title}` : `Tonton ${item.title}`"
        />
        <figure class="poster-frame">
          <img :src="item.poster" :alt="item.title" class="poster-image" />
          <figcaption class="poster-overlay">
            <p class="overlay-title">{{ item.title }}</p>
            <p class="overlay-meta">
              <span>{{ item.duration }}</span>
              <span class="separator">•</span>
              <span>{{ item.category }}</span>
            </p>
            <p class="overlay-description">{{ item.synopsis }}</p>
          </figcaption>
        </figure>

        <div class="media-info">
          <div class="media-heading">
            <h3 class="media-title">{{ item.title }}</h3>
            <span class="media-rating">{{ item.rating }}</span>
          </div>
          <p class="media-extra">{{ item.category }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.media-shelf {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3.5rem);
}

.shelf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.shelf-title {
  margin: 0;
  font-size: 1.65rem;
}

.shelf-subtitle {
  margin: 0.4rem 0 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.shelf-button {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.55rem 1.35rem;
  border-radius: 999px;
  font-weight: 600;
  transition: background-color 160ms ease, transform 160ms ease;
}

.shelf-button:hover,
.shelf-button:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.shelf-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 260px);
  gap: 1.4rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}

.shelf-track::-webkit-scrollbar {
  height: 6px;
}

.shelf-track::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.shelf-track::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
}

.media-card {
  background: var(--surface-elevated);
  border-radius: 1.1rem;
  overflow: hidden;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  box-shadow: 0 18px 32px -26px rgba(0, 0, 0, 0.75);
  transition: transform 200ms ease, box-shadow 200ms ease;
  position: relative;
}

.media-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 22px 42px -22px rgba(0, 0, 0, 0.8);
}

.card-link {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.poster-frame {
  position: relative;
  margin: 0;
}

.poster-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.poster-overlay {
  position: absolute;
  inset: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.4rem;
  color: var(--text-primary);
  background: linear-gradient(180deg, rgba(5, 7, 13, 0) 20%, rgba(5, 7, 13, 0.88) 100%);
  opacity: 0;
  transition: opacity 160ms ease;
}

.media-card:hover .poster-overlay {
  opacity: 1;
}

.overlay-title {
  margin: 0;
  font-weight: 600;
}

.overlay-meta {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.separator {
  opacity: 0.55;
}

.overlay-description {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(245, 246, 248, 0.85);
}

.media-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem 1.1rem 1.3rem;
}

.media-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.media-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.media-rating {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.8rem;
  font-weight: 600;
}

.media-extra {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .shelf-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .shelf-button {
    width: 100%;
    text-align: center;
  }

  .shelf-track {
    grid-auto-columns: minmax(180px, 220px);
  }
}

@media (max-width: 520px) {
  .media-shelf {
    padding: clamp(1.5rem, 8vw, 2.5rem) clamp(1.1rem, 7vw, 1.8rem);
  }

  .shelf-title {
    font-size: 1.35rem;
  }
}
</style>
