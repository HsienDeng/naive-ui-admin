import type { PaginationProps } from '../types/pagination.ts';
import type { BasicTableProps } from '../types/table.ts';
import { computed, unref, ref, ComputedRef } from 'vue';

import { isBoolean } from '../../../../../../../MFS-XANGYA3/xy3-mfs-web/src/utils/is';
import { APISETTING, DEFAULTPAGESIZE, PAGESIZES } from '../const.ts';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);
  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);
    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }
    const { totalField, sizeField } = APISETTING;
    const total = unref(configRef)[totalField];
    const limit = unref(configRef)[sizeField];
    if (refProps.value.showPagination != null && !refProps.value.showPagination) {
      return {
        pageSize: DEFAULTPAGESIZE,
        pageSizes: PAGESIZES,
        showSizePicker: true,
        showQuickJumper: true,
        ...(isBoolean(pagination) ? {} : pagination),
        ...unref(configRef),
        pageCount: computedPageCount(total, limit),
      };
    }
    // 有些接口返回的数据结构不一样，需要自己计算总数
    return {
      pageSize: DEFAULTPAGESIZE,
      pageSizes: PAGESIZES,
      showSizePicker: true,
      showQuickJumper: true,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
      pageCount: computedPageCount(total, limit),

      prefix() {
        return `共 ${total || 0} 条`;
      },
    };
  });

  /**
   * 根据数据条数与每页多少条数据计算页数
   * @param total
   * @param limit
   */
  function computedPageCount(total: number, limit: number): number {
    return total > 0 ? (total < limit ? 1 : total % limit ? parseInt(total / limit) + 1 : total / limit) : 0;
  }

  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }

  function getPagination() {
    return unref(getPaginationInfo);
  }

  function getShowPagination() {
    return unref(show);
  }

  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
}
