import { defineConfig } from 'vite';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  // 生产构建使用相对路径，适配 gh-pages 等子路径部署
  base: './',
  // 开发服务器配置，保持与原 webpack-dev-server 端口一致
  server: {
    port: 8001,
    open: false,
    host: true,
  },
  // 构建配置
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        // 入口文件命名
        entryFileNames: 'assets/[name].[hash:8].js',
        // 分块命名
        chunkFileNames: 'assets/[name].[hash:8].js',
        // 静态资源命名
        assetFileNames: 'assets/[name].[hash:8].[ext]',
        // 手动分包，保留原 webpack 的 vendor 拆包逻辑
        manualChunks: {
          vendor: ['three'],
        },
      },
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
    },
  },
  // CSS 预处理器配置（Vite 内置支持 scss/less）
  css: {
    preprocessorOptions: {
      scss: {
        // 使用 legacy API 避免 sass-embedded 的 EPIPE 问题
        api: 'legacy',
      },
    },
  },
});
