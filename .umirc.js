import { defineConfig } from 'umi';
const { resolve } = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: { immer: true },
  alias: {
    api: resolve(__dirname, './src/service/'),
    components: resolve(__dirname, './src/components'),
    common: resolve(__dirname, './src/common'),
    // config: resolve(__dirname, './src/utils/config'),
    // themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
});
