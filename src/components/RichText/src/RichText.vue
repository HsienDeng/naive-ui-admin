<template>
  <div class="rich-text-page">
    <Toolbar
      v-show="editorToolStatus"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      class="rich-text-toolbar"
    />
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      :class="[editorToolStatus ? 'rich-text-active-editor' : '']"
    />
  </div>
</template>

<script lang="ts">
  import { onBeforeUnmount, ref, shallowRef } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { IToolbarConfig } from '@wangeditor/editor';
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  // import { DomEditor } from '@wangeditor/editor';

  export default {
    components: { Editor, Toolbar },
    props: {
      // 是否返回纯文本给父组件
      textBack: {
        type: Boolean,
        default: false,
      },
      content: {
        type: String,
        default: '',
      },
    },
    setup(props, ctx) {
      // 控制工具栏
      const editorToolStatus = ref(false);
      // 编辑器实例，必须用 shallowRef
      const editorRef = shallowRef();
      // 获取配置
      // 内容 HTML
      const valueHtml = ref(props.content);

      const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: [
          'insertVideo',
          'insertTable',
          'fullScreen',
          'group-image',
          'group-video',
          'fullScreen',
          'fontSize',
          'fontFamily',
          'insertVideo',
        ],
      };

      const editorConfig = { placeholder: '请输入内容...', autoFocus: false };

      // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = editorRef.value;
        if (editor == null) return;
        editor.destroy();
      });

      const handleCreated = (editor) => {
        editorRef.value = editor; // 记录 editor 实例，重要！
      };

      // 获取焦点事件， 展示 toolbar
      const handleFocus = () => {
        updateToolStatus(true);
      };

      // 失去焦点事件，隐藏toolbar
      const handleBlur = () => {
        updateToolStatus(false);
        // 传递值
        ctx.emit('update:content', editorRef.value.getHtml(), props.textBack && editorRef.value.getText());
      };

      function updateToolStatus(bol) {
        editorToolStatus.value = bol;
      }

      return {
        editorRef,
        editorToolStatus,
        valueHtml,
        mode: 'simple', // 或 'simple'
        toolbarConfig,
        editorConfig,
        handleCreated,
        handleFocus,
        handleBlur,
        updateToolStatus,
      };
    },
  };
</script>

<style lang="less">
  .rich-text-page {
    width: 100%;
    position: relative;
    margin: 10px 0;
    padding: 5px 0;
    box-sizing: content-box;
  }

  .rich-text-toolbar {
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;

    position: absolute;
    z-index: 999;
    top: -36px;
  }

  .rich-text-active-editor .w-e-scroll {
    background-color: #f4f4f4 !important;
  }

  .w-e-text-container [data-slate-editor] h1,
  .w-e-text-container [data-slate-editor] h2,
  .w-e-text-container [data-slate-editor] h3,
  .w-e-text-container [data-slate-editor] h4,
  .w-e-text-container [data-slate-editor] h5 {
    margin: 0 !important;
  }
</style>
