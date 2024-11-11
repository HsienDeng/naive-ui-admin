import { defineComponent, toRefs } from 'vue';
import { createAppProviderContext } from '@/hooks/core/useAppContext.ts';
import { prefixCls } from '@/settings/designSetting.ts';
import { useMessage } from 'naive-ui';

export default defineComponent({
  props: {
    prefixCls: {
      type: String,
      default: prefixCls,
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props);

    createAppProviderContext({
      prefixCls,
    });

    window['$message'] = useMessage();

    return () => {
      return <>{slots.default && slots.default()}</>;
    };
  },
});
