<script setup>
import { useRouter } from 'vue-router'
import { featuredMedia, homeShelves } from '../data/media.js'
import ContentShelf from '../components/ContentShelf.vue'

const filmsShelf = homeShelves.find((s) => s.id === 'films')
const sportsShelf = homeShelves.find((s) => s.id === 'sports')
const ebooksShelf = homeShelves.find((s) => s.id === 'ebooks')

const router = useRouter()
function goToLogin() {
  router.push({ name: 'login' })
}
function goToRegister() {
  router.push({ name: 'register' })
}
</script>

<template>
  <main class="landing-public">
    <section class="hero-hero" :aria-label="featuredMedia.title">
      <div class="hero-visual" :style="{ backgroundImage: `url(${featuredMedia.backdrop})` }"></div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <p class="hero-kicker">Tontonan Pilihan</p>
        <h1 class="hero-main">{{ featuredMedia.title }}</h1>
        <p class="hero-meta">{{ featuredMedia.year }} • {{ featuredMedia.duration }} • {{ featuredMedia.rating }}</p>
        <p class="hero-desc">{{ featuredMedia.description }}</p>

        <div class="hero-ctas">
          <button class="primary-button primary-cta" @click="goToRegister">Mulai Daftar</button>
          <button class="ghost-button" @click="goToLogin">Sudah punya akun? Masuk</button>
        </div>

        <ul class="hero-tags">
          <li v-for="tag in featuredMedia.tags" :key="tag" class="tag-item">{{ tag }}</li>
        </ul>
      </div>
    </section>

    <section class="latest-shelves">
      <div class="latest-inner">
        <ContentShelf v-if="filmsShelf" :heading="filmsShelf.heading" :section-id="filmsShelf.id" :items="filmsShelf.items.slice(0,6)" :show-cta="true" :cta-to="{ name: 'films' }" />
        <ContentShelf v-if="sportsShelf" :heading="sportsShelf.heading" :section-id="sportsShelf.id" :items="sportsShelf.items.slice(0,6)" :show-cta="false" />
        <ContentShelf v-if="ebooksShelf" :heading="ebooksShelf.heading" :section-id="ebooksShelf.id" :items="ebooksShelf.items.slice(0,6)" :show-cta="false" />
      </div>
    </section>

    <section class="plans-section">
      <div class="plans-inner">
        <header class="plans-header">
          <h2 class="plans-title">Pilih paket langganan</h2>
          <p class="plans-sub">Paket fleksibel untuk kebutuhan hiburanmu. Batalkan kapan saja.</p>
        </header>

        <div class="plans-grid">
          <article class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">Lite</h3>
              <p class="plan-price">Rp35.000<span class="plan-period">/bln</span></p>
            </div>
            <ul class="plan-features">
              <li>Akses film & ebook dasar</li>
              <li>Resolusi hingga 720p</li>
              <li>1 perangkat</li>
            </ul>
            <div class="plan-cta">
              <button class="primary-button" @click="goToRegister">Pilih Lite</button>
            </div>
          </article>

          <article class="plan-card plan-card--popular">
            <div class="plan-badge">Paling populer</div>
            <div class="plan-header">
              <h3 class="plan-name">Standard</h3>
              <p class="plan-price">Rp55.000<span class="plan-period">/bln</span></p>
            </div>
            <ul class="plan-features">
              <li>Akses penuh ke semua koleksi</li>
              <li>Resolusi hingga 1080p</li>
              <li>2 perangkat simultan</li>
            </ul>
            <div class="plan-cta">
              <button class="primary-button primary-cta" @click="goToRegister">Pilih Standard</button>
            </div>
          </article>

          <article class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">Premium</h3>
              <p class="plan-price">Rp85.000<span class="plan-period">/bln</span></p>
            </div>
            <ul class="plan-features">
              <li>Semua fitur Standard</li>
              <li>Resolusi hingga 4K</li>
              <li>4 perangkat & unduhan tak terbatas</li>
            </ul>
            <div class="plan-cta">
              <button class="primary-button" @click="goToRegister">Pilih Premium</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="benefits">
      <div class="benefit">
        <h3 class="benefit-title">Kurikulum Pilihan</h3>
        <p class="benefit-desc">Konten kurasi dari tim kami, termasuk rilisan lokal dan internasional.</p>
      </div>
      <div class="benefit">
        <h3 class="benefit-title">Tonton di Mana Saja</h3>
        <p class="benefit-desc">Akses dari perangkat apa pun, kapan saja.</p>
      </div>
      <div class="benefit">
        <h3 class="benefit-title">Baca Offline</h3>
        <p class="benefit-desc">Unduh ebook untuk dibaca tanpa koneksi.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.landing-public { display: grid; gap: 2rem; padding-bottom: 2.5rem; }

/* Hero full-bleed like a title page */
.hero-hero { position: relative; min-height: clamp(36rem, 75vh, 56rem); overflow: hidden; }
.hero-visual { position: absolute; inset: 0; background-size: cover; background-position: center; filter: brightness(0.6) contrast(1.05); transform: scale(1.02); }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(5,7,13,0.8) 15%, rgba(5,7,13,0.35) 45%, rgba(5,7,13,0.9) 100%); }

.hero-content { position: relative; z-index: 2; max-width: 60rem; padding: clamp(3rem, 8vw, 6.5rem); color: var(--text-primary); display: flex; flex-direction: column; gap: 1rem; }
.hero-kicker { color: var(--text-secondary); letter-spacing: 0.24em; text-transform: uppercase; font-size: 0.85rem; margin: 0 0 0.4rem 0; }
.hero-main { margin: 0; font-size: clamp(2.4rem, 6vw, 4.25rem); line-height: 1.02; }
.hero-meta { margin: 0; color: var(--text-secondary); font-weight: 600; }
.hero-desc { margin: 0; color: var(--text-secondary); max-width: 55ch; font-size: 1.05rem; }

.hero-ctas { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
.hero-tags { display: flex; gap: 0.6rem; list-style: none; padding: 0; margin: 0.5rem 0 0 0; }
.tag-item { padding: 0.35rem 0.8rem; background: rgba(255,255,255,0.06); border-radius: 999px; font-size: 0.85rem; }

/* Plans */
.plans-section { padding: 0 clamp(1rem, 6vw, 2rem); }
.plans-inner { max-width: 1100px; margin: 0 auto; }
.plans-header { text-align: center; margin-bottom: 1rem; }
.plans-title { margin: 0; font-size: 1.4rem; }
.plans-sub { margin: 0; color: var(--text-secondary); }

.plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
.plan-card { background: linear-gradient(180deg, var(--surface-elevated), rgba(255,255,255,0.02)); padding: 1.25rem; border-radius: 0.8rem; position: relative; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 12px 30px -20px rgba(0,0,0,0.6); }
.plan-card--popular { border: 1px solid rgba(229,9,20,0.12); box-shadow: 0 18px 40px -22px var(--accent-glow); transform: translateY(-6px); }
.plan-badge { position: absolute; right: 1rem; top: -0.7rem; background: linear-gradient(135deg, var(--accent), var(--accent-soft)); color: var(--text-primary); padding: 0.3rem 0.6rem; border-radius: 999px; font-weight: 700; font-size: 0.75rem; }

.plan-header { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
.plan-name { margin: 0; font-size: 1.05rem; }
.plan-price { margin: 0; font-size: 1.25rem; font-weight: 700; }
.plan-period { font-size: 0.9rem; font-weight: 400; margin-left: 0.25rem; color: var(--text-secondary); }

.plan-features { margin: 0; padding: 0; list-style: none; color: var(--text-secondary); display: grid; gap: 0.5rem; }
.plan-cta { margin-top: auto; }

/* Benefits (compact) */
.benefits { display: flex; gap: 1rem; padding: 0 clamp(1rem, 6vw, 2rem); }
.benefit { background: var(--surface-elevated); padding: 1rem; border-radius: 0.75rem; flex: 1; }
.benefit-title { margin: 0 0 0.35rem 0; font-size: 1.05rem; }
.benefit-desc { margin: 0; color: var(--text-secondary); font-size: 0.95rem; }

/* Buttons */
.ghost-button { background: transparent; border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); padding: 0.6rem 1.1rem; border-radius: 999px; }
.primary-button { font: inherit; border: none; cursor: pointer; border-radius: 999px; padding: 0.75rem 1.6rem; background: linear-gradient(135deg, var(--accent), var(--accent-soft)); color: var(--text-primary); transition: transform 160ms ease, box-shadow 160ms ease; }
.primary-button:hover { transform: translateY(-1px); box-shadow: 0 12px 24px -12px var(--accent-glow); }
.primary-cta { padding: 0.9rem 1.8rem; font-size: 1.05rem; }

@media (max-width: 1024px) { .plans-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .hero-content { padding: clamp(2rem, 8vw, 3.5rem); } .benefits { flex-direction: column; } }
</style>
