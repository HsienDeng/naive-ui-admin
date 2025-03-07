import { watch, Ref } from 'vue';
import { QuestionItemType } from '@/types/form-generation';

interface toolsHookType {
  element: Ref<QuestionItemType>;
  formValue: Ref<QuestionItemType>;
  pageReload: Ref<number>;
}

export function toolsHook({ pageReload, formValue, element }: toolsHookType) {
  function updateCurrentFormValue() {
    formValue.value = element.value;
    pageReload.value = pageReload.value + 1;
  }

  watch(element, () => {
    updateCurrentFormValue();
  });

  return {};
}
