<template>
  <div class="container">
    <div class="row">
      <div class="col align-self-center">
        <form @submit.prevent="onSubmit">
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <label for="first_name" class="form-label" placeholder="name">user name</label>
                  <input type="text"  name="first_name" v-model="first_name" class="form-control"/>
                  <span v-if="v$.first_name.$error"> {{ v$.first_name.$errors[0].$message }}</span>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <label for="email" class="form-label">email</label>
                  <input type="text"  name="email" v-model="email" class="form-control"/>
                  <span v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }}</span>
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
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';

export default {
  data() {
    return {
      v$: useValidate(),
      first_name:'',
      email:'',
      password:'',
    }
  },
  validation(){
    return {
      first_name:{required},
      email:{required},
      password:{required},
    }
  },
  methods: {
    onSubmit() {
      this.v$.$validate();
      if(!this.v$.$error) {
        console.log('submit form');
      } else {
        console.log('form not submitted');
      }
    }
  }
}
</script>