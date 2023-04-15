<template>
  <NavBar>
    <router-view/>
  </NavBar>
</template>
<script >
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods : {
  },
  computed: {
  },
  mounted() {
  }
}
</script>

<style scoped>
#app {
  width: fit-content !important;
}
</style>