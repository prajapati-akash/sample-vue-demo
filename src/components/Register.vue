<template>
  <div class="container">
    <div class="row">
      <div class="col align-self-center">
        <form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <label for="first_name" class="form-label" placeholder="name">user name</label>
                  <input 
                  type="text"
                  name="first_name"
                  v-model="v$.first_name.$model"
                  class="form-control"
                  @blur="v$.first_name.$touch"
                  />
                  <div class="text-danger" v-for="(error, index) of v$.first_name.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                  <span v-if="$v.first_name.$error">Name field has an error</span>

                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <label for="email" class="form-label">email</label>
                  <input type="text"  name="email" v-model="v$.email.$model" class="form-control"/>
                  <div class="text-danger" v-for="(error, index) of v$.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <label for="password" class="form-label">password</label>
                  <input type="password"  name="password" v-model="password" class="form-control"/>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12 pt-3">
                  <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 bd-highlight">
                      <button class="btn btn-primary">Submit</button>
                    </div>
                    <div class="p-2 bd-highlight">
                      <button type="reset" class="btn btn-secondary">Reset</button>
                    </div>
                  </div> 
                </div>
            </div>           
          </form>
        </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'Register',
  props: {
    
  },
  components : {
    useVuelidate,
    required,
    email
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      first_name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    onSubmit() {
      console.log('console a submit button');
      
      console.log(typeof this.v$.$validate());
    }
  },
  validations () {
    return {
      first_name: { 
        required
      },
      email: { 
        required
      }
    }
  }
}
</script>