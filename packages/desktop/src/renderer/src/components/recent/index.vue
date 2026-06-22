<template>
  <div class="recent-files-projects">
    <div class="centered-group">
      <div class="brand-mark">Mq</div>
      <h2>{{ t('recent.noTabsOpen') }}</h2>
      <p>{{ t('recent.emptyHint') }}</p>
      <el-button
        text
        bg
        type="primary"
        @click="newFile"
      >
        {{ t('recent.newFile') }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/store/editor'
import { t } from '../../i18n'

const editorStore = useEditorStore()

const newFile = () => {
  editorStore.NEW_UNTITLED_TAB({})
}
</script>

<style scoped>
.recent-files-projects {
  background:
    linear-gradient(135deg, rgba(255, 253, 248, 0.92), rgba(244, 241, 234, 0.86)),
    var(--marqenCanvas);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  box-sizing: border-box;
}

.centered-group {
  width: min(420px, 100%);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 38px 34px;
  color: var(--editorColor);
  border: 1px solid var(--marqenLine);
  border-radius: 8px;
  background: var(--editorBgColor);
  box-shadow: var(--marqenShadow);
  text-align: center;
}

.brand-mark {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  margin-bottom: 22px;
  border-radius: 8px;
  color: var(--marqenPaper);
  background: linear-gradient(135deg, var(--marqenInk), var(--marqenAccent));
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0;
  box-shadow: 0 12px 24px rgba(24, 53, 47, 0.18);
}

.centered-group h2 {
  margin: 0;
  color: var(--marqenInk);
  font-size: 22px;
  font-weight: 650;
  line-height: 1.35;
}

.centered-group p {
  margin: 10px 0 24px;
  color: var(--editorColor50);
  font-size: 14px;
  line-height: 1.6;
}

.centered-group .el-button.is-text.is-has-bg {
  min-width: 132px;
  height: 36px;
  background-color: var(--themeColor);
  color: #ffffff;
  border-color: transparent;
  box-shadow: var(--buttonPrimaryShadow);
}

.centered-group .el-button.is-text.is-has-bg:hover,
.centered-group .el-button.is-text.is-has-bg:focus {
  background-color: color-mix(in srgb, var(--themeColor) 88%, var(--marqenInk));
  color: #ffffff;
}
</style>
