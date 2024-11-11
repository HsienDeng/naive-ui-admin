import type { App, Component } from 'vue';
import SvgIcon from '@/components/SvgIcon';

const components: {
  [propName: string]: Component;
} = {
  SvgIcon,
};

/**
 * useAppComponent
 * @description - 挂载全局组件
 */
export default function setupAppComponent(app: App) {
  for (const componentsKey in components) {
    app.component(componentsKey.toString(), components[componentsKey]);
  }
}
