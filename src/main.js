import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import helper from '@/helpers'
import VueCryptojs from 'vue-cryptojs'
import VueProgressBar from "@aacassandra/vue3-progressbar";
import vue3GoogleLogin from 'vue3-google-login'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import '../src/assets/styles.css'

const options = {
    color: "#5850EC",
    failedColor: "#874b4b",
    thickness: "5px",
    transition: {
      speed: "0.2s",
      opacity: "0.6s",
      termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
  };

const pinia = createPinia();
    pinia.use(piniaPluginPersistedState)

const app = createApp(App);
          app.use(VueProgressBar, options);
            app.use(LoadingPlugin);
            app.use(pinia);
            app.use(router);
            app.use(helper);
            app.use(VueCryptojs);
            app.use(vue3GoogleLogin, {
              clientId: '944017042665-pjouvlb78631us4a2jl4098ol2roj4g0.apps.googleusercontent.com'
            })
            app.mount("#app");


