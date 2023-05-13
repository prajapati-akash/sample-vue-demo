<template>
    <div class="">
        <h2 class="lg:pl-20 sm:pl-0 pt-6"><span class="text-3xl">Welcome</span>,<span class="pl-2 font-bold"> {{ auth_user.first_name }} {{ auth_user.last_name  }}</span></h2>
        <p class="lg:text-center text-3xl sm:pt-3">Home Page</p>
    </div>
</template>


<!-- both are working  -->

<!-- <script setup>
import { useAuthUser } from '@/store/auth.store';
const auth_user = useAuthUser().user_logged_in
</script> -->

<script>
import { useAuthUser } from '@/store/auth.store';
// const encryptedText = this.$CryptoJS.AES.encrypt("Hi There!", "Secret Passphrase").toString()

export default {
    data () {
        return {
            auth_user: null
        }
    },
    created() {
        const auth_user = useAuthUser().user_logged_in
        this.auth_user = auth_user;
    },
}

</script>