import { computed, ref, Ref, toRaw, unref } from 'vue';
import { FormSchema, FormProps } from '@/components/BaseForm';
import { TableActionType } from '@/components/Table';

interface ISearchFormType {
  tableEl?: Ref<TableActionType> | null;
  searchSubmitFunction?: Function;
  schemas: Ref<FormSchema[]> | FormSchema[];
}

/**
 * 搜索表单hook实现，传入表格ref和表单列配置，返回表单完整配置
 * @param tableEl
 * @param schemas
 * @param searchSubmitFunction
 */
export function useSearchFrom({ tableEl, schemas, searchSubmitFunction }: ISearchFormType) {
  const formValue = ref<any>({});
  const dictDataObj = ref({});

  /**
   * 设置schemas
   */
  function useSchemas() {
    unref(schemas).map((item) => {
      if (item.dictName) {
        item.dictList = dictDataObj.value[item.dictName];
      }
    });
  }

  /**
   * 如果表单中有需要字典，就需要调用此方法
   * @param dictObj
   */
  function setDictDataObj(dictObj: Object) {
    dictDataObj.value = dictObj;
    useSchemas();
  }

  async function searchSubmit<T>(form: T) {
    formValue.value = form;
    // 如果不是table, 就执行自定义的方法
    if (tableEl) {
      tableEl?.value?.reload(toRaw(form));
    } else {
      searchSubmitFunction && searchSubmitFunction(toRaw(form));
    }
  }

  /**
   * Bind options for form
   */
  const getFormOptions = computed((): FormProps => {
    return {
      inline: true,
      searchForm: true,
      showFeedback: false,
      labelWidth: 'auto',
      labelPlacement: 'left',
      labelAlign: 'left',
      submitButtonText: '搜索',
      schemas: unref(schemas),
    };
  });

  return {
    setDictDataObj,
    formValue,
    getFormOptions,
    useSchemas,
    searchSubmit,
    schemas,
  };
}
