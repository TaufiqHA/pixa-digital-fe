<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-main">
      <router-view />
    </main>
    <footer class="site-footer">
      <div class="footer-inner">
        <p class="footer-brand">Pixa Digital</p>
        <p class="footer-text">
          Streaming film, olahraga, dan ebook terbaik dengan kurasi konten lokal dan internasional.
        </p>
        <p class="footer-meta">© {{ new Date().getFullYear() }} Pixa Digital. Semua hak dilindungi.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--app-bg);
}

.page-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.site-footer {
  background: var(--surface-overlay);
  padding: 2.5rem clamp(1.5rem, 5vw, 4rem);
  color: var(--text-secondary);
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  gap: 0.75rem;
  text-align: center;
}

.footer-brand {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.footer-text {
  margin: 0;
  font-size: 0.95rem;
}

.footer-meta {
  margin: 0;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .page-main {
    gap: 1.5rem;
  }

  .site-footer {
    padding: 2rem clamp(1.2rem, 6vw, 2.5rem);
  }
}
</style>
