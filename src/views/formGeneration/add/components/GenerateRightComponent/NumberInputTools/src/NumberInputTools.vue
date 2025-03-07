<template>
  <div :key="pageReload">
    <NFormItem path="maxValue" label="最大值：">
      <NInputNumber
        v-model:value="formValue.componentProps.max"
        @input="() => updateFormValue(formValue.componentProps.max, 'max')"
        @update-value="() => updateFormValue(formValue.componentProps.max, 'max')"
      />
    </NFormItem>
    <NFormItem path="minValue" label="最小值：">
      <NInputNumber
        v-model:value="formValue.componentProps.min"
        @input="() => updateFormValue(formValue.componentProps.min, 'min')"
        @update-value="() => updateFormValue(formValue.componentProps.min, 'min')"
      />
    </NFormItem>
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
