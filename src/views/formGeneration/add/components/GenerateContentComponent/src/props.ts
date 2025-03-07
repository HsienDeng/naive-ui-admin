import { QuestionItemType } from '@/types/form-generation';

export const contentComponentProps = {
  draggedComponent: {
    type: Object as PropType<QuestionItemType>,
  },
  getDraggedComponent: {
    type: Object as PropType<QuestionItemType>,
    default: () => {},
  },
  setDraggedComponent: {
    type: Function,
    default: Function,
  },
  draggedComponentList: {
    type: Array as PropType<QuestionItemType[]>,
    default: () => [],
  },
  setDraggedIndex: {
    type: Function,
    default: Function,
  },
  draggedIndex: {
    type: Number,
    default: 0,
  },
};
