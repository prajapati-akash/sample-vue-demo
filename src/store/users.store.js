import { defineStore } from "pinia";

export const useStoreUser = defineStore('users_list', {
    state: () =>{
        return {
            user_data : []
        }
    },
    actions : {
        register(data) {
            console.log("pinia store add registered data ");
            this.user_data.push(data);
        },
        getUserData() {
            return this.user_data;
        }
    },
    persist: true,
});