<!--
 * @Author: Coder Derek
 * @File: BatchEditModal.vue
 * @Software: WebStorm
 * @Description: descript
-->
<template>
  <n-modal v-model:show="show" preset="card" title="批量编辑选项" style="width: 700px">
    <n-split direction="horizontal" :default-size="0.75" :max="0.75" disabled>
      <template #1>
        <n-input
          v-model:value="optionsValue"
          type="textarea"
          placeholder="每行一个选项，可以添加多个选项"
          :autosize="{ minRows: 15, maxRows: 15 }"
        />
      </template>
      <template #2>
        <div class="right">
          <div class="title">预定义选项</div>
          <n-grid x-gap="12" :y-gap="12" :cols="2">
            <n-gi v-for="config in optionsConfig" :key="config.title">
              <n-button class="w-full" circle @click="configClick(config)">{{ config.title }}</n-button>
            </n-gi>
          </n-grid>
        </div>
      </template>
    </n-split>
    <template #footer>
      <n-flex justify="center">
        <n-button type="primary" @click="onPrimaryClick">确定</n-button>
        <n-button @click="show = false">取消</n-button>
      </n-flex>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const show = ref(false);
  const optionsValue = ref('');
  const optionsConfig = ref([
    {
      title: '性别',
      value: '男\n女',
    },
    {
      title: '年龄',
      value: '18岁以下\n' + '18~25\n' + '26~30\n' + '31~40\n' + '41~50\n' + '51~60\n' + '60以上',
    },
    {
      title: '学历',
      value: '初中及以下\n' + '高中/中专/技校\n' + '大学专科\n' + '大学本科\n' + '研究生及以上',
    },
    {
      title: '民族',
      value:
        '汉族\n' +
        '满族\n' +
        '蒙古族\n' +
        '回族\n' +
        '藏族\n' +
        '维吾尔族\n' +
        '苗族\n' +
        '彝族\n' +
        '壮族\n' +
        '布依族\n' +
        '侗族\n' +
        '瑶族\n' +
        '白族\n' +
        '土家族\n' +
        '哈尼族\n' +
        '哈萨克族\n' +
        '傣族\n' +
        '黎族\n' +
        '傈僳族\n' +
        '佤族\n' +
        '畲族\n' +
        '高山族\n' +
        '拉祜族\n' +
        '水族\n' +
        '东乡族\n' +
        '纳西族\n' +
        '景颇族\n' +
        '柯尔克孜族\n' +
        '土族\n' +
        '达斡（音：握）尔族\n' +
        '仫（音：目）佬族\n' +
        '羌族\n' +
        '布朗族\n' +
        '撒拉族\n' +
        '毛南族\n' +
        '仡佬族\n' +
        '锡伯族\n' +
        '阿昌族\n' +
        '普米族\n' +
        '朝鲜族\n' +
        '塔吉克族\n' +
        '怒族\n' +
        '乌孜别克族\n' +
        '俄罗斯族\n' +
        '鄂温克族\n' +
        '德昂族\n' +
        '保安族\n' +
        '裕固族\n' +
        '京族\n' +
        '塔塔尔族\n' +
        '独龙族\n' +
        '鄂伦春族\n' +
        '赫哲族\n' +
        '门巴族\n' +
        '珞巴族\n' +
        '基诺族',
    },
    {
      title: '省份',
      value:
        '安徽\n' +
        '北京\n' +
        '重庆\n' +
        '福建\n' +
        '甘肃\n' +
        '广东\n' +
        '广西\n' +
        '贵州\n' +
        '海南\n' +
        '河北\n' +
        '黑龙江\n' +
        '河南\n' +
        '香港\n' +
        '湖北\n' +
        '湖南\n' +
        '江苏\n' +
        '江西\n' +
        '吉林\n' +
        '辽宁\n' +
        '澳门\n' +
        '内蒙古\n' +
        '宁夏\n' +
        '青海\n' +
        '山东\n' +
        '上海\n' +
        '山西\n' +
        '陕西\n' +
        '四川\n' +
        '台湾\n' +
        '天津\n' +
        '新疆\n' +
        '西藏\n' +
        '云南\n' +
        '浙江\n' +
        '海外',
    },
    {
      title: '婚姻',
      value: '未婚\n' + '已婚\n' + '离异',
    },
    {
      title: '职业',
      value:
        '市场/销售/商务\n' +
        '采购\n' +
        '行政\n' +
        '人力\n' +
        '产品/运营人员\n' +
        '个体经营者\n' +
        '财务/会计/出纳/审计\n' +
        '企业管理者\n' +
        '律师/法务\n' +
        '设计从业者\n' +
        '服务业人员\n' +
        '技术开发/工程师\n' +
        '农林牧渔劳动者\n' +
        '工人劳动者\n' +
        '全职家庭主妇/夫\n' +
        '自由职业\n' +
        '离休/退休\n' +
        '学生\n' +
        '老师\n' +
        '医护人员\n' +
        '科研人员\n' +
        '党政机关人员',
    },
    {
      title: '行业',
      value:
        '制造业\n' +
        '建筑业\n' +
        '物流交通\n' +
        '教育/培训\n' +
        '互联网\n' +
        '计算机/软件\n' +
        '批发和零售\n' +
        '住宿餐饮业\n' +
        '金融业\n' +
        '房地产业\n' +
        '出租/租赁\n' +
        '专业服务（如法律/咨询服务）\n' +
        '科学研究\n' +
        '生活服务（如家政/美发类服务）\n' +
        '医疗卫生/社会保障\n' +
        '文化娱乐\n' +
        '政府事业单位\n' +
        '农、林、牧、渔业\n' +
        '水利环境公共设施管理\n' +
        '电力燃气\n' +
        '采矿业\n' +
        '国际组织',
    },
    {
      title: '认同度',
      value: '很不同意\n' + '不同意\n' + '一般\n' + '同意\n' + '很同意',
    },
    {
      title: '星期',
      value: '星期日\n' + '星期一\n' + '星期二\n' + '星期三\n' + '星期四\n' + '星期五\n' + '星期六',
    },
  ]);

  const $emit = defineEmits(['update:options']);

  function onPrimaryClick() {
    if (optionsValue.value) {
      const finalOptions = optionsValue.value.split('\n').map((item) => {
        return {
          dictLabel: item,
          dictValue: item,
        };
      });
      $emit('update:options', finalOptions);
    } else {
      $emit('update:options', []);
    }
    show.value = false;
  }

  function configClick(config: any) {
    optionsValue.value = config.value;
  }

  defineExpose({
    showModal: (value: string) => {
      show.value = true;
      optionsValue.value = value;
    },
  });
</script>

<style scoped lang="less">
  .right {
    padding-left: 10px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
</style>
