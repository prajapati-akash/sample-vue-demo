<script setup>
import { ref, toRaw } from 'vue';
import { decodeCredential } from 'vue3-google-login'
import useToasterNotify from '@/js/comman-function.js'
import { useStoreUser } from '@/store/users.store.js'
import { useAuthUser } from '@/store/auth.store';
import router from '@/router';

const addUserAuth = useAuthUser();
const storedUser = useStoreUser();
const getAllUserData = storedUser.getUserData();
const loggedInUser = ref('');

const callback = (response) => {

    const userData = decodeCredential(response.credential)

    var userLogin = {
        email   : userData.email,
        first_name      : userData.family_name,
        isActive    : 1,
        last_name   : userData.given_name,
        picture   : userData.picture,
        is_google_login : 1
    }

    userExists(getAllUserData, userLogin)

    console.log(Object.keys(loggedInUser.value).length)
    if(Object.keys(loggedInUser.value).length)
    {
        addUserAuth.userLoggedIn(userLogin)
        router.push('/home');
        useToasterNotify('success', 'User logged in successfully');
    }
    else {
        storedUser.register(userLogin)
        addUserAuth.userLoggedIn(userLogin)
        router.push('/home');
        useToasterNotify('success', 'User logged in successfully');
    }
}

function userExists(getUserData, data) {
    getUserData.map(function(item) {
        if(item.email === data.email && item.isActive == 1) {
            loggedInUser.value = toRaw(item);
        }
    });
}
</script>

<template>
    <GoogleLogin :callback="callback" prompt auto-login/>
</template>