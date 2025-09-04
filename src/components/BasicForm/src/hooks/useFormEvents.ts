import { ComputedRef, Ref, toRaw, unref } from 'vue';
import { FormActionType, FormProps, FormSchema } from '../types/from';
import { isFunction } from '@/utils/is';

declare type EmitType = (event: string, ...args: any[]) => void;

export interface IUseFormActionContext {
  $emit: EmitType;
  formModel: Recordable;
  getProps: ComputedRef<FormProps>;
  getSchemas: ComputedRef<FormSchema[]>;
  formElRef: Ref<FormActionType>;
  loadingSub: Ref<boolean>;
  defaultFormModel: Recordable;
  handleFormValues?: Function;
  getValidateForm?: Function;
}

export default function useFormEvents({
  $emit,
  formModel,
  getProps,
  formElRef,
  defaultFormModel,
  handleFormValues,
}: IUseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate();
  }

  //清空校验
  async function clearValidate() {
    try {
      await unref(formElRef)?.clearValidate();
    } catch (e) {}
  }

  /**
   * 获取表单数据 (校验成功才返回)
   * @param e
   */
  async function getValidateForm(e?: Event) {
    e && e.preventDefault();
    const formEl = unref(formElRef);
    if (!formEl) return;
    try {
      await validate();
      return toRaw(unref(formModel));
    } catch (_) {
      console.error('必填项为空！');
    }
  }

  /**
   * 提交表单
   * @param e
   */
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault();
    const { submitFunc } = unref(getProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(formElRef);
    if (!formEl) return;
    try {
      await validate();
      $emit('submit', formModel.value);
    } catch (_) {
      console.error('必填项为空！');
    }
  }

  async function handleReset(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    const formEl = unref(formElRef);
    if (!formEl) return;
    Object.keys(formModel.value).forEach((key) => {
      formModel.value[key] = unref(defaultFormModel)[key] || null;
    });
    await clearValidate();
    const fromValues = handleFormValues && handleFormValues(toRaw(unref(formModel)));
    $emit('reset', fromValues);
    submitOnReset && (await handleSubmit());
  }

  //设置表单字段值
  async function setFieldsValue(values: Recordable): Promise<void> {
    Object.keys(values).forEach((key) => {
      formModel.value[key] = values[key];
    });
  }

  return {
    validate,
    clearValidate,
    handleReset,
    setFieldsValue,
    handleSubmit,
    getValidateForm,
  };
}
