import type { PropType } from 'vue';
import { propTypes } from '../../../../../../MFS-XANGYA3/xy3-mfs-web/src/utils/propTypes.ts';
import { BasicColumn } from './types/table.ts';
import { NDataTable } from 'naive-ui';
export const basicProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props
  title: {
    type: String,
    default: null,
  },
  titleTooltip: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'medium',
  },
  dataSource: {
    type: [Object],
    default: () => [],
  },
  rowKeyName: {
    type: String,
    default: null,
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
    required: true,
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined,
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  // 是否显示序号列条数
  showPagination: {
    type: [String, Boolean],
    default: true,
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0),
  autoHeight: propTypes.bool.def(false),
  showRightTools: propTypes.bool.def(true),
};
