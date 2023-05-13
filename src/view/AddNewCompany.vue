<template>
  <AddNewCompanyForm />
</template>
<script>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import useToasterNotify from '@/js/comman-function.js'
import AddNewCompanyForm from '@/components/AddNewCompany/Form.vue'

const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;

export default {
  name: 'AddNewCompany',
  components: {
    AddNewCompanyForm,
  },
  data() {
    return {
      openTab: 1,
      visitedTab : []
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>