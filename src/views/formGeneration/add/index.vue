<template>
  <n-layout class="generate-flow-code-page h-full">
    <!--  头部区域开始  -->
    <n-layout-header bordered class="custom-page-header">
      <NPageHeader>
<!--        <template #extra> 操作区123域 </template>-->
      </NPageHeader>
    </n-layout-header>
    <!--  头部区域结束  -->
    <n-layout position="absolute" class="generate-flow-code-container" has-sider style="height: 100%">
      <!--  左侧组件区域开始  -->
      <n-layout-sider class="generate-flow-code-left" content-style="padding: 10px;" :native-scrollbar="false" bordered>
        <LeftComponent />
      </n-layout-sider>
      <!--  左侧组件区域结束  -->
      <!--  中间画布区域开始  -->
      <n-layout content-style="height: 100%; background-color: #f4f5f5;" embedded :native-scrollbar="false">
        <ContentComponent
          ref="contentComponentRef"
          :dragged-index="draggedIndex"
          :dragged-component-list="draggedComponentList"
          :dragged-component="draggedComponent"
          :set-dragged-index="setDraggedIndex"
          @delete:dragged-component="deleteDraggedComponentListByIndex"
          @update:dragged-component="setDraggedComponentListByIndex"
          @empty:dragged-component="emptyDraggedComponent"
        />
      </n-layout>
      <!--  中间画布区域结束  -->
      <!--  右侧属性控制区域开始  -->
      <n-layout-sider class="generate-flow-code-right" :native-scrollbar="false" bordered>
        <RightComponent
          ref="rightComponentRef"
          :dragged-index="draggedIndex"
          :dragged-component="draggedComponent"
          :dragged-component-list="draggedComponentList"
          @update:right-set-dragged-component="setDraggedComponentListByIndex"
        />
      </n-layout-sider>
      <!--  右侧属性控制区域结束  -->
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
  import { ref, Ref, unref, onMounted } from 'vue';
  import { LeftComponent } from './components/GenerateLeftComponent';
  import { ContentComponent } from './components/GenerateContentComponent';
  import { RightComponent } from './components/GenerateRightComponent';
  import { QuestionItemType } from '@/types/form-generation';
  // import { useHeaderTool } from './hooks/useHeaderTool';
  // import { useBeforeunloadHeader } from '@/hooks/web/useBeforeunloadHeader.ts';

  const rightComponentRef = ref<InstanceType<typeof RightComponent>>();
  const contentComponentRef = ref<InstanceType<typeof ContentComponent>>();
  // 所有已在画布中的list
  const draggedComponentList = ref<QuestionItemType[]>([]);
  // 选中的值
  const draggedComponent = ref(draggedComponentList.value[0] || {}) as Ref<QuestionItemType>;
  // 选中值的下标
  const draggedIndex = ref(0);

  /* 头部工具栏的hooks */
  // const { headerToolLoading, saveOrUpdateModal, handleReviewClick, handleRouterBack, unProcessingFromFunc } =
  //   useHeaderTool({
  //     draggedIndex,
  //     draggedComponent,
  //     contentComponentRef,
  //     draggedComponentList,
  //   });

  /**
   * 设置选中的元素
   * @param element
   */
  function setDraggedComponent(element) {
    draggedComponent.value = element;
    rightComponentRef.value?.setFormValue(element);
    contentComponentRef.value?.setFormValue();
  }

  /**
   * 属性编辑组件修改事件
   * @param element
   * @param index
   */
  function setDraggedComponentListByIndex(element: QuestionItemType, index) {
    draggedComponentList.value[index] = element;
    setDraggedIndex(index);
    setDraggedComponent(element);
  }

  /**
   * 删除指定元素
   * @param _
   * @param index
   */
  function deleteDraggedComponentListByIndex(_, index) {
    // 如果删除的是选中的元素，才处理重新选择
    const isSelectIndex = index === unref(draggedIndex);
    // 如果只有一条， 清空选中
    if (unref(draggedComponentList).length === 1) {
      emptyDraggedComponent();
      // 如果是最后一个元素，设置默认选中第一个
    } else if (unref(draggedComponentList).length - 1 === index) {
      draggedComponentList.value.splice(index, 1);
      isSelectIndex && setDraggedComponentListByIndex(unref(draggedComponentList)[0], 0);
      // 反之，设置成下一个
    } else {
      draggedComponentList.value.splice(index, 1);
      // 由于已经删除了，所有当前下标就是已经删除的元素的前面一个
      isSelectIndex && setDraggedComponentListByIndex(unref(draggedComponentList)[index], index);
    }
  }

  /**
   * 清空选中区域和画布区域
   */
  function emptyDraggedComponent() {
    draggedComponentList.value = [];
    setDraggedIndex(0);
    setDraggedComponent({});
  }

  function setDraggedIndex(index) {
    draggedIndex.value = index;
  }

  function initPage() {}

  onMounted(() => {
    initPage();
  });
</script>

<style lang="less">
  .generate-flow-code-page {
    .n-card__content {
      display: flex;
      flex-direction: column;
    }

    .generate-page-review-modal {
      position: absolute;
      z-index: 999;
    }

    .rich-text-toolbar {
      min-width: 945px;
      max-width: 945px;
    }
  }

  .custom-page-header {
    padding: 10px;

    .n-page-header {
      width: 90%;
      margin: auto;
    }
  }

  .generate-flow-code-container {
    top: 55px !important;
    padding-bottom: 20px;

    .generate-flow-code-right {
      min-width: 20vw !important;
      border-left: 1px solid #efeff5;
    }

    .n-layout-sider {
      box-sizing: unset !important;
    }
  }
</style>
