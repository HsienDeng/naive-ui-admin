<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" style="width: 600px" title="选择子元素">
    逻辑：选择某个选项，设置需要显示的元素，当用户选择这个值时，显示设置的子元素。
    <n-tabs
      v-model:value="active"
      tab-style="width: 80px;
        display: flex;
        justify-content: center;"
    >
      <n-tab-pane v-for="option in options" :key="option.dictValue" :tab="option.dictValue" :name="option.dictLabel">
        <n-form-item label="选择模板:">
          <n-select
            v-model:vaue="option['childrenItemId']"
            :options="questionTableList"
            label-field="questionNameText"
            value-field="questionId"
            clearable
            filterable
            @change="(e) => handleSelectChange(e, option)"
          />
        </n-form-item>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<script lang="ts" setup>
  // @ts-ignore
  import { ref, Ref } from 'vue';
  import { QuestionType } from '@/types/form-generation';

  const active = ref('');
  const showModal = ref(false);
  const $props = defineProps<{
    options: any;
  }>();
  const options = ref<any>($props.options);
  const questionTableList = ref() as Ref<QuestionType[]>;

  function setShowModal(bol = true) {
    showModal.value = bol;
    if (options.value.length > 0) {
      active.value = options.value[0].dictLabel;
    }
  }

  function handleSelectChange(e, option) {
    option['childrenItemId'] = e;
    option['childrenItemList'] = questionTableList.value.find((item) => item.questionId === e);
  }

  defineExpose({
    setShowModal,
  });
</script>

<style scoped></style>
