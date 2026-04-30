import { create } from 'zustand'

/**
 * usePortfolioMode
 * Global state for Dev / 3D mode switching.
 * Drives: Navbar accent color, Hero scene, Work section filter,
 *         cursor style, and particle colors.
 */
const usePortfolioMode = create((set, get) => ({
  // 'dev' | '3d'
  mode: 'dev',

  setMode: (mode) => set({ mode }),

  toggle: () => set((s) => ({ mode: s.mode === 'dev' ? '3d' : 'dev' })),

  isDev: () => get().mode === 'dev',
  is3D:  () => get().mode === '3d',

  // CSS accent token for current mode
  accent: () => get().mode === 'dev' ? 'var(--c-dev)' : 'var(--c-3d)',
  accentClass: () => get().mode === 'dev' ? 'accent-dev' : 'accent-3d',
}))

export default usePortfolioMode
