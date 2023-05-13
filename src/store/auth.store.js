import { defineStore } from "pinia";
import { ref } from "vue";
// import router from "@/router";

export const useAuthUser = defineStore('logged_in', {
    state: () =>{
        return {
            user_logged_in : JSON.parse(localStorage.getItem('user')),
            // user_logged_in : ref(null),
        }
    },
    actions : {
        userLoggedIn(data) {
            this.user_logged_in = data;
            localStorage.setItem('user', JSON.stringify(data));
        },
        getuserLoggedIn() {
            return this.user_logged_in;
        },
        logout() {
            this.user_logged_in = null;
            localStorage.removeItem('user');
        }
    },
    persist: true,
});