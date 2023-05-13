<script setup>
import { ref, inject } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import router from '@/router';
import { useStoreUser } from '@/store/users.store.js'
import useToasterNotify from '@/js/comman-function.js'

const cryoptojs = inject('cryptojs')

const storedUser = useStoreUser();
var getUserData = storedUser.getUserData();
let disableSubmit = ref(false);
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const password = ref('');
const confirm_password = ref('');

const schema = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required'),
  last_name: Yup.string()
    .required('Last Name is required'),
  email: Yup.string().email()
    .required('email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const todayDate = () => {
  const date = new Date();

  const getDay = (date.getDate() > 9 ? '' : '0')+date.getDate()
  const getMonth = ((date.getMonth() + 1) > 9 ? '' : '0')+date.getMonth()
  const getYear = date.getFullYear()
  const getHour = date.getHours()
  const getMinute = date.getMinutes()
  const getSecond = date.getSeconds()
  return getDay +"-"+ getMonth +"-"+ getYear +"-"+ getHour +":"+ getMinute +":"+ getSecond
}

function userExists(email) {
  return getUserData.some(function(el) {
      return el.email === email
  });
}

async function onSubmit(values) {
  values.createdAt  = todayDate()
  values.updatedAt  = todayDate()
  values.isActive   = 1
  values.is_google_login = 0
  values.password   = cryoptojs.AES.encrypt(values.password, "Secret Passphrase").toString()

  if(!userExists(values.email)) {
    disableSubmit = true;
    try {
      var register =  await storedUser.register(values);
      console.log(register);
      await router.push('/');
      useToasterNotify("success", "Registration successfully")
      disableSubmit = false;
    } catch (error) {
      console.log(error)
      useToasterNotify("error", "Registration faileds")
    }
  } else {
    useToasterNotify("error", "User already registered.")
  }
}

async function onInvalidSubmit(data) {
  let firstError = Object.keys(data.errors)[0];
  // firstError+'_value'.value.focus();
  document.getElementById(firstError).focus()
}

</script>
<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-full px-4 space-y-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <Form @submit="onSubmit" class="mt-8 space-y-6"  @invalid-submit="onInvalidSubmit" :validation-schema="schema" v-slot="{ errors }">
          <div class="w-full rounded-md shadow-sm">
            <div class="mt-6">
              <label for="first_name" class="sr-only">First name</label>
              <div>
                <Field ref="first_name_value" autofocus v-model="first_name" id="first_name" name="first_name" type="text" autocomplete="first_name"  :class="{ 'is-invalid': errors.firstName }"
                class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="First name" />
                <p class="text-left text-red-500">
                {{ errors.first_name }}
              </p>
            </div>
          </div>
          <div class="mt-6">
              <label for="last_name" class="sr-only">Last name</label>
              <Field v-model="last_name" id="last_name" name="last_name" type="text" autocomplete="last_name"  :class="{ 'is-invalid': errors.firstName }"
                class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Last name" />
              <p class="text-left text-red-500">{{ errors.last_name }}</p>
            </div>
            <div class="mt-6">
              <label for="email-address" class="sr-only">Email address</label>
              <Field v-model="email" id="email-address" name="email" type="email" autocomplete="email" required=""  :class="{ 'is-invalid': errors.firstName }"
                class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address" />
              <p class="text-left text-red-500">{{ errors.email }}</p>
            </div>
            <div class="mt-6">
              <label for="password" class="sr-only">Password</label>
              <Field v-model="password" id="password" name="password" type="password"  :class="{ 'is-invalid': errors.firstName }"
                autocomplete="current-password" required=""
                class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Password" />
              <p class="text-left text-red-500">{{ errors.password }}</p>
            </div>
            <div class="mt-6">
              <label for="password" class="sr-only">Confirm Password</label>
              <Field v-model="confirm_password" id="confirm_password" name="confirm_password" type="password"  :class="{ 'is-invalid': errors.firstName }"
                autocomplete="password" required=""
                class="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="confirm password" />
              <p class="text-left text-red-500">{{ errors.confirm_password }}</p>
            </div>
          </div>
          <div>
            <button
            :disabled="disableSubmit"
            class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
            :class="{
              'hover:bg-indigo-500' : !disableSubmit,
              'focus-visible:outline': !disableSubmit,
              'focus-visible:outline-2' : !disableSubmit,
              'focus-visible:outline-offset-2' : !disableSubmit,
              'focus-visible:outline-indigo-600' : !disableSubmit
          }"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true" />
              </span>
              Sign in
            </button>

            <p>Have an account ?
                <router-link
                :to="{ name : 'login' }"
                    class="h-3 text-lg text-indigo-500 hover:text-indigo-800 "
                >
                Login
                </router-link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>