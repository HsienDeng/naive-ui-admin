import { FormSchema } from '@/components/BaseForm';

/**
 * 表单item构建器
 */
export class FormBuilder {
  schemaList: FormSchema[];

  constructor(defaultSchemaList: FormSchema[] = []) {
    this.schemaList = defaultSchemaList;
  }

  /**
   * 添加输入框
   */
  addInputField() {}

  /**
   * 添加数字输入框
   */
  addNumberField() {}

  /**
   * 添加下拉选择框
   */
  addSelectField(obj: FormSchema) {
    this.schemaList.push(obj);
    return this;
  }

  /**
   * 批量添加表单项
   * @param schemas
   */
  batchAddField(schemas: FormSchema[]) {
    this.schemaList.push(...schemas);
    return this;
  }

  build() {
    // Add a select field
    return this.schemaList;
  }
}
