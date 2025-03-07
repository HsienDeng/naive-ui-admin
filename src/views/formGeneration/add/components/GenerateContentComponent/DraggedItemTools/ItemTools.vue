<template>
  <div class="dragged-item-tools w-100 h-100">
    <NSpace>
      <!-- copy -->
      <NButton type="primary" ghost tag="span" @click="handleCopyFunc">
        <template #icon>
          <SvgIcon name="copy" />
        </template>
      </NButton>
      <!-- delete -->
      <n-button type="error" ghost tag="span" @click="handleDeleteFunc">
        <template #icon>
          <SvgIcon name="delete" />
        </template>
      </n-button>
    </NSpace>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SvgIcon from '@/components/SvgIcon';

  export default defineComponent({
    components: {
      SvgIcon,
    },
    setup(_, { emit }) {
      function handleDeleteFunc(e) {
        e.stopPropagation();
        emit('delete:item');
      }

      function handleCopyFunc(e) {
        e.stopPropagation();
        emit('copy:item');
      }

      return {
        handleCopyFunc,
        handleDeleteFunc,
      };
    },
  });
</script>

<style lang="less">
  .dragged-item-tools {
    .n-button {
      width: 5px;
      height: 25px;
    }
  }
</style>
