<script setup lang="ts">
  import LayoutSide from './components/Side/index.vue';
  import LayoutHeader from './components/Header/index.vue';
  import { layoutHeaderStyle } from '@/settings/designSetting';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useDesign } from '@/hooks/useDesign';

  const { prefixCls } = useDesign('layout');

  const designSetting = useProjectSettingStore();
</script>

<template>
  <n-layout has-sider position="absolute" :class="[prefixCls, 'h-full']">
    <n-layout-sider
      :class="`${prefixCls}-sider`"
      :collapsed="designSetting.collapsed"
      :native-scrollbar="false"
      bordered
      :width="designSetting.siderWidth"
      :collapsed-width="64"
      show-trigger
      collapse-mode="width"
      @update:collapsed="(event: boolean) => (designSetting.collapsed = event)"
    >
      <LayoutSide :collapsed="designSetting.collapsed" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered :style="layoutHeaderStyle">
        <LayoutHeader />
      </n-layout-header>
      <n-layout-content embedded :native-scrollbar="false" bordered :class="`${prefixCls}-content`">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout';

  .@{prefix-cls} {
    &-content {
      height: calc(100% - 56px);
      box-sizing: border-box;
    }
  }
</style>
