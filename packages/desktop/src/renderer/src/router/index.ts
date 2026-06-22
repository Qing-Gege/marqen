import type { RouteRecordRaw } from 'vue-router'
// .vue extensions are explicit so TS resolves them through the *.vue module
// shim in src/types/renderer.d.ts. Vite handles extension-less imports at
// runtime, but vue-tsc needs the suffix.
import App from '@/pages/app.vue'
import Preference from '@/pages/preference.vue'
import General from '@/prefComponents/general/index.vue'
import Editor from '@/prefComponents/editor/index.vue'
import Theme from '@/prefComponents/theme/index.vue'

const parseSettingsPage = (type: string | null | undefined): string => {
  let pageUrl = '/preference'
  if (type && /\/theme$/.test(type)) {
    pageUrl += '/theme'
  } else if (type && /\/editor$/.test(type)) {
    pageUrl += '/editor'
  }
  return pageUrl
}

const routes = (type: string | null | undefined): RouteRecordRaw[] => [
  {
    path: '/',
    redirect: type === 'editor' ? '/editor' : parseSettingsPage(type)
  },
  {
    path: '/editor',
    component: App
  },
  {
    path: '/preference',
    component: Preference,
    children: [
      {
        path: '',
        component: General
      },
      {
        path: 'general',
        component: General,
        name: 'general'
      },
      {
        path: 'editor',
        component: Editor,
        name: 'editor'
      },
      {
        path: 'theme',
        component: Theme,
        name: 'theme'
      }
    ]
  }
]

export default routes
