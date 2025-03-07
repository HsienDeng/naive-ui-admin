<script setup lang="ts">
  import Draggable from 'vuedraggable';
  import DraggedItemTools from '../DraggedItemTools/ItemTools.vue';
  import { BasicBmi, BasicRadio, BasicCheckBox } from '../../ItemBlank';

  import { cloneDeep } from 'lodash';
  import { ref, unref, computed, defineProps, defineEmits, Ref } from 'vue';
  import { draggedProps } from '../../../config/componentConfig';
  import { contentComponentProps } from './props';
  import { ComponentType } from '@/views/formGeneration/add/types';
  import { MouseMenuDirective } from '@howdyjs/mouse-menu';
  import RichText from '@/components/RichText';
  import { getAssetsImages } from '@/utils/file.ts';
  import { QuestionItemType, QuestionType } from '@/types/form-generation';
  // 表单绑定
  const formValue = ref({}) as Ref<QuestionType>;
  const DraggableRef = ref<InstanceType<typeof Draggable>>();
  const DraggableItemRef = ref();
  const $emits = defineEmits(['update:draggedComponent', 'empty:draggedComponent', 'delete:draggedComponent']);
  const $props = defineProps(contentComponentProps);

  const getProps = computed(() => {
    return { ...unref($props) };
  });

  // emptyImage
  const emptyImages = getAssetsImages('empty.png');

  /**
   * 画布的拖放/改变/clone 的change事件
   * @param e
   */
  function handleDraggedChange(e) {
    // 如果是add
    if ('added' in e) {
      const {
        added: { element, newIndex },
      } = e;
      const cloneElement = cloneDeep(unref(element)) as QuestionItemType;
      if (cloneElement.component !== 'NDivider') {
        cloneElement.field = new Date().getTime().toString();
        if (cloneElement.defaultValue) {
          formValue.value[cloneElement.field.toString()] = cloneElement.defaultValue;
        }
      }
      handleClickCpn(cloneElement, newIndex);
      // 通知父组件
      // $emits('update:draggedComponent', cloneElement, newIndex);
    }
  }

  /**
   * 调用代表通知此组件需要重新计算formValue
   */
  function setFormValue(form?: any): void {
    if (form) {
      formValue.value = form;
    }
    getProps.value.draggedComponentList.forEach((item) => {
      formValue.value[item.field] = item.defaultValue;
    });
  }

  /**
   * 获取表单
   */
  function getFormValue(): any {
    return unref(formValue);
  }

  /**
   * 输入框的change事件
   * @param e
   * @param element
   */
  function inputHandle(e, element: QuestionItemType) {
    if (e === undefined) return;
    $emits('update:draggedComponent', element, getProps.value.draggedIndex);
  }

  /**
   * 组件选中事件
   * @param element
   * @param index
   */
  function handleClickCpn(element, index) {
    $emits('update:draggedComponent', element, index);
  }

  /**
   * 获取组件的props
   * @param schema
   * @returns
   */
  function getComponentProps(schema: QuestionItemType) {
    const cpnProps = schema.componentProps ?? {};
    const component = schema.component;
    return {
      clearable: true,
      disabled: schema.disabled,
      max: schema.maxValue,
      min: schema.minValue,
      placeholder: schema.placeholder ? schema.placeholder : createPlaceholderMessage(unref(component)) + schema.label,
      ...cpnProps,
    };
  }

  /**
   * @description: 生成placeholder
   */
  function createPlaceholderMessage(component: ComponentType) {
    if (component === 'NInput') return '请输入';
    if (['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(component))
      return '请选择';
    return '';
  }

  /* 自定义指令功能区 */
  /* 公共配置 */
  const publicMouseMenuDirectiveOptions = {
    useLongPressInMobile: true,
    menuWrapperCss: {
      background: '#ffffff',
      boxShadow: '0 0 5px #ccc',
    },
    menuItemCss: {
      hoverBackground: '#f5f7fa',
    },
  };

  /* 画布区域鼠标右键自定义指令 */
  const vMouseMenuDirective = MouseMenuDirective;
  const mouseMenuDirectiveOptions = {
    el: DraggableRef.value,
    ...publicMouseMenuDirectiveOptions,
    menuList: [
      {
        label: '清空画布',
        fn: () => {
          $emits('empty:draggedComponent');
        },
      },
    ],
  };

  function updateTitle(htmlVal: string, textVal: string) {
    formValue.value['questionName'] = htmlVal;
    formValue.value['questionNameText'] = textVal;
  }

  function updateMs(e) {
    formValue.value['questionRemark'] = e;
  }

  /**
   * 更新组件的label
   * @param htmlVal
   * @param textVal
   * @param element
   */
  function updateLabelContent(htmlVal: string, textVal: string, element: QuestionItemType) {
    element['label'] = htmlVal;
    element['textLabel'] = textVal;
    $emits('update:draggedComponent', element, getProps.value.draggedIndex);
  }

  /**
   * 删除当前选中元素
   * @param element
   * @param index
   */
  function handleDeleteItem(element: QuestionItemType, index: number) {
    $emits('delete:draggedComponent', element, index);
  }

  /**
   * copy当前元素
   * @param element
   */
  function handleCopyItem(element: QuestionItemType) {
    handleDraggedChange({
      added: {
        element,
        newIndex: getProps.value.draggedIndex + 1,
      },
    });
  }

  defineExpose({ setFormValue, getFormValue });
</script>

<template>
  <NCard id="contentComponentContainer" class="content-component-container h-full">
    <div class="dragged-operation-middle">
      <span style="color: #f70b3c">*</span>
      表单操作不会自动保存! 请点击右上角保存按钮!
    </div>
    <div class="dragged-title">
      <div class="title">
        <RichText
          v-if="formValue.questionName"
          :text-back="true"
          :content="formValue.questionName"
          @update:content="(e1, e2) => updateTitle(e1, e2)"
        />
      </div>
      <div class="remark">
        <RichText v-if="formValue.questionRemark" :content="formValue.questionRemark" @update:content="updateMs" />
      </div>
    </div>
    <n-divider />
    <Draggable
      ref="DraggableRef"
      v-bind="draggedProps"
      :list="getProps.draggedComponentList"
      @change="(e) => handleDraggedChange(e)"
      v-mouse-menu-directive="mouseMenuDirectiveOptions"
    >
      <template #item="{ element, index }">
        <div
          ref="DraggableItemRef"
          :class="[element.field === getProps.draggedComponent?.field && 'active-form-item', 'form-item']"
          @click="handleClickCpn(element, index)"
        >
          <div class="dragged-item-content">
            <!-- 头部执行拖拽的元素开始 -->
            <div class="move dragged-item-content-move"></div>
            <!-- 头部执行拖拽的元素结束 -->
            <!-- 头部编辑元素开始 -->
            <div class="dragged-item-content-edit">
              <DraggedItemTools @copy:item="handleCopyItem(element)" @delete:item="handleDeleteItem(element, index)" />
            </div>
            <!-- 头部编辑元素结束 -->
            <div v-if="!['NDivider'].includes(element.component)" class="dragged-item-content-label">
              <span v-if="element['rule'].required" style="color: red"> * </span>
              <RichText
                :content="element.label"
                :text-back="true"
                class="dragged-item-rich-text"
                @update:content="(e1, e2) => updateLabelContent(e1, e2, element)"
              />
            </div>
            <NSelect
              v-if="element.component === 'NSelect'"
              v-model:value="element.defaultValue"
              v-bind="getComponentProps(element)"
              :options="element.options"
            />
            <NDivider v-else-if="element.component === 'NDivider'" v-bind="getComponentProps(element)">
              {{ element?.componentProps.title }}
            </NDivider>
            <NDatePicker
              v-else-if="['NDatePicker', 'FormulaNDatePicker'].includes(element.component)"
              v-model:formatted-value="element.defaultValue"
              v-bind="getComponentProps(element)"
            />
            <n-radio-group
              v-else-if="element.component === 'NRadio'"
              v-model:value="element.defaultValue"
              name="radiogroup"
            >
              <n-space>
                <n-radio v-for="option in element.options" :key="option.dictValue" :value="option.dictValue">
                  {{ option.dictLabel }}
                </n-radio>
              </n-space>
            </n-radio-group>
            <n-checkbox-group
              v-else-if="element.component === 'NCheckbox'"
              v-model:value="element.defaultValue"
              v-bind="getComponentProps(element)"
            >
              <n-space vertical>
                <n-checkbox
                  v-for="option in element.options"
                  :key="option.dictValue"
                  :value="option.dictValue"
                  :label="option.dictLabel"
                  :disabled="element.disabled"
                />
              </n-space>
            </n-checkbox-group>
            <template v-else-if="element.component === 'NUpload'">
              <NUpload v-bind="getComponentProps(element)">
                <NButton>{{ element.placeholder }}</NButton>
              </NUpload>
            </template>

            <!-- 考试题型 -->
            <!-- 单选 -->
            <template v-else-if="element.component === 'KSNRadio'">
              <BasicRadio
                v-model:value="element.defaultValue"
                :element="element"
                :options="element.options"
                @update:element="(e) => (element = e)"
              />
            </template>
            <!-- 多选 -->
            <template v-else-if="element.component === 'KSNCheckbox'">
              <BasicCheckBox
                v-model:value="element.defaultValue"
                :element="element"
                :options="element.options"
                @update:element="(e) => (element = e)"
              />
            </template>
            <!-- BMI计算 -->
            <template v-else-if="element.component === 'BMI'">
              <BasicBmi v-model:value="element.defaultValue" :element="element" />
            </template>

            <component
              v-else
              v-model:value="element.defaultValue"
              :is="element.component"
              @input="() => inputHandle(element.defaultValue, element)"
              @update:value="() => inputHandle(element.defaultValue, element)"
              v-bind="getComponentProps(element)"
            >
              <template v-if="element.prefixIcon" #prefix>
                <NIcon>{{ element.prefixIcon && element.prefixIcon.render() }}</NIcon>
              </template>
              <template v-if="element.suffixIcon" #suffix>
                <NIcon>{{ element.suffixIcon && element.suffixIcon.render() }}</NIcon>
              </template>
            </component>
          </div>
        </div>
      </template>
    </Draggable>
    <div v-if="getProps.draggedComponentList.length <= 0" class="dragged-empty">
      <NEmpty :show-description="false" :show-icon="false">
        <template #extra>
          <n-image width="500" :src="emptyImages" preview-disabled />
          <div class="dragged-empty-text">从左侧拖动组件开始编辑</div>
        </template>
      </NEmpty>
    </div>
  </NCard>
</template>

<style lang="less">
  @import '../style/index.less';
</style>
