<script setup>
import FeaturedBanner from '../components/FeaturedBanner.vue'
import ContentShelf from '../components/ContentShelf.vue'
import { featuredMedia, homeShelves } from '../data/media.js'
</script>

<template>
  <div class="landing-wrapper">
    <FeaturedBanner :media="featuredMedia" />
    <div class="landing-shelves">
      <ContentShelf
        v-for="section in homeShelves"
        :key="section.id"
        :heading="section.heading"
        :section-id="section.id"
        :items="section.items"
        :cta-to="section.ctaTo"
        :show-cta="section.showCta ?? true"
      />
    </div>
  </div>
</template>

<style scoped>
.landing-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.landing-shelves {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .landing-wrapper {
    gap: 1.5rem;
  }
}
</style>
