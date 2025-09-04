<script setup lang="ts">
  import { Button } from '@/components/Button';

  import { ref, defineProps, computed, unref, Ref, onMounted, reactive } from 'vue';
  import { basicProps } from './props';
  import { FormProps, FormSchema } from './types/from';
  import { ComponentType, DICT_KEY, DICT_LABEL, DICT_VALUE } from './types';
  import { createPlaceholderMessage } from './helper';
  import useFormEvents from './hooks/useFormEvents';
  import { FormActionType } from './types/from';
  import { useFileUpload } from '@/components/BaseForm/src/hooks/useFileUpload';
  import { UploadOutlined } from '@vicons/antd';
  import { useVideoFileUpload } from '@/hooks/upload/useVideoFileUpload';

  const loadingSub = ref(false);
  const formModel = ref({}) as Ref<FormSchema>;
  const defaultFormModel = ref<Recordable>({});
  const formElRef = ref<Nullable<FormActionType>>(null);
  const $emit = defineEmits(['submit']);

  const Props: Partial<FormProps> = defineProps({ ...basicProps });

  const getProps = computed(() => {
    return { ...Props } as FormProps;
  });

  const getFormBindValue = computed(() => ({ ...Props }));

  const getSchemas = computed(() => {
    const schemes: FormSchema[] = unref(getProps).schemas?.filter((item) => !item.notShow) as any;
    return schemes as FormSchema[];
  });

  const getSubmitBtnOptions = computed(() => {
    return Object.assign(
      {
        size: Props.size,
        type: 'primary',
      },
      Props.submitButtonOptions,
    );
  });

  const getResetBtnOptions = computed(() => {
    return Object.assign(
      {
        size: Props.size,
      },
      Props.resetButtonOptions,
    );
  });

  const editorSetting = reactive({
    content: 'hello vue3-tinymce!',
    // editor 配置项
    setting: {
      menubar: false,
      height: 350,
      width: '100%',
      toolbar:
        'bold italic underline h1 h2 blockquote codesample numlist bullist | removeformat fullscreen| fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
      plugins: 'codesample link image table lists fullscreen',
      toolbar_mode: 'sliding',
      nonbreaking_force_tab: true,
      link_title: false,
      default_link_target: '_blank',
      content_style: 'body{font-size: 16px}',
      language: 'zh-Hans',
      language_url: 'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
    },
  });

  /**
   * form event hooks use
   */
  const { handleSubmit, handleReset, validate, getValidateForm, clearValidate, setFieldsValue } = useFormEvents({
    $emit,
    formModel,
    getProps,
    getSchemas,
    defaultFormModel,
    formElRef: formElRef as Ref<FormActionType>,
    loadingSub,
  });

  /**
   * file upload hooks use
   */
  const { beforeFileUpload, handleRemoveFile, handleDownload, customFileUploadRequest } = useFileUpload({
    formModel,
    setLoadingSub,
  });

  /**
   * video file upload hooks use
   */
  const {
    uploadRequest: uploadVideoRequest,
    uploadBefore: uploadVideoBefore,
    removeFile: removeVideoFile,
  } = useVideoFileUpload();

  function setLoadingSub(bool: boolean) {
    loadingSub.value = bool;
  }

  function radioGroupChange(e, schema) {
    if (schema.componentEvents && schema.componentEvents.onChange) {
      e['detail'] = formModel.value[schema.field];
      schema.componentEvents.onChange(e);
    }
  }

  function getComponentProps(schema: FormSchema) {
    const cpnProps = schema.componentProps ?? {};
    const component = schema.component;
    return {
      clearable: true,
      placeholder: createPlaceholderMessage(unref(component) as ComponentType) + schema.label,
      ...cpnProps,
      ...schema.componentEvents,
    };
  }

  function getSchemaProps(schema: FormSchema) {
    const showLabel = schema.showLabel ?? true;
    const showFeedBack = schema.showFeedback ?? true;
    return {
      showLabel,
      showFeedBack,
      ...schema,
    };
  }

  /**
   * 设置默认值
   */
  onMounted(() => {
    if (getProps.value.model) {
      return setFieldsValue(unref(getProps.value.model));
    }
  });

  defineExpose({
    formModel,
    validate,
    setFieldsValue,
    clearValidate,
    setLoadingSub,
    handleReset,
    getValidateForm,
  });
</script>

<template>
  <n-form ref="formElRef" v-bind="getFormBindValue" :model="formModel">
    <!--  数据填写表单  -->
    <n-grid v-if="!getFormBindValue.searchForm" x-gap="12" :y-gap="8" :cols="24">
      <n-gi v-for="schema in getSchemas" :key="schema.field" :span="schema.span ? schema.span : 24" class="mr-10px">
        <n-form-item
          v-if="!schema.notShow"
          v-bind="getSchemaProps(schema)"
          :path="schema.field"
          v-model:value="formModel[schema.field]"
        >
          <div class="form-label-content">
            <template v-if="schema.slot">
              <slot :name="schema.slot" :formModel="formModel" :schema="schema"></slot>
            </template>
            <template v-else-if="schema.component === 'Section'">
              <div class="section-info">
                <span>{{ schema.field }}</span>
              </div>
            </template>
            <template v-else-if="schema.component === 'NRadioGroup'">
              <n-radio-group
                v-model:value="formModel[schema.field]"
                :default-value="schema.defaultValue"
                @change="(e) => radioGroupChange(e, schema)"
              >
                <n-space v-if="schema['dictList']?.length > 0">
                  <n-radio
                    v-for="dict in schema['dictList']"
                    :key="dict[DICT_KEY]"
                    :value="dict[DICT_VALUE]"
                    :disabled="schema.disabled"
                  >
                    {{ dict[DICT_LABEL] }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </template>
            <template v-else-if="schema.component === 'NSelect'">
              <n-select
                v-model:value="formModel[schema.field]"
                v-bind="schema.componentEvents"
                :label-field="DICT_LABEL"
                :value-field="DICT_VALUE"
                :disabled="schema.disabled"
                :multiple="schema.multiple"
                filterable
                :options="schema['dictList']"
              />
            </template>
            <template v-else-if="schema.component === 'NUpload'">
              <n-upload
                action=""
                v-bind="getComponentProps(schema)"
                :custom-request="(e) => customFileUploadRequest(e, schema)"
                :disabled="schema.disabled"
                :file-list="schema.defaultValue"
                @before-upload="(e) => beforeFileUpload(e, schema.fileUploadAction, schema)"
                @remove="(e) => handleRemoveFile(e, schema)"
                @download="handleDownload"
              >
                <slot name="upload">
                  <n-button v-if="schema?.componentProps?.listType !== 'image-card'">
                    <template #icon>
                      <UploadOutlined />
                    </template>
                    {{ schema.componentProps.btnText }}
                  </n-button>
                </slot>
              </n-upload>
            </template>
            <template v-else-if="schema.component === 'NCheckboxGroup'">
              <n-checkbox-group v-model:value="formModel[schema.field]" v-bind="schema.componentEvents">
                <n-space>
                  <n-checkbox
                    v-for="dict in schema['dictList']"
                    :key="dict[DICT_KEY]"
                    :disabled="schema.disabled"
                    :value="dict[DICT_VALUE]"
                  >
                    {{ dict[DICT_LABEL] }}
                  </n-checkbox>
                </n-space>
              </n-checkbox-group>
            </template>
            <template v-else-if="schema.component === 'Editor'">
              <vue3-tinymce
                v-model="formModel[schema.field]"
                :disabled="schema.disabled"
                :setting="editorSetting.setting"
              />
            </template>
            <template v-else-if="schema.component === 'VodVideo'">
              <n-upload
                action=""
                :max="1"
                :disabled="schema.disabled"
                accept="video/mp4, video/webm, video/ogg"
                :default-file-list="schema.defaultValue"
                :custom-request="(e) => uploadVideoRequest(e, formModel, schema)"
                @before-upload="(e) => uploadVideoBefore(e)"
                @remove="() => removeVideoFile(formModel, schema)"
              >
                <Button :icon="UploadOutlined"> 点击上传视频文件</Button>
                <span style="color: red"> 注：仅支持视频类型</span>
              </n-upload>
            </template>
            <component
              v-else
              v-bind="getComponentProps(schema)"
              :is="schema.component"
              :disabled="schema.disabled"
              v-model:value="formModel[schema.field]"
            />

            <template v-if="schema.childrenSlot">
              <slot :name="schema.childrenSlot" :formModel="formModel" :schema="schema"></slot>
            </template>
          </div>
        </n-form-item>
      </n-gi>
      <n-gi span="24">
        <!--  操作列  -->
        <n-form-item v-if="getProps.showActionButtonGroup" class="g-form-button-item">
          <div :class="[`--button-group-${getProps.buttonGroupAlign}`, '--button-group-basic', 'ml-4']">
            <n-space>
              <n-button
                v-if="getProps.showSubmitButton"
                v-bind="getSubmitBtnOptions"
                @click="handleSubmit"
                :loading="loadingSub"
              >
                {{ getProps.submitButtonText }}
              </n-button>
              <n-button
                v-if="getProps.showResetButton"
                v-bind="getResetBtnOptions"
                @click="handleReset"
                :loading="loadingSub"
              >
                {{ getProps.resetButtonText }}
              </n-button>
            </n-space>
          </div>
        </n-form-item>
      </n-gi>
    </n-grid>
    <!--  搜索表单  -->
    <template v-else>
      <div v-for="schema in getSchemas" :key="schema.field" class="mr-10px">
        <n-form-item
          v-if="!schema.notShow"
          v-bind="schema"
          :path="schema.field"
          v-model:value="formModel[schema.field]"
        >
          <template v-if="schema.slot">
            <slot :name="schema.slot" :formModel="formModel" :schema="schema"></slot>
          </template>
          <template v-else-if="schema.component === 'NRadioGroup'">
            <n-radio-group v-model:value="formModel[schema.field]" v-bind="schema.componentEvents">
              <n-space v-if="schema['dictList']?.length > 0">
                <n-radio
                  v-for="dict in schema['dictList']"
                  :key="dict[DICT_KEY]"
                  :value="dict[DICT_VALUE]"
                  :disabled="schema.disabled"
                >
                  {{ dict[DICT_LABEL] }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </template>
          <template v-else-if="schema.component === 'NSelect'">
            <n-select
              v-model:value="formModel[schema.field]"
              v-bind="schema.componentEvents"
              :label-field="DICT_LABEL"
              :value-field="DICT_VALUE"
              :disabled="schema.disabled"
              :multiple="schema.multiple"
              filterable
              :options="schema['dictList']"
            />
          </template>
          <template v-else-if="schema.component === 'NUpload'">
            <n-upload
              action=""
              v-bind="getComponentProps(schema)"
              :custom-request="(e) => customFileUploadRequest(e, schema)"
              :disabled="schema.disabled"
              :file-list="schema.defaultValue"
              @before-upload="(e) => beforeFileUpload(e, schema.fileUploadAction, schema)"
              @remove="(e) => handleRemoveFile(e, schema)"
            >
              <slot name="upload">
                <n-button v-if="schema.componentProps.listType !== 'image-card'">
                  {{ schema.componentProps.btnText }}
                </n-button>
              </slot>
            </n-upload>
          </template>
          <template v-else-if="schema.component === 'NCheckboxGroup'">
            <n-checkbox-group v-model:value="formModel[schema.field]" v-bind="schema.componentEvents">
              <n-space>
                <n-checkbox
                  v-for="dict in schema['dictList']"
                  :key="dict[DICT_KEY]"
                  :disabled="schema.disabled"
                  :value="dict[DICT_VALUE]"
                >
                  {{ dict[DICT_LABEL] }}
                </n-checkbox>
              </n-space>
            </n-checkbox-group>
          </template>
          <template v-else-if="schema.component === 'Editor'">
            <vue3-tinymce
              v-model="formModel[schema.field]"
              :disabled="schema.disabled"
              :setting="editorSetting.setting"
            />
          </template>
          <component
            v-else
            v-bind="getComponentProps(schema)"
            :is="schema.component"
            :disabled="schema.disabled"
            v-model:value="formModel[schema.field]"
          />
        </n-form-item>
      </div>
      <!--  操作列  -->
      <n-form-item v-if="getProps.showActionButtonGroup" class="g-form-button-item g-search-form-button-item">
        <div :class="[`--button-group-${getProps.buttonGroupAlign}`, '--button-group-basic', 'ml-4']">
          <n-space>
            <n-button
              v-if="getProps.showSubmitButton"
              v-bind="getSubmitBtnOptions"
              @click="handleSubmit"
              :loading="loadingSub"
            >
              {{ getProps.submitButtonText }}
            </n-button>
            <n-button
              v-if="getProps.showResetButton"
              v-bind="getResetBtnOptions"
              @click="handleReset"
              :loading="loadingSub"
            >
              {{ getProps.resetButtonText }}
            </n-button>
          </n-space>
        </div>
      </n-form-item>
    </template>
  </n-form>
</template>

<style scoped>
  @import './style/index.less';
</style>
