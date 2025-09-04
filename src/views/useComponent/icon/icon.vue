<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon';

  import { ref } from 'vue';

  const files = import.meta.glob('/src/assets/icons/*.svg');
  const icons = ref<string[]>([]);
  Object.keys(files).forEach((key) => {
    const name = key.match(/\/src\/assets\/icons\/(.*)\.svg$/)?.[1];
    if (name) {
      icons.value.push(name);
    }
  });
  console.log(icons.value);
</script>

<template>
  <div class="app-container icon">
    <h2>图标 Icon</h2>
    <div>
      推荐使用SVG，导入至项目 /src/assets/icons 中，通过SVG的文件名使用，这里推荐字节的
      <a href="https://iconpark.oceanengine.com/official" target="_blank">IconPark</a>。
    </div>
    <div>具体使用代码请看页面代码</div>

    <div class="container">
      <n-el tag="div" class="temp_box_all">
        <div class="title"> 基本使用 </div>
        <n-space>
          <SvgIcon v-for="icon in icons" :key="icon" :name="icon" size="24" />
        </n-space>
      </n-el>

      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <n-el tag="div" class="temp_box">
            <div class="title"> 线条颜色 </div>
            <n-space>
              <SvgIcon name="avatar" color="red" />
              <SvgIcon name="brain" color="blue" />
              <SvgIcon name="code" color="pink" />
            </n-space>
          </n-el>
        </n-gi>
        <n-gi>
          <n-el tag="div" class="temp_box">
            <div class="title"> 填充颜色 </div>
            <n-space>
              <SvgIcon name="avatar" fill="red" />
              <SvgIcon name="brain" fill="blue" />
              <SvgIcon name="code" fill="pink" />
            </n-space>
          </n-el>
        </n-gi>
        <n-gi>
          <n-el tag="div" class="temp_box">
            <div class="title"> 图标大小 </div>
            <n-space>
              <SvgIcon name="avatar" size="24" />
              <SvgIcon name="brain" size="34" />
              <SvgIcon name="code" size="44" />
            </n-space>
          </n-el>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    margin-top: 20px;
  }

  .temp_box_all,
  .temp_box {
    background: var(--base-color);
    border: 1px solid var(--border-color);
    padding: 10px 20px;

    .title {
      margin-bottom: 20px;
    }
  }

  .temp_box {
    margin-top: 20px;
    height: 100px;
  }
</style>
