<template>
  <div class="login-page w-full h-full">
    <div class="login-header w-full fixed my-5">
      <div class="m-auto w-[75%] flex items-center">
        <img src="@/assets/vast.svg" alt="logo" class="w-10" />
        <div class="text-white text-2xl font-bold ml-3">{{ title }}</div>
      </div>
    </div>
    <div
      class="login-container flex w-full h-full items-center 2xl:justify-end xl:justify-end justify-center bg-cover 2xl:pr-[15%] xl:pr-[8%]"
    >
      <div class="login-content bg-white p-8 w-[400px]">
        <div class="text-2xl font-bold mb-5"> 账号登录 </div>
        <AccountLogin ref="accountLoginRef" />
        <FooterAction />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { AccountLogin, FooterAction } from './components';

  const title = import.meta.env.VITE_GLOB_APP_TITLE;
</script>

<style scoped lang="less">
  .login-page {
    .login-container {
      box-sizing: border-box;
      background-image: url('@/assets/images/login/login-bg.png');
      background-repeat: no-repeat;

      .login-content {
        border: 1px solid rgba(245, 245, 245, 1);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
