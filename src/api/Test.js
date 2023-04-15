import { ref, reactive, onMounted, onUnmounted } from 'vue'
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;
import axios from 'axios';
const users = 'http://192.168.30.181/procurement/api?method=vendor_registration_company_list';

export function useMouse(method, enum_code = null) {
    let x = ref("test")

    async function update() { 

        var full_url = VUE_APP_BASE_API;
        if(method) {
            full_url += `method=${method}`;
        }

        if(enum_code != null) {
        full_url += `&enum_code=${enum_code}`;
        }
        var response_array = "";

        response_array = await axios.get(full_url)

        console.log("response_array")
        console.log(response_array)
        x.value = "helllo";
    }


    console.log('full_url');
    console.log(full_url);
    return {
        x
    }
}