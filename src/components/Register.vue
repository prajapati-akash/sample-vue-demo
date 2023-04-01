<template>
  <div class="container">
    <div class="row">
      <div class="col align-self-center col-3">
        <form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-3 col-md-6 col-sm-9">
                  <p>user name</p>
                  <input type="text"  name="user_name" v-model="user_name"/>
                  <!-- <div v-if="v$.name.$error">Name field has an error.</div> -->
                </div>
            </div>

            <div class="row">
                <div class="col-3 col-md-6 col-sm-9">
                  <p>email</p>
                  <input type="text"  name="email" v-model="email"/>
                  <!-- <div v-if="v$.name.$error">Name field has an error.</div> -->
                </div>
            </div>
            
            <div class="row">
                <div class="col-3 col-md-6 col-sm-9">
                  <p>password</p>
                  <input type="password"  name="password" v-model="password"/>
                  <!-- <div v-if="v$.name.$error">Name field has an error.</div> -->
                </div>
            </div>

            <div class="row">
                <div class="col-3 col-md-6 col-sm-9 pt-3">
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
  data() {
    return {
      v$: useVuelidate(),
      user_name : "",
      email : "",
      password : ""
    }
  },
  methods: {
    onSubmit(values) {
      console.log('console a submit button');
      console.log(values.type);
    }
  }
}
</script>