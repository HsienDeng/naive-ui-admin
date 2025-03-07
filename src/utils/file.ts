/**
 * 根据名称获取本地静态图片
 * @param name
 */
export function getAssetsImages(name) {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
}
