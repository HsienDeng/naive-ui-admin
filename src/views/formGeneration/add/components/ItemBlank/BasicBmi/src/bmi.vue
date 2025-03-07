<!--
 * @Author: Coder Derek
 * @File: bmi.vue
 * @Software: WebStorm
 * @Description: descript
-->
<template>
  <n-space vertical>
    <div class="height">
      <span>您的身高是：</span>
      <n-input-number v-model:value="height" clearable :disabled="disabled" style="width: 200px" :show-button="false">
        <template #suffix> cm</template>
      </n-input-number>
    </div>
    <div class="weight">
      <span>您的体重是：</span>
      <n-input-number v-model:value="weight" clearable :disabled="disabled" style="width: 200px" :show-button="false">
        <template #suffix> kg</template>
      </n-input-number>
    </div>
  </n-space>
  <n-el tag="div" style="color: var(--warning-color)" class="bmi"> 您的BMI为：{{ bmi }} </n-el>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps, Ref, ref, toRef, watch } from 'vue';
  import { isNil } from 'lodash';
  import { QuestionItemType } from '@/types/question/QuestionItemType';

  const $props = defineProps<{
    bmi?: any;
    element?: QuestionItemType;
    value?: string | string[];
    disabled?: boolean;
  }>();
  const $emit = defineEmits(['update:value', 'update:bmi']);

  const value = toRef($props, 'value') as Ref<string>;
  const height = ref();
  const weight = ref();
  const bmi = ref(0);

  // 解析value
  if (value.value) {
    const [heightValue, weightValue] = value.value.split(',');
    height.value = heightValue;
    weight.value = weightValue;
  }

  watch(
    [height, weight],
    () => {
      if (!isNil(height.value) && !isNil(weight.value)) {
        const finalValue = Number((Math.floor((weight.value / (height.value / 100) ** 2) * 10) / 10).toFixed(1));
        if (isNaN(finalValue)) {
          bmi.value = 0;
          return;
        }
        bmi.value = finalValue;
      } else {
        bmi.value = 0;
      }
      $emit('update:value', `${height.value || 0},${weight.value || 0}`);
      $emit('update:bmi', bmi.value);
    },
    {
      immediate: true,
    },
  );
</script>

<style scoped lang="less">
  .bmi {
    margin: 10px 0;
    font-size: 16px;
  }
  .height,
  .weight {
    display: flex;
    align-items: center;
  }
</style>
