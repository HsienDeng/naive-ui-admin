import { onMounted } from 'vue';

/**
 * 关闭标签页前的提示
 */
export function useBeforeunloadHeader() {
  function beforeunloadHandler(e) {
    e = e || window.event;
    if (e) {
      e.returnValue = '关闭提示';
    }
    return '关闭提示';
  }

  // 页面渲染
  onMounted(() => {
    // 绑定窗口关闭事件
    window.addEventListener('beforeunload', (e) => beforeunloadHandler(e));
  });
}
