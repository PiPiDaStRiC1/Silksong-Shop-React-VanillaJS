import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react({
      // CAN AUTO ADD useMemo/useCallback/React.memo THERE IT NEEDS
      // BETTER USE IN BIG PROJECTS ONLY
      // babel: {
      //   plugins: [['babel-plugin-react-compiler']],
      // },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      '@pages': '/src/pages',
      '@libs': '/src/libs'
    },
  }
})
