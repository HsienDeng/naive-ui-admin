<template>
  <div class="tableAction">
    <div class="flex items-center justify-center">
      <NSpace>
        <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
          <Button v-bind="action" class="mx-2">
            {{ action.label }}
          </Button>
        </template>
      </NSpace>
      <n-dropdown
        v-if="dropDownActions && getDropdownList.length"
        trigger="hover"
        :options="getDropdownList"
        @select="select"
      >
        <slot name="more"></slot>
        <n-button v-bind="getMoreProps" class="mx-2" v-if="!$slots.more" icon-placement="right">
          <div class="flex items-center">
            <span>{{ dropDownActionText }}</span>
            <n-icon size="14" class="ml-1">
              <DownOutlined />
            </n-icon>
          </div>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed, toRaw } from 'vue';
  import { ActionItem } from '@/components/BasicTable';
  import { usePermission } from '../../../../../../../MFS-XANGYA3/xy3-mfs-web/src/hooks/web/usePermission.ts';
  import { isBoolean, isFunction } from '../../../../../../../MFS-XANGYA3/xy3-mfs-web/src/utils/is';
  import { DownOutlined } from '@vicons/antd';
  import { Button } from '../../../../../../../MFS-XANGYA3/xy3-mfs-web/src/components/Button';

  export default defineComponent({
    name: 'TableAction',
    components: { DownOutlined, Button },
    props: {
      actions: {
        type: Array as PropType<ActionItem[]>,
        default: null,
        required: true,
      },
      dropDownActions: {
        type: Array as PropType<ActionItem[]>,
        default: null,
      },
      dropDownActionText: {
        type: String as PropType<String>,
        default: '更多',
      },
      style: {
        type: String as PropType<String>,
        default: 'button',
      },
      select: {
        type: Function as PropType<Function>,
        default: () => {},
      },
    },
    setup(props) {
      const { hasPermission } = usePermission();

      const actionType = props.style === 'button' ? 'default' : props.style === 'text' ? 'primary' : 'default';
      const actionText = props.style === 'button' ? undefined : props.style === 'text' ? true : undefined;

      const getMoreProps = computed(() => {
        return {
          text: actionText,
          type: actionType,
          size: 'small',
        };
      });

      const getDropdownList = computed(() => {
        return (toRaw(props.dropDownActions) || [])
          .filter((action) => {
            return hasPermission(action.auth) && isIfShow(action);
          })
          .map((action) => {
            const { popConfirm } = action;
            return {
              size: 'small',
              text: actionText,
              type: actionType,
              ...action,
              ...popConfirm,
              onConfirm: popConfirm?.confirm,
              onCancel: popConfirm?.cancel,
            };
          });
      });

      function isIfShow(action: ActionItem): boolean {
        const ifShow = action.ifShow;

        let isIfShow = true;

        if (isBoolean(ifShow)) {
          isIfShow = ifShow;
        }
        if (isFunction(ifShow)) {
          isIfShow = ifShow(action);
        }
        return isIfShow;
      }

      const getActions = computed(() => {
        return (toRaw(props.actions) || [])
          .filter((action) => {
            return hasPermission(action.auth) && isIfShow(action);
          })
          .map((action) => {
            const { popConfirm } = action;
            //需要展示什么风格，自己修改一下参数
            return {
              size: 'small',
              text: actionText,
              type: actionType,
              ...action,
              ...(popConfirm || {}),
              onConfirm: popConfirm?.confirm,
              onCancel: popConfirm?.cancel,
              enable: !!popConfirm,
            };
          });
      });

      return {
        getActions,
        getDropdownList,
        getMoreProps,
      };
    },
  });
</script>
