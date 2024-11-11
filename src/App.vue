<script setup lang="ts">
  import { computed } from 'vue';
  import { darkTheme } from 'naive-ui';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { AppProvider } from '@/components/Application';
  // import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui';

  const settingStore = useProjectSettingStore();
  // 深色主题切换
  const getTheme = computed(() => (settingStore.darkTheme ? darkTheme : undefined));
  // 主题颜色切换
  const themeOverrides = computed(() => {
    const themeColor = settingStore.themeColor;
    return {
      common: {
        primaryColor: themeColor,
        primaryColorHover: themeColor,
        primaryColorPressed: themeColor,
      },
    };
  });
</script>
<!-- :locale="enUS" :date-locale="dateEnUS" -->
<template>
  <NConfigProvider :theme="getTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <AppProvider>
        <router-view />
      </AppProvider>
    </n-message-provider>
  </NConfigProvider>
</template>

<style lang="scss" scoped>
  .n-config-provider {
    height: 100%;
  }
</style>
@/store/modules/projectSetting
