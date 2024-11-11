<template>
  <n-form ref="formRef" :rules="formRules" v-show="isShowNode" :model="formState" :show-label="false" name="basic">
    <n-form-item path="username">
      <n-input v-model:value="formState.username" placeholder="账号" size="large" />
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="formState.password"
        placeholder="密码"
        size="large"
        type="password"
        show-password-on="click"
      />
    </n-form-item>
    <n-form-item name="remember">
      <div class="w-full flex justify-between items-center">
        <n-checkbox v-model:checked="formState.remember">记住我</n-checkbox>
        <n-button text type="info">忘记密码？</n-button>
      </div>
    </n-form-item>

    <n-form-item>
      <n-button type="info" size="large" class="w-full" @click="onFinish">立即登录</n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import type { FormInst } from 'naive-ui';
  import { useLoginState, StateEnum } from '../components/loginPreference';
  import { useRouter } from 'vue-router';
  import { login } from '@/api/user';

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }

  const router = useRouter();
  const formRef = ref<FormInst | null>(null);
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const formRules = {
    username: {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    password: {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  };

  const onFinish = () => {
    formRef.value?.validate((errors) => {
      console.log(errors);
      if (!errors) {
        login(formState).then((res) => {
          localStorage.setItem('token', JSON.stringify(res));
          router.push('/');
        });
      } else {
        console.log(errors);
      }
    });
  };

  // 判断是否显示当前组件
  const { state } = useLoginState();
  const isShowNode = computed(() => state.value === StateEnum.ACCOUNT);
</script>

<style scoped lang="scss"></style>
