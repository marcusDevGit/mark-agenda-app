import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import pinia from './plugins/pinia'
import '@/scss/style.scss'
import { useMeStore } from '@/store/me.js'

// Styles

const app = createApp(App)
app.use(pinia)

const meStore = useMeStore()

meStore.getMe()
  .finally(() => {
    app
      .use(router)
      .use(vuetify)
      .mount('#app')

  })