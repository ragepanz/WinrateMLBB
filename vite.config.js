import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.svg'],
            manifest: {
                name: 'MLBB Winrate Tracker',
                short_name: 'WR Tracker',
                description: 'Kalkulator Winrate Mobile Legends Terlengkap',
                theme_color: '#020617',
                background_color: '#020617',
                display: 'standalone',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ],
})
