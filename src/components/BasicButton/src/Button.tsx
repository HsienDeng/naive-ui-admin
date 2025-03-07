import { defineComponent, SetupContext, Component } from 'vue';
import { NButton, NIcon } from 'naive-ui';

export interface NIconType {
  color?: string;
  depth?: 1 | 2 | 3 | 4 | 5;
  size?: string | number;
}

const buttonProps = {
  ...NButton.props,
  // 传入icon组件, 动态渲染
  icon: Object as PropType<Component>,
  iconType: Object as PropType<NIconType>,
};

export default defineComponent({
  name: 'BasicButton',
  props: buttonProps,
  setup(props, { slots }: SetupContext) {
    return () => (
      <NButton
        {...props}
        v-slots={{
          icon: () => props?.icon && <NIcon {...props.iconType}>{props?.icon?.render()}</NIcon>,
        }}
      >
        {slots.default && slots.default()}
      </NButton>
    );
  },
});
