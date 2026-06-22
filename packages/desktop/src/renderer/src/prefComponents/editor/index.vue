<template>
  <div class="pref-editor">
    <h4>{{ t('preferences.editor.title') }}</h4>
    <compound>
      <template #head>
        <h6 class="title">
          {{ t('preferences.editor.textEditor.title') }}
        </h6>
      </template>
      <template #children>
        <range
          :description="t('preferences.editor.textEditor.fontSize')"
          :value="fontSize"
          :min="12"
          :max="32"
          unit="px"
          :step="1"
          :on-change="(value) => onSelectChange('fontSize', value)"
        />
        <range
          :description="t('preferences.editor.textEditor.lineHeight')"
          :value="lineHeight"
          :min="1.2"
          :max="2.0"
          :step="0.1"
          :on-change="(value) => onSelectChange('lineHeight', value)"
        />
        <font-text-box
          :description="t('preferences.editor.textEditor.fontFamily')"
          :value="editorFontFamily"
          :on-change="(value) => onSelectChange('editorFontFamily', value)"
        />
        <text-box
          :description="t('preferences.editor.textEditor.maxWidth')"
          :notes="t('preferences.editor.textEditor.maxWidthNotes')"
          :input="editorLineWidth"
          :regex-validator="/^(?:$|[0-9]+(?:ch|px|%)$)/"
          :on-change="(value) => onSelectChange('editorLineWidth', value)"
        />
      </template>
    </compound>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/store/preferences'
import type { PreferencesState } from '@/store/preferences'
import Compound from '../common/compound/index.vue'
import FontTextBox from '../common/fontTextBox/index.vue'
import Range from '../common/range/index.vue'
import TextBox from '../common/textBox/index.vue'

const { t } = useI18n()
const preferenceStore = usePreferencesStore()

const {
  fontSize,
  editorFontFamily,
  lineHeight,
  editorLineWidth
} = storeToRefs(preferenceStore)

const onSelectChange = (type: keyof PreferencesState, value: unknown): void => {
  preferenceStore.SET_SINGLE_PREFERENCE({ type, value })
}
</script>

<style scoped>
.pref-editor .image-ctrl {
  font-size: 14px;
  user-select: none;
  margin: 20px 0;
  color: var(--editorColor);
}

.pref-editor .image-ctrl label {
  display: block;
  margin: 20px 0;
}
</style>
