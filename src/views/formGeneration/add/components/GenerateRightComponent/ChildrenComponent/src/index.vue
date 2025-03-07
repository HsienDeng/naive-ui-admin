<template>
  <div class="children-component-page">
    <NDivider>设置子元素</NDivider>
    <NFormItem label="选择子元素:" label-width="120">
      <n-button type="primary" @click="handleSelectChildren"> 点击选择 </n-button>
    </NFormItem>
    <!--  选择框  -->
    <SelectComponentModal ref="selectComponentModalRef" :options="element.options" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { NFormItem } from 'naive-ui';
  import { SelectComponentModal } from '../Modal';
  import { QuestionItemType } from '@/types/form-generation';

  defineOptions({
    name: 'ChildrenComponent',
  });

  const $props = defineProps<{
    element: QuestionItemType;
  }>();
  const element = ref<QuestionItemType>($props.element);
  const selectComponentModalRef = ref<InstanceType<typeof SelectComponentModal>>();

  function handleSelectChildren() {
    selectComponentModalRef.value?.setShowModal();
  }
</script>

<style lang="less" scoped>
  .children-component-page {
    margin-top: 20px;
  }
</style>
