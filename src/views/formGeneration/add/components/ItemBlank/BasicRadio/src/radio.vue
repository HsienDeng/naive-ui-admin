<!--
 * @Author: Coder Derek
 * @File: radio.vue
 * @Software: WebStorm
 * @Description: 题型：单选
-->
<template>
  <div class="basic-radio">
    <fieldset>
      <div v-for="(op, index) in options" :key="index" class="content">
        <div
          class="item"
          :class="[
            {
              'is-edit': op['isEditLabel'],
            },
          ]"
        >
          <input
            type="radio"
            :key="op.dictValue"
            :id="op.dictValue"
            name="basic-radio"
            :disabled="true"
            :value="op.dictValue"
          />
          <!--        <label :for="op.dictValue" class="label"></label>-->
          <div class="label" @click="onLabelClick(op)">
            <input v-model="op['dictLabel']" autofocus @focusout="() => onFocusout(op, index)" />
          </div>
        </div>
        <div class="tools">
          <n-space>
            <n-button text type="primary" @click="addCurrentRadio(index)" />
            <n-button text type="error" @click="deleteRadio(index)" />
            <n-checkbox v-model:checked="op['isReal']" @change="(e) => onRealChange(e, op)"> 正确答案 </n-checkbox>
          </n-space>
        </div>
      </div>
    </fieldset>
  </div>
  <div class="tools">
    <div class="item flex flex-ac">
      <n-button text type="primary" @click="addRadio">添加选项</n-button>
      <n-divider vertical />
      <n-button text @click="batchEditClick">批量编辑</n-button>
    </div>
    <n-checkbox v-model:checked="bolOver" @change="onBolOverChange"> 是否选择错误则无法参与项目招募</n-checkbox>
  </div>

  <BatchEditModal ref="batchEditModalRef" @update:options="batchEditOptionsEvent" />
</template>

<script lang="ts" setup>
  import { ref, defineProps, defineEmits, toRef, Ref } from 'vue';
  import BatchEditModal from '../../modal/BatchEditModal.vue';
  import { QuestionItemType } from '@/types/form-generation';

  const $props = defineProps<{
    element: QuestionItemType;
    value: string;
    options: any[];
  }>();

  const $emit = defineEmits(['update:value', 'update:element']);
  const element = toRef($props, 'element') as Ref<QuestionItemType>;
  const formValue = toRef($props, 'element');
  const options = toRef($props, 'options');
  const bolOver = ref($props.element.bolOver);
  const batchEditModalRef = ref<InstanceType<typeof BatchEditModal>>();

  function batchEditClick() {
    const optionsValue = options.value.map((item: any) => item.dictLabel).join('\n');
    batchEditModalRef.value?.showModal(optionsValue);
  }

  /**
   * 删除选项
   * @param index
   */
  function deleteRadio(index: number) {
    formValue.value.options.splice(index, 1);
  }

  /**
   * 添加当前选项
   * @param index
   */
  function addCurrentRadio(index: number) {
    formValue.value.options.splice(index + 1, 0, {
      dictLabel: '选项' + (options.value.length + 1),
      dictValue: options.value.length + 1,
    });
  }

  function addRadio() {
    formValue.value.options.push({
      dictLabel: '选项' + (options.value.length + 1),
      dictValue: options.value.length + 1,
    });
  }

  /**
   * 批量编辑选项
   * @param e
   */
  function batchEditOptionsEvent(e: any[]) {
    formValue.value.options = e;
  }

  const onLabelClick = (op: any) => {
    if (op) {
      op['isEditLabel'] = true;
    }
  };

  const onFocusout = (op: any, i: number) => {
    if (!op.dictLabel) {
      op.dictLabel = '选项' + i;
    }
    op['isEditLabel'] = false;
  };

  function onBolOverChange(value: boolean) {
    $emit('update:element', {
      ...element.value,
      bolOver: value,
    });
  }

  const onRealChange = (e: any, op: any) => {
    if (e) {
      options.value.forEach((item: any) => {
        if (item.dictValue !== op.dictValue) {
          item['isReal'] = false;
        }
      });
    }
    // $emit('update:value', op.dictValue);
  };
</script>

<style scoped lang="less">
  .basic-radio {
    fieldset {
      margin: 0 !important;
    }

    .content {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 30px;
    }

    .item {
      display: flex;
      align-items: center;
      line-height: 30px;
      border: 1px solid transparent;
      width: 300px;
      height: 100%;
      cursor: text;

      input[type='radio'] {
        width: 16px;
        height: 16px;
      }

      .label {
        display: flex;
        margin-left: 8px;
        min-width: 240px;

        input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: 0 0;
          margin-left: 10px;
        }
      }
    }

    .item:hover,
    .item.is-edit {
      border: 1px solid #cccccc;
    }
  }

  .tools {
    .item {
      margin-bottom: 10px;
    }
  }
</style>
