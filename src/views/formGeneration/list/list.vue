<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/icon.tsx';

  const addClick = () => {
    console.log(123);
  };
</script>

<template>
  <div class="genera-form">
    <div class="add">
      <n-button type="primary" @click="addClick">
        <template #icon>
          <SvgIcon name="add-one" />
        </template>
        新增表单
      </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
