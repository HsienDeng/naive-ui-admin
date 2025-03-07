import { computed, defineComponent, toRefs } from 'vue';

import './style.css';

/**
 * @description: 图标组件
 * @name: Hyun
 * @param {String} name 图标名称
 * @param {String} color 线条颜色
 * @param {String} fill 填充颜色
 * @param {String | Number} size 图标大小
 * @return {JSX.Element}
 *
 */
export default defineComponent({
  name: 'SvgIcon',
  props: {
    // 图标名称
    name: {
      type: String,
      default: '',
    },
    // 填充颜色
    fill: {
      type: String,
      default: 'none',
    },
    // 线条颜色, 没有设置就默认 currentColor
    color: {
      type: String,
      default: '',
    },
    // 图标大小
    size: {
      type: [String, Number],
      default: '20',
    },
  },
  setup(props) {
    const { size, name, fill, color } = toRefs(props);

    let symbolId = `#icon-${name.value}`;
    const svgKey = computed(() => {
      symbolId = `#icon-${name.value}`;
      return `${name.value}_${size.value}`;
    });

    return () => (
      <div class={['svg-icon', !color.value && 'c-icon']}>
        <svg aria-hidden="true" key={svgKey.value} width={size.value} height={size.value}>
          <use xlinkHref={symbolId} stroke={color.value} fill={fill.value} />
        </svg>
      </div>
    );
  },
});
