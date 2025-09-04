import { ref, ComputedRef, unref, computed, onMounted, watchEffect, watch } from 'vue';
import type { BasicTableProps } from '../types/table.ts';
import type { PaginationProps } from '../types/pagination.ts';
import { isBoolean } from '../../../../../../../MFS-XANGYA3/xy3-mfs-web/src/utils/is';
import { APISETTING } from '../const.ts';

export function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  { getPaginationInfo, setPagination, setLoading, tableData },
  emit,
) {
  const dataSourceRef = ref<Recordable[]>([]);
  const pramsOpt = ref<any>();

  watchEffect(() => {
    tableData.value = unref(dataSourceRef);
  });

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource }: any = unref(propsRef);
      dataSource && (dataSourceRef.value = dataSource);
    },
    {
      immediate: true,
    },
  );

  const getRowKey = computed(() => {
    const { rowKey }: any = unref(propsRef);
    return rowKey
      ? rowKey
      : () => {
          return 'key';
        };
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  async function fetch(opt?) {
    try {
      setLoading(true);
      const { request, pagination }: any = unref(propsRef);
      if (!request) return;
      //组装分页信息
      const pageField = APISETTING.pageField;
      const sizeField = APISETTING.sizeField;
      const totalField = APISETTING.totalField;
      const listField = APISETTING.listField;
      let pageParams = {};
      const { page = 1, pageSize = 10 } = unref(getPaginationInfo) as PaginationProps;
      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt[pageField]) || page;
        pageParams[sizeField] = pageSize;
      }

      const params = {
        ...opt,
        ...pageParams,
      };
      const res = await request(params);
      const resultTotal = res[totalField] || 0;
      const currentPage = res[pageField];
      const resultInfo = res[listField] ? res[listField] : res['data'] ? res['data'] : [];
      // 如果数据异常，需获取正确的页码再次执行
      if (resultTotal) {
        if (page > resultTotal || (resultTotal > 0 && resultInfo.length <= 0)) {
          setPagination({
            page: 1,
          });
          fetch(opt);
        }
      }
      dataSourceRef.value = resultInfo;
      setPagination({
        [pageField]: currentPage,
        [totalField]: resultTotal,
      });
      if (opt && opt[pageField]) {
        setPagination({
          [pageField]: opt[pageField] || 1,
        });
      }
      emit('fetch-success', {
        items: unref(resultInfo),
        resultTotal,
      });
    } catch (error) {
      console.error(error);
      emit('fetch-error', error);
      dataSourceRef.value = [];
      // setPagination({
      //   pageCount: 0,
      // });
    } finally {
      setLoading(false);
    }
  }

  onMounted(() => {
    setTimeout(() => {
      fetch();
    }, 16);
  });

  function setTableData(values) {
    dataSourceRef.value = values;
  }

  function getDataSource(): any[] {
    return getDataSourceRef.value;
  }

  async function reload(opt?) {
    if (opt) {
      pramsOpt.value = opt;
      await fetch(opt);
    } else {
      await fetch(pramsOpt.value);
    }
  }

  return {
    fetch,
    getRowKey,
    getDataSourceRef,
    getDataSource,
    setTableData,
    reload,
  };
}
