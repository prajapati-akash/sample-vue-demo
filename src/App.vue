<template>
  <!-- Loader Page -->
  <!-- <div v-if="isLoading"> -->
    <!-- <Loader /> -->
  <!-- </div> -->
  <div v-show="auth_user.user_logged_in">
    <Header />
  </div>
  <main>
    <div class="mx-auto max-w-full py-0 sm:px-0 lg:px-0 p-9">
      <RouterView />
    </div>
  </main>
  <div v-show="auth_user.user_logged_in">
    <Footer />
  </div>
</template>
<script >
import Header from '@/components/Header.vue';
import Loader from './components/Loader.vue';
import { useAuthUser } from '@/store/auth.store';
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Loader,
    Footer,
  },
  data() {
    return {
      auth_user: { suser_logged_in: null },
      onLine: navigator.onLine,
      showBackOnline: false,
    }
  },
  methods: {
  },
  computed: {
  },
  mounted() {
    this.auth_user = useAuthUser()
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();

    this.$router.beforeEach((to, from, next) => {

      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;

        this.$Progress.parseMeta(meta);
      }

      this.$Progress.start();

      next();
    });

    this.$router.afterEach((to, from) => {

      this.$Progress.finish();
    });
  },
}
</script>

<style scoped>
#app {
  width: fit-content !important;
}
</style>