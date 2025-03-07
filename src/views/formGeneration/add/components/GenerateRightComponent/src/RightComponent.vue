<script setup lang="ts">
  import { ref, PropType, unref, Ref, computed } from 'vue';
  import { NCard, NForm, NFormItem, NInput, NDivider } from 'naive-ui';
  import { IconSelectionModal } from '../RightIconSelectionModal';
  import { isEmpty, isArray } from 'lodash';
  import SelectTools from '../SelectTools';
  import NumberInputTools from '../NumberInputTools';
  // import ChildrenComponent from '../ChildrenComponent';
  import CheckBoxTools from '../CheckBoxTools';
  import FormulaNDatePickerTools from '../FormulaNDatePickerTools/index.vue';
  import { QuestionItemType } from '@/types/form-generation';

  const $emits = defineEmits(['update:rightSetDraggedComponent']);
  const $props = defineProps({
    draggedComponent: {
      type: Object as PropType<QuestionItemType>,
      default: () => {},
    },
    draggedComponentList: {
      type: Array as PropType<QuestionItemType[]>,
      default: () => {},
    },
    draggedIndex: {
      type: Number,
      default: 0,
    },
  });

  // formValue
  const formValue = ref({}) as Ref<QuestionItemType>;
  const activeIconPosition = ref('');
  const IconSelectionModalRef = ref<InstanceType<typeof IconSelectionModal>>();
  const selectToolsRef = ref<InstanceType<typeof SelectTools>>();
  const checkBoxToolsRef = ref<InstanceType<typeof CheckBoxTools>>();
  // const childrenComponentRef = ref<InstanceType<typeof ChildrenComponent>>();

  const getProps = computed(() => {
    return {
      ...unref($props),
    };
  });

  /**
   * 输入框失去焦点事件
   * @param keyName
   */
  function inputUpdateKeyEvent(keyName: string): void {
    const cloneDraggedComponent = getProps.value.draggedComponent;
    cloneDraggedComponent[keyName] = formValue.value[keyName];
    $emits('update:rightSetDraggedComponent', cloneDraggedComponent, getProps.value.draggedIndex);
  }

  /**
   * 清空事件
   * @param keyName
   */
  // function clearableHandleClick(keyName: string): void {
  //   formValue.value[keyName] = '';
  //   inputUpdateKeyEvent(keyName);
  // }

  /**
   * 根据value和key更新事件
   */
  function handleUpdateValue(v: any, keyName: string) {
    const cloneDraggedComponent = getProps.value.draggedComponent;
    const slice = keyName.split('.');
    if (slice.length === 1) {
      cloneDraggedComponent[slice[0]] = v;
    } else if (slice.length === 2) {
      cloneDraggedComponent[slice[0]][slice[1]] = v;
    }
    $emits('update:rightSetDraggedComponent', cloneDraggedComponent, getProps.value.draggedIndex);
  }

  function setFormValue(draggedComponent) {
    if (!isEmpty(unref(draggedComponent))) {
      formValue.value = draggedComponent;
      // 切换组件后重新渲染一次外部组件
      // toolsPageReload.value = toolsPageReload.value + 1;
    }
  }

  /**
   * 图标选择事件
   */
  // function addInputIconClick(iconPosition) {
  //   activeIconPosition.value = iconPosition;
  //   IconSelectionModalRef.value?.setModal(true);
  // }

  function selectionIcon(iconName) {
    handleUpdateValue(iconName, activeIconPosition.value);
  }

  function handleNDividerSelect(e, formValue) {
    formValue.componentProps.titlePlacement = e;
  }

  function findNDividerTitlePlacement(key, options) {
    const find = options.find((item) => item.key === key);
    return find.label;
  }

  defineExpose({ setFormValue });
</script>

<template>
  <NCard title="组件属性" class="right-component-container">
    <NDivider />
    <NForm
      v-if="getProps.draggedComponent.component"
      :inline="false"
      :model="formValue"
      labelPlacement="left"
      labelAlign="left"
      :label-width="80"
      :showFeedback="true"
    >
      <!--   分割线工具栏   -->
      <template v-if="formValue.component === 'NDivider'">
        <NFormItem label="是否使用虚线:" label-width="120">
          <n-switch v-model:value="formValue.componentProps['dashed']" />
        </NFormItem>
        <NFormItem label="标题的位置:" label-width="120">
          <n-dropdown trigger="hover" :options="formValue.options" @select="(e) => handleNDividerSelect(e, formValue)">
            <n-button>{{
              findNDividerTitlePlacement(formValue.componentProps['titlePlacement'], formValue.options)
            }}</n-button>
          </n-dropdown>
        </NFormItem>
        <NFormItem label="标题内容:" label-width="120">
          <NInput v-model:value="formValue.componentProps['title']" placeholder="请输入标题内容" clearable />
        </NFormItem>
      </template>
      <!--   数据录用工具栏   -->
      <template v-else>
        <NFormItem path="placeholder" label="占位提示:">
          <NInput
            v-model:value="formValue.placeholder"
            placeholder="请输入提示"
            clearable
            @input="() => inputUpdateKeyEvent('placeholder')"
          />
        </NFormItem>
        <NFormItem path="defaultValue" label="默认值:">
          <NInputNumber
            v-if="formValue.component === 'NInputNumber'"
            v-model:value="formValue.defaultValue"
            placeholder="请输入默认值"
            clearable
            @input="() => inputUpdateKeyEvent('defaultValue')"
          />
          <NInput
            v-else
            v-model:value="formValue.defaultValue"
            placeholder="请输入默认值"
            :disabled="formValue.component !== 'NInput'"
            clearable
            @input="() => inputUpdateKeyEvent('defaultValue')"
          />
        </NFormItem>
        <NFormItem path="disabled" label="是否只读:">
          <NSwitch
            v-model:value="formValue.disabled"
            :checked-value="true"
            :unchecked-value="false"
            @update:value="(e) => handleUpdateValue(e, 'disabled')"
          />
        </NFormItem>
        <NFormItem path="rule.required" label="是否必填:">
          <NSwitch
            v-if="isArray(formValue.rule)"
            v-model:value="formValue.rule[0].required"
            :checked-value="true"
            :unchecked-value="false"
            @update:value="(e) => handleUpdateValue(e, 'rule.required')"
          />
          <NSwitch
            v-else
            v-model:value="formValue.rule.required"
            :checked-value="true"
            :unchecked-value="false"
            @update:value="(e) => handleUpdateValue(e, 'rule.required')"
          />
        </NFormItem>
      </template>
      <!--   数组输入框专属工具栏   -->
      <NumberInputTools
        v-if="formValue.component === 'NInputNumber'"
        :element="formValue"
        @update:form-value="(v, keyName) => handleUpdateValue(v, keyName)"
      />
      <!--   单选框专属工具栏   -->
      <!--   选择框/单选框 专属工具栏(选项)   -->
      <SelectTools
        v-if="['NSelect', 'NRadio', 'NCheckbox'].includes(formValue.component)"
        ref="selectToolsRef"
        :element="formValue"
        @update:form-value-options="(v) => handleUpdateValue(v, 'options')"
        @update:form-dict-name="(v) => handleUpdateValue(v, 'dictName')"
      />
      <!--   多选框选择组件   -->
      <CheckBoxTools
        v-if="['NCheckbox'].includes(formValue.component)"
        ref="checkBoxToolsRef"
        :element="formValue"
        @update:form-value-options="(v) => handleUpdateValue(v, 'options')"
        @update:form-dict-name="(v) => handleUpdateValue(v, 'dictName')"
      />
      <!--   年龄计算   -->
      <FormulaNDatePickerTools
        v-if="formValue.component === 'FormulaNDatePicker'"
        :element="formValue"
        v-model:bolOver="formValue.bolOver"
      />
      <!--   Bmi计算   -->
      <div v-if="formValue.component === 'BMI'" class="bmi">
        <NDivider>BMI值大小限制</NDivider>
        <n-space vertical>
          不能低于：
          <n-input-number v-model:value="formValue.minValue" placeholder="最小" :min="0" :max="200" />
          不能超过：
          <n-input-number v-model:value="formValue.maxValue" placeholder="最大" :min="0" :max="200" />
          <n-checkbox v-model:checked="formValue.bolOver"> 不符合则无法参与该项目招募 </n-checkbox>
        </n-space>
        <NAlert type="warning" title="提示：" style="margin-top: 20px">
          <div>
            <p>1. 值必须是数字</p>
            <p>2. 为0说明不限制</p>
          </div>
        </NAlert>
      </div>
      <!--  下拉框/单选框/多选框子集    -->
      <!--      <ChildrenComponent-->
      <!--        v-if="['NSelect', 'NRadio', 'NCheckbox'].includes(formValue.component)"-->
      <!--        ref="childrenComponentRef"-->
      <!--        :element="formValue"-->
      <!--      />-->

      <!--   TODO: 数据库待设计, 暂时隐藏   -->
      <!--      <NFormItem path="prefixIcon" label="前图标:">-->
      <!--        <NInputGroup>-->
      <!--          <NButton type="info" @click="addInputIconClick('prefixIcon')"> 添加 </NButton>-->
      <!--          <NInput v-model:value="formValue.prefixIcon" placeholder="不可输入，请选择" disabled />-->
      <!--          <NButton type="info" @click="handleUpdateValue('', 'prefixIcon')"> 删除 </NButton>-->
      <!--        </NInputGroup>-->
      <!--      </NFormItem>-->
      <!--      <NFormItem path="prefixIcon" label="后图标:">-->
      <!--        <NInputGroup>-->
      <!--          <NButton type="info" @click="addInputIconClick('suffixIcon')"> 添加 </NButton>-->
      <!--          <NInput v-model:value="formValue.suffixIcon" placeholder="不可输入，请选择" disabled />-->
      <!--          <NButton type="info" @click="handleUpdateValue('', 'suffixIcon')"> 删除 </NButton>-->
      <!--        </NInputGroup>-->
      <!--      </NFormItem>-->
    </NForm>
    <n-empty v-else size="large" description="暂无选中组件" />
    <IconSelectionModal ref="IconSelectionModalRef" @set:selection-icon="selectionIcon" />
  </NCard>
</template>

<style lang="less">
  .right-component-container {
    position: sticky !important;
    top: 0 !important;
    z-index: 20 !important;
    border-bottom: none !important;

    .n-divider:not(.n-divider--vertical) {
      margin-top: 0 !important;
    }
  }
</style>
