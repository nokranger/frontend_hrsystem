import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Bold.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-BoldItalic.ttf',
  },
  AngsanaNew: {
    normal: 'NotoSerifThai.ttf',
  },
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf',
  },
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
