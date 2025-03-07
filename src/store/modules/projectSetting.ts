import { defineStore } from 'pinia';
import { store } from '@/store';
import { appThemeList } from '@/settings/designSetting.ts';
import { LANG_ENUM } from '@/enums/lang';

interface ProjectSettingState {
  // 当前语言
  lang: string;
  // 当前主题色
  themeColor: string;
  // 菜单是否收起
  collapsed: boolean;
  // 是否开启暗黑模式
  darkTheme: boolean;
  // 菜单栏宽度
  siderWidth: number;
}

/**
 * Project setting store
 * @name useProjectSettingStore
 */
export const useProjectSettingStore = defineStore({
  id: 'app-design-setting',
  persist: {
    key: 'app-design-setting',
    storage: localStorage,
  },
  state: (): ProjectSettingState => {
    return {
      lang: LANG_ENUM.Zh,
      themeColor: appThemeList[0],
      collapsed: false,
      darkTheme: false,
      siderWidth: 232,
    };
  },
  actions: {
    /**
     * Set theme color
     * @param themeColor
     */
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor;
    },
    /**
     * Set collapsed
     * @param collapsed
     */
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed;
    },
    /**
     * Set dark theme
     * @param darkTheme
     */
    setDarkTheme(darkTheme: boolean) {
      this.darkTheme = darkTheme;
    },
    // 修改语言
    setLang(lang: string) {
      this.lang = lang;
    },
  },
});

// Without use function
export function useProjectSettingWithOut() {
  return useProjectSettingStore(store);
}
