import { FormSchema } from '@/views/generate-low-code/types/from';

export type contentPropsType = {
  formValue: FormSchema;
  draggedComponent: FormSchema;
  getDraggedComponent: FormSchema;
  setDraggedComponent: Function;
  draggedComponentList: FormSchema[];
  draggedIndex: number;
  setDraggedIndex: Function;
};
