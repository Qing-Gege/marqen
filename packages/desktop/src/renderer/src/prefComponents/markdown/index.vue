<template>
  <div class="pref-markdown">
    <h4>{{ t('preferences.markdown.title') }}</h4>
    <compound>
      <template #head>
        <h6 class="title">
          {{ t('preferences.markdown.lists.title') }}
        </h6>
      </template>
      <template #children>
        <bool
          :description="t('preferences.markdown.lists.preferLooseListItem')"
          :bool="preferLooseListItem"
          :on-change="(value) => onSelectChange('preferLooseListItem', value)"
        />
        <cur-select
          :description="t('preferences.markdown.lists.listIndentation.title')"
          :value="listIndentation"
          :options="getListIndentationOptions()"
          :on-change="(value) => onSelectChange('listIndentation', value)"
        />
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">
          {{ t('preferences.markdown.extensions.title') }}
        </h6>
      </template>
      <template #children>
        <bool
          :description="t('preferences.markdown.extensions.superSubScript')"
          :bool="superSubScript"
          :on-change="(value) => onSelectChange('superSubScript', value)"
        />
        <bool
          :description="t('preferences.markdown.extensions.footnote')"
          :notes="t('preferences.markdown.extensions.footnoteNotes')"
          :bool="footnote"
          :on-change="(value) => onSelectChange('footnote', value)"
        />
      </template>
    </compound>

  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Compound from '../common/compound/index.vue'
import { usePreferencesStore } from '@/store/preferences'
import type { PreferencesState } from '@/store/preferences'
import Bool from '../common/bool/index.vue'
import CurSelect from '../common/select/index.vue'
import { getListIndentationOptions } from './config'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const preferenceStore = usePreferencesStore()

const {
  preferLooseListItem,
  listIndentation,
  superSubScript,
  footnote
} = storeToRefs(preferenceStore)

const onSelectChange = (type: keyof PreferencesState, value: unknown): void => {
  preferenceStore.SET_SINGLE_PREFERENCE({ type, value })
}
</script>

<script lang="ts">
export default {
  name: 'AutoLayout'
}
</script>

<style scoped>
.pref-markdown {
}
</style>
