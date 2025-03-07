import { SelectGroupOption, SelectOption } from 'naive-ui';
import { ComponentType } from '@/views/formGeneration/add/types';

export interface QuestionVo extends QuestionType {
  questionItemList: QuestionItemType[];
}

export type ruleType = {
  required: boolean;
  message: string;
  trigger: string | string[];
  type?: string;
};

export interface QuestionItemType {
  questionItemId?: number;
  questionId?: number;
  placeholder: string;
  textLabel?: any;
  field: string | number;
  label: string;
  dictName?: string;
  bolOver?: boolean;
  optionsText?: string;
  options?: Array<SelectOption | SelectGroupOption> | any;
  type?: string;
  labelMessage?: string;
  labelMessageStyle?: object | string;
  defaultValue?: any;
  component: ComponentType;
  maxValue?: number;
  minValue?: number;
  slot?: string;
  rule?: string | ruleType | ruleType[];
  formulaStr?: string;
  required?: boolean;
  isFull?: boolean;
  suffix?: string;
  disabled?: boolean;
  componentProps: object;
  createdByUserId?: number;
  createdTime?: string;
  updatedByUserId?: any;
  updatedTime?: any;
}

export interface QuestionType {
  /** 问卷ID 问卷ID */
  questionId?: number;
  /** 问卷名称 问卷名称 */
  questionName: string;
  /* 问卷名称纯Text */
  questionNameText: string;
  /** 问卷描述 问卷描述 */
  questionRemark: string;

  /**
   *  问卷类型 字典集：
   *    用药问卷 - drug_usage
   *    随访问卷 - mfs_usage
   *    机器问卷 - machine_usage
   */
  questionType?: string;
  /* 问卷可见范围 问卷可见范围 */
  questionVisibleAppKeys?: string;
  /* 是否启用 1为正常，0为停用 */
  isEnable?: number;
  searchValue?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  remark?: any;
  createdByUserId?: number;
  createdTime?: string;
  updatedByUserId?: number;
  updatedTime?: string;
  /* 该问卷是否为模板, 0: 否, 1: 是, 模板不可外部删除 */
  template?: boolean;
}
