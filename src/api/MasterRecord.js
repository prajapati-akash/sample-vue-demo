// mouse.js
import { ref, onMounted, isRef, watchEffect } from "vue";
import axios from "axios";
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;

export function useMasterRecord(method, enum_code = null) {
  let api_response = ref(null);

  async function getVendorRecords() {
    // api_response.value = null;

    var full_url = VUE_APP_BASE_API;
    if(method) {
      full_url += `method=${method}`;
    }

    if(enum_code != null) {
      full_url += `&enum_code=${enum_code}`;
    }

    let response = await axios.get(full_url);

    if (response.status == 200) {
      if(response.data.hasOwnProperty("settings")) {
        if(response.data.settings.success && response.data.data) {
          api_response.value = response.data.data;
        } else {
        }
      } else {
      }
    } else {

    }
  }

  getVendorRecords();

  return { api_response };
}
