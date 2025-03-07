<script setup lang="ts">
  import { ref, h, defineComponent, unref } from 'vue';
  import { NModal, NGrid, NIcon, NGi, NScrollbar } from 'naive-ui';
  import * as ionicons5 from '@vicons/ionicons5';

  const showModal = ref(false);
  const selectionIcon = ref('');

  const $emits = defineEmits(['set:selectionIcon']);

  function onPositiveClick() {
    setModal(false);
    $emits('set:selectionIcon', selectionIcon.value);
  }

  function onNegativeClick() {
    setModal(false);
  }

  function setModal(bol: boolean) {
    showModal.value = bol;
  }

  const RenderIcon = defineComponent({
    props: {
      icon: {
        type: Object,
        default: (_) => {},
      },
    },
    setup($props: { icon: Object }) {
      const returnIcon = unref($props.icon);
      return () => h(NIcon, null, { default: () => h(returnIcon) });
    },
  });

  function clickIconItem(iconName) {
    selectionIcon.value = iconName;
    onPositiveClick();
  }

  defineExpose({ setModal });
</script>

<template>
  <NModal
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 60%"
    preset="dialog"
    title="图标选择"
    positive-text="确认"
    negative-text="关闭"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <NScrollbar style="max-height: 600px">
      <NGrid v-if="showModal" :cols="6">
        <NGi v-for="icon in ionicons5" :key="icon.name" :class="['icon-item']" @click="clickIconItem(icon.name)">
          <NIcon size="40">
            <RenderIcon :icon="icon" />
          </NIcon>
          <div>{{ icon.name }}</div>
        </NGi>
      </NGrid>
    </NScrollbar>
  </NModal>
</template>

<style lang="less" scoped>
  .icon-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 115px;
    cursor: pointer;
  }

  .icon-item:hover {
    background-color: #f2f2f2;
  }

  .active-icon-item {
    background-color: #f2f2f2;
  }
</style>
