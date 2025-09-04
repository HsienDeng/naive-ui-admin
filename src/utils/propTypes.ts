/**
 * @description: 在 TypeScript 项目中使用时，通过 .extend() 添加的验证器可能无法通过类型检查。
 *
 * 要向 TypeScript 说明您的自定义验证器，可以使用以下模式：
 * 1. 首先创建一个模块来承载扩展的 VueTypes 对象：
 *  	VueTypesInterface： VueTypes 类定义的接口
 *  	VueTypeValidableDef： validation 对象所需的接口（interface）
 *
 * @date 2022、6/29
 * @example
 */
import { CSSProperties, VNodeChild } from 'vue';
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types';

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

propTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined,
  },
]);
export { propTypes };
