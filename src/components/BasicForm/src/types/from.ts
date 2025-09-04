import { ComponentType } from './index';
import { ButtonProps } from 'naive-ui/lib/button';
import { CSSProperties } from 'vue';
import { DictType } from '@/types/system/dictType';

type buttonGroupAlignType = 'left' | 'right' | 'center';

type ruleType = {
  required: boolean;
  message: string;
  trigger: string | string[];
  type?: string;
};

/**
 * reference docs: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export type fileMimeType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'application/pdf'
  | 'application/vnd.ms-powerpoint'
  | 'text/plain'
  | 'video/mp4'
  | 'video/ogg'
  | 'video/flv'
  | 'video/avi'
  | 'video/wmv'
  | 'video/rmvb'
  | 'video/mov'
  | 'application/msword';

// TODO: 后期可能需要，暂时不去除
export type reviewFileType = {
  id: string;
  name: string;
  status: 'finished' | 'error' | 'uploading';
  url: string;
};

export interface fileUploadActionType {
  size?: number; // unit: custom
  type?: string[];
}

export interface IEventFunc {
  onChange?: Function;
  onClick?: Function;
  onInput?: Function;
  onUpdate?: Function;
}

export interface FormSchema {
  field: string;
  label: string;
  type?: string;
  labelWidth?: string | number | 'auto';
  labelMessage?: string;
  span?: number;
  labelMessageStyle?: object | string;
  defaultValue?: any;
  component?: ComponentType;
  componentProps?: any;
  componentEvents?: IEventFunc;
  slot?: string;
  childrenSlot?: string;
  rule?: ruleType | ruleType[];
  isFull?: boolean;
  suffix?: string;
  labelPlacement?: string;
  dictName?: string;
  dictList?: DictType[];
  disabled?: boolean;
  showLabel?: boolean;
  showFeedback?: boolean;
  multiple?: boolean;
  notShow?: boolean;
  fileUploadAction?: fileUploadActionType;
  labelAlign?: string;
}

export interface FormProps {
  model?: Recordable;
  labelWidth?: number | string;
  schemas?: FormSchema[];
  inline: boolean;
  showLabel?: boolean;
  searchForm?: boolean; // 是否是搜索表单
  renderLabel?: boolean; // 是否已html方式渲染label
  layout?: string;
  labelAlign?: string;
  size?: string;
  rules?: object | object[];
  labelPlacement: string;
  isFull?: boolean;
  buttonGroupAlign?: buttonGroupAlignType;
  showFeedback?: boolean;
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  resetButtonOptions?: Partial<ButtonProps>;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  submitButtonOptions?: Partial<ButtonProps>;
  submitButtonText?: string;
  resetButtonText?: string;
  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  submitOnReset?: boolean;
  baseGridStyle?: CSSProperties;
}

export interface FormActionType {
  submit: () => Promise<any>;
  setLoadingSub: (bool: Boolean) => void;
  handleReset: () => void;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  clearValidate: (name?: string | string[]) => Promise<void>;
  getFieldsValue: () => Recordable;
  resetFields: () => Promise<void>;
  validate: (nameList?: any[]) => Promise<any>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
