<template>
  <div class="select-tools-page">
    <NDivider>选项</NDivider>
    <NDynamicInput
      v-model:value="formValue.options"
      show-sort-button
      placeholder="请输入"
      :on-create="handleCreateFunc"
    >
      <template #default="{ value }">
        <div style="display: flex; align-items: center; width: 100%">
          <NInput v-model:value="value.dictLabel" @input="(e) => handleDictValue(e, value)" />
        </div>
      </template>
    </NDynamicInput>
    <Button text :icon="EditOutlined" @click="handleBatchEditOptions">批量编辑/添加</Button>
    <n-modal
      v-model:show="showBatchEditOptionsModal"
      :mask-closable="false"
      style="width: 600px"
      title="批量编辑/添加"
      preset="dialog"
    >
      <div>
        <p>每一个选项之间使用空格分割，示例：选项一 选项二</p>
        <n-input v-model:value="batchOptions" autosize type="textarea" placeholder="选项一 选项二 选项三" />
      </div>
      <template #action>
        <n-button type="info" @click="submitBatchEditOptions">确认</n-button>
        <n-button @click="cancelBatchEditOptions">取消</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, toRef } from 'vue';
  import { toolsHook } from '../../hooks/toolsHook';
  import { QuestionItemType } from '@/types/form-generation';

  const $emits = defineEmits(['update:formValueOptions', 'update:formDictName']);
  const $props = defineProps<{
    element: QuestionItemType;
  }>();
  const element = toRef($props, 'element');
  const formValue = toRef($props, 'element');
  const pageReload = ref(1);
  const showBatchEditOptionsModal = ref(false);
  const batchOptions = ref('');

  toolsHook({
    element,
    formValue,
    pageReload,
  });

  function handleDictValue(e, value) {
    value['dictValue'] = e;
  }

  /**
   * @description: 提交选项组
   */
  function submitBatchEditOptions() {
    if (batchOptions.value) {
      const optionsArr = batchOptions.value.split(' ');
      formValue.value.options = optionsArr.map((item) => {
        return {
          dictLabel: item,
          dictValue: item,
        };
      });
      showBatchEditOptionsModal.value = false;
    }
  }

  /**
   * @description: 取消批量编辑选项
   */
  function cancelBatchEditOptions() {
    showBatchEditOptionsModal.value = false;
    batchOptions.value = '';
  }

  /**
   * @description: 处理编辑选项数据, 开启模态框
   */
  function handleBatchEditOptions() {
    if (formValue.value.options && formValue.value.options.length > 0) {
      batchOptions.value = formValue.value.options.map((item) => item.dictLabel).join(' ');
    }
    showBatchEditOptionsModal.value = true;
  }

  /**
   * @description: 创建选项组数据
   */
  function handleCreateFunc() {
    if (formValue.value.options && formValue.value.options.length > 0) {
      return {
        dictLabel: '',
        dictValue: (formValue.value.options.length + 1).toString(),
      };
    } else {
      return {
        dictLabel: '',
        dictValue: '1',
      };
    }
  }

  watch(
    formValue,
    () => {
      $emits('update:formValueOptions', formValue.value.options);
    },
    {
      deep: true,
    },
  );
</script>

<style lang="less">
  .select-tools-page {
    .n-tabs-tab {
      background-color: #ffffff !important;
      color: #000000 !important;
    }
    .n-tabs-tab--active {
      background-color: #1890ff !important;
      color: #ffffff !important;
    }
  }
</style>
