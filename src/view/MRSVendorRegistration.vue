<template>
  <div class="studentForm">
      <MRSMainForm />
  </div>
</template>
<script>
import MRSMainForm from '@/components/mrs_registration/MRSMainForm.vue';
import { useAuthUser } from '@/store/auth.store'
import router from '@/router';

export default {
    components : {
      MRSMainForm,
    },
    methods: {
    },
}
</script>