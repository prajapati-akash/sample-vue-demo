<template>
    <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
        <div>
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <form @submit.prevent="submitLogin" class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
            <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input autofocus v-model="email" id="email-address" name="email" type="email" autocomplete="email" required="" class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" />
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
            </div>
            </div>

            <div class="flex items-center justify-between">
                <div class="text-sm">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
            </div>

            <div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
            </button>
            <p>Don't have an account?
                <router-link
                :to="{ name : 'register' }"
                    class="h-3 text-lg text-indigo-500 hover:text-indigo-800 "
                >
                Register
                </router-link>
                form here
            </p>
            </div>
        </form>
        <GoogleLogin />
        </div>
    </div>
</template>

<script setup>
import { ref, toRaw, inject } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { useStoreUser } from '@/store/users.store.js'
import { useAuthUser } from '@/store/auth.store';
import useToasterNotify from '@/js/comman-function.js'
import router from '@/router';
import GoogleLogin from '@/components/GoogleLogin.vue';

const cryoptojs = inject('cryptojs')

const email = ref('')
const password = ref('')
const loggedInUser = ref('');

const addUserAuth = useAuthUser();
const storedUser = useStoreUser();
var getAllUserData = storedUser.getUserData();

function userExists(getUserData, data) {

    getUserData.map(function(value) {
        let decryptPassword = null;

        decryptPassword = cryoptojs.AES.decrypt(value.password, "Secret Passphrase").toString(cryoptojs.enc.Utf8)

        if(value.email === data.email.value && decryptPassword == data.password.value && value.isActive == 1) {
            loggedInUser.value = toRaw(value);
        }
    });
}

const submitLogin = ( async () => {
    // console.log('submit data :-')
    var data = {
        email : email,
        password : password
    }

    var checkValidUser = userExists(getAllUserData, data)

    if(Object.keys(loggedInUser.value).length)
    {
        addUserAuth.userLoggedIn(loggedInUser.value)
        await router.replace('/home');
        useToasterNotify('success', 'User logged in successfully');
    }
    else {

        useToasterNotify('error', 'Incorrect email or password');
    }
    // console.log(registerUserLogin.addUserData( data ));
} )

</script>