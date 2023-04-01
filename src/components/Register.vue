<template>
  <div class="hello">
    <div class="row">
        <form @submit.prevent="onSubmit">
          <div class="col-3">
            <p>user name</p>
            <input type="text"  name="user_name" v-model="user_name"/>
            <p>email</p>
            <input type="text"  name="email" v-model="email"/>
            <p>password</p>
            <input type="password"  name="password" v-model="password"/>

            <button class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  props: {
    
  },
  components : {
  },
  data() {
    return {
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