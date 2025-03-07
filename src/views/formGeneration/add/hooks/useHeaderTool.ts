import { Ref, unref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import { cloneDeep, isEmpty, isObject } from 'lodash';
import { ContentComponent } from '../components/GenerateContentComponent';
import { isString } from 'lodash-es';
import { QuestionItemType, QuestionType, QuestionVo } from '@/types/form-generation';

interface UseHeaderToolProps {
  contentComponentRef: Ref<InstanceType<typeof ContentComponent>>;
  draggedComponentList: Ref<QuestionItemType[]>;
  draggedComponent: Ref<QuestionItemType | Object>;
  draggedIndex: Ref<number>;
}

/**
 * 调查问卷头部工具栏hooks
 */
export function useHeaderTool({
  draggedIndex,
  draggedComponent,
  contentComponentRef,
  draggedComponentList,
}: UseHeaderToolProps) {
  const UUID = ref('');
  const router = useRouter();
  const headerToolLoading = ref(false);
  const message = useMessage();

  /**
   * 处理formValue
   */
  function processingFromFunc() {
    const fromValue = unref(contentComponentRef.value.getFormValue()) as QuestionType;
    const questionItemList = cloneDeep(unref(draggedComponentList)) as any[];
    for (const question of questionItemList) {
      if (question.icon) delete question.icon;
      if (question.rule && isObject(question.rule)) {
        question.rule = JSON.stringify(question.rule);
      }
      if (question.componentProps && isObject(question.componentProps)) {
        question.componentProps = JSON.stringify(question.componentProps);
      }
      // 处理defaultValue, 为数组时转为字符串
      if (question.defaultValue && Array.isArray(question.defaultValue)) {
        question.defaultValue = question.defaultValue.join(',');
      }
      if (question.options) {
        question.options.map((item) => {
          item.dictValue = item.dictValue.toString();
        });
      }
    }
    return {
      ...fromValue,
      template: false,
      questionItemList,
    };
  }

  /**
   * 解析formValue
   */
  function unProcessingFromFunc(fromValue: QuestionVo): QuestionVo {
    if (isEmpty(fromValue)) {
      return JSON.parse(sessionStorage.getItem('generate-from') as string);
    }
    for (const question of fromValue.questionItemList) {
      if (question.rule && isString(question.rule)) {
        question.rule = JSON.parse(question.rule);
      }
      if (question.componentProps && isString(question.componentProps)) {
        question.componentProps = JSON.parse(question.componentProps);
      }
    }
    return {
      questionId: fromValue.questionId,
      questionName: fromValue.questionName,
      questionNameText: fromValue.questionNameText,
      questionRemark: fromValue.questionRemark,
      questionType: fromValue.questionType,
      questionItemList: fromValue.questionItemList,
    };
  }

  /**
   * 设置拖拽list
   */
  function setDraggedComponentList(result) {
    draggedComponentList.value = result.questionItemList;
    draggedComponent.value = result.questionItemList[draggedIndex.value];
  }

  /**
   * 保存问卷
   */
  function saveOrUpdateModal(template = false) {
    const FormData = processingFromFunc();
    FormData.template = template;
    if (!FormData.questionNameText) {
      message.error('问卷名称不能为空');
      return false;
    }
    headerToolLoading.value = true;
  }

  /**
   * 预览
   */
  function handleReviewClick() {
    UUID.value = new Date().getTime().toString();
    const value = cloneDeep(unref(contentComponentRef.value.getFormValue()));
    value['questionItemList'] = unref(draggedComponentList);
    sessionStorage.setItem(UUID.value, JSON.stringify(value));
  }

  /* 返回至上一页 */
  function handleRouterBack() {
    router.go(-1);
  }

  return {
    headerToolLoading,
    handleRouterBack,
    saveOrUpdateModal,
    handleReviewClick,
    unProcessingFromFunc,
    setDraggedComponentList,
  };
}
