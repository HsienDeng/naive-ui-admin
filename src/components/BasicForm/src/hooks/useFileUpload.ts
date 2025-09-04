import { Ref } from 'vue';
import { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';
import { fileUploadActionType, FormSchema } from '@/components/BaseForm';
import { isEmpty } from 'lodash';
import { uploadFileFunc } from '@/api/fileMinio';
import { useMessage } from 'naive-ui';
import type { MessageReactive } from 'naive-ui';

/**
 * 文件上传hook, 用于处理文件上传, baseForm组件中使用
 */
interface IUseFileUpload {
  formModel: Ref<FormSchema>;
  setLoadingSub: Function;
}

export function useFileUpload({ formModel, setLoadingSub }: IUseFileUpload) {
  const message = useMessage();
  let messageReactive: MessageReactive | null = null;

  function setFormLoading(schema: FormSchema) {
    // 通过判断fileList每个对象是否有File，来判断是否正在上传
    setLoadingSub && setLoadingSub(!schema.defaultValue.some((item) => item['fileId']));
  }

  const handleDownload = (file: UploadFileInfo) => {
    console.log(file.name);
  };

  /**
   * 自定义文件上传事件
   * @param action
   * @param schema
   */
  function customFileUploadRequest(action: UploadCustomRequestOptions, schema: FormSchema) {
    if (action.file.file) {
      if (!messageReactive) {
        messageReactive = message.info('文件上传中...');
      }
      setFormLoading(schema);
      uploadFileFunc(action.file.file)
        .then((res) => {
          // 通过文件名字将后端返回的id存入到fileList中
          schema.defaultValue = schema.defaultValue.map((item) => {
            if (item.name === res.data.original) {
              item['fileId'] = res.data.id;
            }
            return item;
          });
          if (messageReactive) {
            messageReactive.content = '文件上传成功';
            messageReactive.type = 'success';
            setTimeout(() => {
              messageReactive && messageReactive.destroy();
            }, 500);
          }
          formModel.value[schema.field] = schema.defaultValue.map((item) => item['fileId']).join(',');
          setFormLoading(schema);
        })
        .catch(() => {
          const file = action.file.file as unknown as UploadFileInfo;
          handleRemoveFile({ file, fileList: schema.defaultValue }, schema);
          if (messageReactive) {
            messageReactive.content = '文件上传失败，请联系管理员解决！';
            messageReactive.type = 'error';
            setTimeout(() => {
              messageReactive && messageReactive.destroy();
            }, 500);
          }
          setFormLoading(schema);
        });
    }
  }

  /**
   * 文件删除回调
   */
  function handleRemoveFile({ file }: { file: UploadFileInfo; fileList: Array<UploadFileInfo> }, schema: FormSchema) {
    // 从fileList中根据id，删除file
    schema.defaultValue = schema.defaultValue.filter((item) => item.id !== file.id);
    formModel.value[schema.field] = schema.defaultValue.map((item) => item['fileId']).join(',');
  }

  /**
   * 文件上传之前的回调
   */
  function beforeFileUpload(
    action: { file: UploadFileInfo; fileList: UploadFileInfo[] },
    fileUploadAction: fileUploadActionType = {},
    schema: FormSchema,
  ) {
    if (!action.file.file?.type) {
      message.error(`未知类型文件，请重新选择！`);
      return false;
    }
    if (isEmpty(fileUploadAction) && action.file.id) {
      schema.defaultValue = [...schema.defaultValue, action.file];
      return true;
    }
    if (fileUploadAction.type) {
      const fileName = action.file.file.name.toLowerCase();
      const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
      if (!fileUploadAction.type.includes(fileExtension)) {
        message.error(`文件类型错误, 请上传${fileUploadAction?.type.join('、')}类型的文件`);
        return false;
      }
    }
    if (fileUploadAction.size) {
      const fileSize = action.file.file.size;
      if (fileSize > fileUploadAction.size) {
        message.error(`文件大小超出限制, 请上传小于${fileUploadAction?.size / 1024 / 1024}M的文件`);
        return false;
      }
    }
    action.file.id ? (schema.defaultValue = [...schema.defaultValue, action.file]) : false;
  }

  return {
    handleDownload,
    beforeFileUpload,
    handleRemoveFile,
    customFileUploadRequest,
  };
}
