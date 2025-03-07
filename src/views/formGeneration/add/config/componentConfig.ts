/* 基础组件 */
import { ref } from 'vue';
import { QuestionItemType } from '@/types/form-generation';

export type BaseType = {
  title: string;
  config: QuestionItemType[];
};

export const componentConfig = ref<BaseType[]>([
  {
    title: '考试题型',
    config: [
      {
        field: 'baseRadioKs',
        label: '考试单选',
        component: 'KSNRadio',
        placeholder: '',
        defaultValue: '',
        disabled: false,
        componentProps: {},
        rule: { required: true, message: '请选择', trigger: ['change'] },
        options: [
          {
            dictLabel: '选项一',
            dictValue: '1',
            isReal: true,
          },
          {
            dictLabel: '选项二',
            dictValue: '2',
          },
        ],
      },
      {
        field: 'baseRadioKs',
        label: '对错判断',
        component: 'KSNRadio',
        placeholder: '',
        defaultValue: '',
        disabled: false,
        componentProps: {},
        rule: { required: true, message: '请选择', trigger: ['change'] },
        options: [
          {
            dictLabel: '对',
            dictValue: '对',
            isReal: true,
          },
          {
            dictLabel: '错',
            dictValue: '错',
          },
        ],
      },
      {
        field: 'baseCheckboxKs',
        label: '考试多选',
        component: 'KSNCheckbox',
        placeholder: '',
        defaultValue: '',
        disabled: false,
        componentProps: {},
        rule: { type: 'array', required: true, message: '请选择', trigger: ['change'] },
        options: [
          {
            dictLabel: '选项一',
            dictValue: '1',
            isReal: true,
          },
          {
            dictLabel: '选项二',
            dictValue: '2',
          },
        ],
      },
    ],
  },

  {
    title: '数据录入组件',
    config: [
      {
        field: 'baseInput',
        label: '单行文本',
        component: 'NInput',
        placeholder: '请输入',
        disabled: false,
        defaultValue: '',
        componentProps: {},
        rule: { required: true, message: '请输入单行文本', trigger: ['change'] },
      },
      {
        field: 'baseNumberInput',
        label: '数字',
        component: 'NInputNumber',
        placeholder: '请输入',
        disabled: false,
        defaultValue: 0,
        componentProps: {},
        rule: { type: 'number', required: true, message: '请输入数字', trigger: ['change'] },
      },
      {
        field: 'baseTextareaInput',
        label: '多行文本',
        component: 'NInput',
        defaultValue: '',
        componentProps: {
          type: 'textarea',
        },
        placeholder: '请输入',
        disabled: false,
        rule: { required: true, message: '请输入多行文本', trigger: ['change'] },
      },
      {
        field: 'baseElected',
        label: '下拉选择',
        component: 'NSelect',
        defaultValue: null,
        placeholder: '请选择',
        componentProps: {
          filterable: true,
          labelField: 'dictLabel',
          valueField: 'dictValue',
        },
        disabled: false,
        rule: { required: true, message: '请选择', trigger: ['change'] },
      },
      {
        field: 'baseDateSelect',
        label: '日期选择',
        component: 'NDatePicker',
        placeholder: '请选择',
        componentProps: {
          filterable: true,
          type: 'datetime',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
        },
        defaultValue: null,
        disabled: false,
        rule: { required: true, message: '请选择', trigger: ['change'] },
      },
      {
        field: 'baseRadio',
        label: '单选框',
        component: 'NRadio',
        placeholder: '',
        defaultValue: '',
        disabled: false,
        componentProps: {},
        rule: { required: true, message: '请选择', trigger: ['change'] },
        options: [
          {
            dictLabel: '选项一',
            dictValue: '1',
          },
          {
            dictLabel: '选项二',
            dictValue: '2',
          },
        ],
      },
      {
        field: 'baseCheckbox',
        label: '多选框',
        component: 'NCheckbox',
        placeholder: '',
        defaultValue: '',
        disabled: false,
        componentProps: {},
        rule: { type: 'array', required: true, message: '请选择', trigger: ['change'] },
        options: [
          {
            dictLabel: '选项一',
            dictValue: '1',
          },
          {
            dictLabel: '选项二',
            dictValue: '2',
          },
        ],
      },
    ],
  },
]);

/**
 * 参考文档 https://www.itxst.com/sortablejs/neuinffi.html
 */
export const draggedProps = {
  animation: 200,
  group: 'people',
  handle: '.move',
  disabled: false,
  ghostClass: 'ghost',
  class: 'w-full h-full custom-dragged',
  'item-key': 'label',
};
