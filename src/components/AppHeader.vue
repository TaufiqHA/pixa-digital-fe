<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const navLinks = [
  { id: 'films', label: 'Film', to: { name: 'films' } },
  { id: 'sports', label: 'Olahraga', to: { name: 'sports' } },
  { id: 'ebooks', label: 'Ebook', to: { name: 'ebooks' } },
]

const route = useRoute()
const isSolidHeader = ref(false)

const handleScroll = () => {
  isSolidHeader.value = window.scrollY > 40
}

const isLinkActive = (link) => {
  if (!link.to) {
    return false
  }

  if (typeof link.to === 'string') {
    return route.path === link.to
  }

  if (link.to.name) {
    return route.name === link.to.name
  }

  if (link.to.path) {
    if (link.to.hash) {
      return route.path === link.to.path && route.hash === link.to.hash
    }

    return route.path === link.to.path
  }

  return false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['site-header', { 'site-header--solid': isSolidHeader }]">
    <div class="header-inner">
      <RouterLink class="brand-link" :to="{ name: 'home' }">
        <span class="brand-emblem" aria-hidden="true">
          <span class="brand-mark" aria-hidden="true">P</span>
        </span>
        <span class="brand-name">Pixa Digital</span>
      </RouterLink>

      <nav class="primary-nav" aria-label="Navigasi utama">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.id" class="nav-item">
            <RouterLink
              class="nav-link"
              :class="{ 'nav-link--active': isLinkActive(link) }"
              :to="link.to"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="header-actions">
        <form class="search-form" role="search">
          <label class="visually-hidden" for="header-search">Cari konten</label>
          <input
            id="header-search"
            class="search-input"
            type="search"
            aria-label="Cari film, olahraga, atau ebook"
          />
          <button type="submit" class="search-button" aria-label="Mulai pencarian">
            <svg class="search-icon" viewBox="0 0 24 24" role="presentation">
              <path
                d="M15.5 14h-.79l-.28-.27a6 6 0 1 0-.71.71l.27.28v.79l5 5 1.5-1.5zM10.5 15a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9"
                fill="currentColor"
              />
            </svg>
          </button>
        </form>

        <div class="profile-pill" aria-label="Profil pengguna Anindya">
          <span class="profile-initials">AN</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(180deg, rgba(5, 7, 13, 0.9), rgba(5, 7, 13, 0));
  transition: background-color 220ms ease, backdrop-filter 220ms ease;
}

.site-header--solid {
  background: rgba(5, 7, 13, 0.92);
  backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem clamp(1.5rem, 2vw, 3.5rem);
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.brand-emblem {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.5rem;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  box-shadow: 0 12px 24px -18px var(--accent-glow);
}

.brand-symbol {
  width: 1.65rem;
  height: 1.65rem;
}

.brand-mark {
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 1;
  color: currentColor;
}

.brand-name {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.primary-nav {
  flex: 1;
  margin-left: 2rem;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 160ms ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: var(--text-primary);
}

.nav-link--active {
  color: var(--text-primary);
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  transition: background-color 160ms ease;
}

.search-form:focus-within {
  background: rgba(255, 255, 255, 0.12);
}

.search-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  min-width: 11rem;
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
}

.search-button {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: transparent;
  color: var(--text-primary);
  padding: 0;
  transition: color 160ms ease;
}

.search-button:hover,
.search-button:focus-visible {
  color: var(--accent);
}

.search-icon {
  width: 1.1rem;
  height: 1.1rem;
}

.profile-pill {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--surface-elevated);
  color: var(--text-primary);
  font-weight: 600;
  letter-spacing: 0.08em;
}

.profile-initials {
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .nav-list {
    gap: 1rem;
  }

  .search-input {
    min-width: 8rem;
  }
}

@media (max-width: 768px) {
  .header-inner {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .primary-nav {
    order: 3;
    width: 100%;
    margin: 0;
  }

  .nav-list {
    justify-content: space-between;
  }

  .header-actions {
    margin-left: auto;
  }

  .search-form {
    display: none;
  }
}

@media (max-width: 512px) {
  .brand-link {
    font-size: 1rem;
  }

  .profile-pill {
    width: 2.1rem;
    height: 2.1rem;
  }
}
</style>
