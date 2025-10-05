<script setup>
defineProps({
  media: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="featured-section" id="beranda">
    <div class="featured-visual">
      <picture class="featured-picture">
        <img
          :src="media.backdrop"
          class="featured-image"
          :alt="`Latar promosi ${media.title}`"
        />
      </picture>
      <div class="featured-overlay"></div>
    </div>

    <div class="featured-details">
      <p class="featured-label">Tontonan Pilihan</p>
      <h1 class="featured-title">{{ media.title }}</h1>
      <p class="featured-meta">
        <span>{{ media.year }}</span>
        <span class="dot">•</span>
        <span>{{ media.duration }}</span>
        <span class="dot">•</span>
        <span>{{ media.rating }}</span>
      </p>
      <p class="featured-description">{{ media.description }}</p>

      <ul class="featured-tags" aria-label="Kategori konten">
        <li v-for="tag in media.tags" :key="tag" class="featured-tag">{{ tag }}</li>
      </ul>

      <div class="featured-actions">
        <button type="button" class="primary-action">Mulai Tonton</button>
        <button type="button" class="secondary-action">
          <svg class="action-icon" viewBox="0 0 24 24" role="presentation">
            <path
              d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1"
              fill="currentColor"
            />
          </svg>
          Simpan ke Koleksi
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-section {
  position: relative;
  display: grid;
  align-items: center;
  min-height: clamp(32rem, 70vh, 44rem);
  overflow: hidden;
  border-radius: 0 0 2.5rem 2.5rem;
}

.featured-visual {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.featured-picture,
.featured-image {
  width: 100%;
  height: 100%;
}

.featured-picture {
  display: block;
}

.featured-image {
  object-fit: cover;
  transform: scale(1.05);
  filter: brightness(0.65);
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(5, 7, 13, 0.85) 20%, rgba(5, 7, 13, 0.35) 55%, rgba(5, 7, 13, 0.9) 100%);
}

.featured-details {
  position: relative;
  padding: clamp(3rem, 8vw, 6.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  max-width: 44rem;
  color: var(--text-primary);
}

.featured-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.featured-label::before {
  content: '';
  width: 44px;
  height: 1px;
  background: var(--accent);
}

.featured-title {
  font-size: clamp(2.6rem, 5vw, 4rem);
  line-height: 1.05;
  margin: 0;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  color: var(--text-secondary);
  font-weight: 500;
}

.dot {
  opacity: 0.45;
}

.featured-description {
  margin: 0;
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 38rem;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.featured-tag {
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.85rem;
}

.featured-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.primary-action {
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.secondary-action {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  transition: background-color 160ms ease, transform 160ms ease;
}

.secondary-action:hover,
.secondary-action:focus-visible {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.secondary-action .action-icon {
  width: 1.1rem;
  height: 1.1rem;
}

@media (max-width: 1024px) {
  .featured-section {
    border-radius: 0 0 1.5rem 1.5rem;
  }

  .featured-details {
    padding: clamp(2.5rem, 9vw, 4rem);
  }
}

@media (max-width: 768px) {
  .featured-section {
    min-height: auto;
  }

  .featured-description {
    font-size: 0.95rem;
  }

  .featured-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .featured-details {
    padding: clamp(2rem, 10vw, 3rem);
  }

  .featured-title {
    font-size: clamp(2.1rem, 7vw, 2.8rem);
  }
}
</style>
