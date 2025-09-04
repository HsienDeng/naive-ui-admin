import { nextTick } from 'vue';

/**
 * 处理全局错误
 */
export default {
  errorHandler(err, vm, info) {
    console.error(err, vm, info);
    nextTick(async () => {
      // await webError.postErrorLogs({
      //   errorType: 2, // 错误类型: 1接口报错 2代码报错
      //   message: err.toString(),
      //   source: `组件：${vm.$.vnode.type.__file} \n发生错误：${err} \n所在生命周期：${info}`,
      //   project: 'mfs-web',
      //   error: info,
      // });
    });
  },

  async onerror(message, source, lineno, colno, error) {
    // await webError.postErrorLogs({
    //   errorType: 2, // 错误类型: 1接口报错 2代码报错
    //   message: `错误原因：${message}\n错误URL: ${source}\n错误行号: ${lineno}`,
    //   line: lineno,
    //   column: colno,
    //   error: error,
    //   project: 'mfs-web',
    // });
  },
};
