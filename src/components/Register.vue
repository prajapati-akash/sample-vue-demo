<template>
  <div id="app">
    <Form @submit="onSubmit">
      <Field name="email" v-model="email" type="email" :rules="validateEmail" />
      <ErrorMessage name="email" class="text-danger" />
      <br>
      <button>Sign up</button>
    </Form>
  </div>
</template>
<script>
import { Form, Field,ErrorMessage  } from 'vee-validate';
export default {
  components: {
    Form,
    Field,
    ErrorMessage 
  },
  data() {
    return {
      email : "",
    }
  },
  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2));
      console.log('email');
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      // All is good
      return true;
    },
  },
  beforeCreate() {
    alert("beforeCreate");

  },
  created() {
    alert("created");

  },
  mounted() {
    alert("mounted");

  },
  beforeMount() {
    alert("beforeMount");

  },
  beforeUpdate() {
    alert("beforeUpdate");

  },
  updated() {
    alert("updated");

  },
  beforeUnmount() {
    alert("beforeUnmount");
    
  },
  unmounted() {
    alert("unmounted");
    
  },
  activated() {
    alert("activated");
    
  },
  deactivated() {
    alert("deactivated");
    
  }
};
</script>