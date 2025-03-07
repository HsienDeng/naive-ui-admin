/**
 * lodash扩展
 */

import { transform, isEqual, isObject } from 'lodash-es';

/**
 * Recursive diff between two object
 * @param  {Object} base   Object to compare with
 * @param  {Object} object Object compared
 * @return {Object} Return a new object who represent the diff OR Return FALSE if there is no difference
 */
export function difference(object, base) {
  function changes(object, base) {
    return transform(object, function (result: any, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}

/**
 * @description: 判断值是否某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function');
}

/**
 * 深度合并object
 * @param src
 * @param target
 * @returns
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
  return /(^http|https:\/\/)/g.test(url);
}
