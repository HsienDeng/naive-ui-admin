<template>
  <div>
    {{ $t('main.logout') }}
  </div>
</template>

<script setup lang="ts">
  import { testRequest } from '@/api/sys';

  testRequest().then((res) => {
    console.log(res);
  });
</script>

<style scoped lang="scss"></style>
