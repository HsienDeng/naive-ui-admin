<template>
  <div :key="pageReload">
    <NDivider>可勾选的数量</NDivider>
    <NFormItem path="maxValue" label="最大数：">
      <NInputNumber
        v-model:value="formValue.componentProps['max']"
        @input="() => updateFormValue(formValue.componentProps['max'], 'max')"
        @update-value="() => updateFormValue(formValue.componentProps['max'], 'max')"
      />
    </NFormItem>
    <NFormItem path="minValue" label="最小数：">
      <NInputNumber
        v-model:value="formValue.componentProps['min']"
        @input="() => updateFormValue(formValue.componentProps['min'], 'min')"
        @update-value="() => updateFormValue(formValue.componentProps['min'], 'min')"
      />
    </NFormItem>
    <NAlert type="warning" title="提示：">
      <div>
        <p>1. 最大数和最小数的值必须是数字</p>
        <p>2. 最大数必须大于最小数</p>
        <p>3. 为0说明不限制</p>
      </div>
    </NAlert>
  </div>
</template>

<script setup lang="ts">
  import { toolsHook } from '../../hooks/toolsHook';
  import { defineEmits, defineProps, ref, toRef } from 'vue';

  import { QuestionItemType } from '@/types/form-generation';

  const $props = defineProps<{
    element: QuestionItemType;
  }>();
  const $emits = defineEmits(['update:formValue']);
  const element = toRef($props, 'element');
  const formValue = toRef($props, 'element');
  const pageReload = ref(1);

  function updateFormValue(value: any, e: string) {
    $emits('update:formValue', value, e);
  }

  toolsHook({
    element,
    formValue,
    pageReload,
  });
</script>
