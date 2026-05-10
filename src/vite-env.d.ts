/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAGE_VIEW_WEBHOOK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
