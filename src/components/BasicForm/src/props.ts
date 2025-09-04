import { PropType } from 'vue';
import { ButtonProps, NForm } from 'naive-ui';
import { FormSchema } from '../src/types/from.ts';
import { propTypes } from '@/utils/propTypes';
import { FormProps } from './types/from';

type placementType = 'left' | 'top';
type labelAlignType = 'left' | 'right';
type buttonGroupAlignType = 'left' | 'right' | 'center';

export const basicProps: PropType<FormProps> = {
  ...NForm.props,
  // 设置默认值
  model: Object,
  // Label weight \ tag weight
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80,
  },
  // 标签的文本对齐方式
  labelAlign: {
    type: String as PropType<labelAlignType>,
    default: 'left',
  },
  // 标签显示的位置
  labelPlacement: {
    type: String as PropType<placementType>,
    default: 'top',
  },
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: (_) => [],
  },
  showFeedback: {
    type: Boolean,
    default: true,
  },
  // 操作按钮位置
  buttonGroupAlign: {
    type: String as PropType<buttonGroupAlignType>,
    default: 'left',
  },
  // 是否显示操作按钮
  showActionButtonGroup: propTypes.bool.def(true),
  // 是否显示重置按钮
  showResetButton: propTypes.bool.def(true),
  // 是否显示提交按钮
  showSubmitButton: propTypes.bool.def(true),
  searchForm: propTypes.bool.def(false),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 确认按钮文字
  submitButtonText: propTypes.string.def('提交'),
  // 重置按钮文字
  resetButtonText: propTypes.string.def('重置'),
};
