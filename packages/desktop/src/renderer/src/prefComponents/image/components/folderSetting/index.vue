<template>
  <section class="image-folder">
    <h6 class="title">
      {{ t('preferences.image.folderSetting.title') }}
    </h6>
    <text-box
      :description="t('preferences.image.folderSetting.globalFolder')"
      :input="imageFolderPath"
      :regex-validator="/^(?:$|([a-zA-Z]:)?[\/\\].*$)/"
      :default-value="folderPathPlaceholder"
      :on-change="(value) => modifyImageFolderPath(value)"
    />
    <div>
      <el-button
        size="mini"
        @click="modifyImageFolderPath(undefined)"
      >
        {{ t('preferences.image.folderSetting.open') }}
      </el-button>
      <el-button
        size="mini"
        @click="openImageFolder"
      >
        {{ t('preferences.image.folderSetting.showInFolder') }}
      </el-button>
    </div>
    <div class="footnote">
      {{ t('preferences.image.folderSetting.filenameNote') }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/store/preferences'
import TextBox from '@/prefComponents/common/textBox/index.vue'

const { t } = useI18n()

const preferenceStore = usePreferencesStore()

// computed
const {
  imageFolderPath
} = storeToRefs(preferenceStore)
const folderPathPlaceholder = computed<string>(() => preferenceStore.imageFolderPath || '')

// methods
const openImageFolder = (): void => {
  window.electron.shell.openPath(imageFolderPath.value)
}

const modifyImageFolderPath = (value: string | undefined): void => {
  // Passing `undefined` is the documented way to ask the main process to
  // open a folder picker (see `mt::ask-for-modify-image-folder-path`).
  preferenceStore.SET_IMAGE_FOLDER_PATH(value)
}
</script>

<style scoped>
.image-folder .footnote {
  font-size: 13px;
  & code {
    font-size: 13px;
  }
}
</style>
