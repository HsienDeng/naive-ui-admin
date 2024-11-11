import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

import UnoCss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      host: '0.0.0.0',
      port: 8080,
      strictPort: true,
      proxy: {
        [env.VITE_GLOB_API_URL]: {
          target: 'http://localhost:9191',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_GLOB_API_URL), ''),
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
      dedupe: ['vue'],
    },
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
      UnoCss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: ['fill', 'stroke'],
              },
            },
          ],
        },
      }),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: `@import "src/styles/var.less";`,
        },
      },
    },
  };
});
