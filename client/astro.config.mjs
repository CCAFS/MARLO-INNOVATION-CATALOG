// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'http://172.30.0.32:8080',
          changeOrigin: true,
          secure: false,
          timeout: 10000, // 10 second timeout
          rewrite: (path) => {
            console.log('Rewriting path:', path);
            return path;
          },
          configure: (proxy, options) => {
            console.log('Proxy configured for /api -> http://172.30.0.32:8080');
            proxy.on('error', (err, req, res) => {
              console.log('❌ Proxy error:', err.message);
              console.log('Request URL:', req.url);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('🚀 Proxying request:', req.method, req.url, '-> http://172.30.0.32:8080' + proxyReq.path);
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('✅ Proxy response:', proxyRes.statusCode, req.url);
            });
          }
        }
      }
    }
  },

  integrations: [vue()]
});
