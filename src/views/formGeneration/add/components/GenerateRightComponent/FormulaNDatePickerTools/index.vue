<!--
 * @Author: Coder Derek
 * @File: ndex.vue
 * @Software: WebStorm
 * @Description: descript
-->
<template>
  <div>
    <NDivider>年龄范围限制</NDivider>

    <n-space vertical>
      最小年龄：
      <n-input-number v-model:value="minValue" placeholder="最小" :validator="minValidator" @update:value="onChange" />
      最大年龄：
      <n-input-number v-model:value="maxValue" placeholder="最大" :validator="maxValidator" @update:value="onChange" />
      <n-checkbox :checked="bolOver" @change="onBolOverChange"> 不符合则无法参与该项目招募 </n-checkbox>
    </n-space>

    <NAlert type="warning" title="提示：" style="margin-top: 20px">
      <div>
        <p>1. 最大数和最小数的值必须是数字</p>
        <p>2. 最大数必须大于最小数</p>
        <p>3. 都为0说明不限制</p>
      </div>
    </NAlert>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps, onMounted, ref, toRef } from 'vue';
  import { isNil } from 'lodash';
  import { QuestionItemType } from '@/types/form-generation';

  const $props = defineProps<{
    bolOver?: boolean;
    element: QuestionItemType;
  }>();
  const element = toRef($props, 'element');
  const minValue = ref(0);
  const maxValue = ref(0);
  const $emit = defineEmits(['update:value', 'update:bolOver']);

  function onBolOverChange(value: boolean) {
    $emit('update:bolOver', value);
  }

  // 最小值自定义限制
  const minValidator = (x: number) => {
    // 不能大于maxValue, 可以等于0
    return x <= maxValue.value || x === 0;
  };

  // 最大值自定义限制
  const maxValidator = (x: number) => {
    // 不能小于minValue, 可以等于0
    return x >= minValue.value || x === 0;
  };

  function onChange() {
    const min = minValue.value;
    const max = maxValue.value;
    if (!isNil(max) && !isNil(min)) {
      element.value.formulaStr = `
        return function isBetween(value) {
          return {
            isBetween: value >= ${min} && value <= ${max},
            min: ${min},
            max: ${max}
          };
        };
      `;
    }
  }

  onMounted(() => {
    if (element.value.formulaStr) {
      const isBetweenFunction = new Function(element.value.formulaStr)();
      const result = isBetweenFunction(0);
      if (result) {
        minValue.value = result.min;
        maxValue.value = result.max;
      }
    }
  });
</script>

<style scoped lang="less"></style>
