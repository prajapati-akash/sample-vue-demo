<template>
  <div class="bg-white">
      <div class="mx-auto max-w-12xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8 bg-gray-100">
          <div class="mx-auto max-w-6xl bg-gray-200 p-14">
              <Form @submit="submitForm">
                  <div class="space-y-12">
                      <div class="border-b border-gray-900/10 pb-2">
                          <h1 class="text-4xl font-semibold leading-7 text-gray-900">Personal Information</h1>
                      </div>

                      <div class="border-b border-gray-900/10 pb-12">
                          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div class="sm:col-span-3">
                                  <label for="first_name" class="text-left block text-lg font-medium leading-6 text-gray-900">First name :</label>
                                  <div class="mt-2">
                                      <Field 
                                          v-model="data.first_name"
                                          type="text"
                                          name="first_name"
                                          id="first_name"
                                          autocomplete="given-name"
                                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          :rules="validateFirstName"
                                      />
                                      <!-- rules="required|min:0,100" -->
                                      <p class="text-left text-red-500"><ErrorMessage name="first_name" /></p>
                                  </div>
                              </div>

                              <div class="sm:col-span-3">
                                  <label for="last-name" class="text-left block text-lg font-medium leading-6 text-gray-900">Last name</label>
                                  <div class="mt-2">
                                      <Field
                                          v-model="data.last_name"
                                          type="text"
                                          name="last_name"
                                          id="last_name"
                                          autocomplete="family-name"
                                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          :rules="validateLastName"
                                      />
                                      <p class="text-left text-red-500"><ErrorMessage name="last_name" /></p>
                                  </div>
                              </div>

                              <div class="sm:col-span-3">
                                  <label for="email" class="text-left text-lg block font-medium leading-6 text-gray-900">Email address : </label>
                                  <div class="mt-2">
                                      <Field
                                          v-model="data.email"
                                          id="email"
                                          name="email"
                                          type="email"
                                          autocomplete="email"
                                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          :rules="validateEmail"
                                      />
                                      <p class="text-left text-red-500"><ErrorMessage name="email" /></p>
                                  </div>
                              </div>

                              <div class="sm:col-span-3">
                                  <label for="selectVendorName" class="text-left block text-lg font-medium leading-6 text-gray-900">VendorName : </label>
                                  <div class="mt-2">
                                      <Field as="select"
                                          v-model="data.selectVendorName"
                                          id="selectVendorName"
                                          name="selectVendorName"
                                          autocomplete="optionVendorName"
                                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          :rules="validateVendorName"
                                      >
                                        <option value="">Select a City</option>
                                        <option
                                          v-for="(name, index) in vendorName"
                                          :value="name.vendorName"
                                          :key="index"
                                        >{{  name.vendorName }}</option>
                                      </Field>
                                  </div>
                                  <p class="text-left text-red-500"><ErrorMessage name="selectVendorName" /></p>
                              </div>

                              <div class="sm:col-span-2">
                                  <label for="date" class="text-left block text-lg font-medium leading-6 text-gray-900">Date : </label>
                                  <div class="mt-2">
                                      <Field
                                          v-model="data.date"
                                          type="date"
                                          name="date"
                                          id="date"
                                          autocomplete="date"
                                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          :rules="validateDate"
                                      />
                                      <p class="text-left text-red-500"><ErrorMessage name="date" /></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="text-left" v-if="error.contactError">
                        <span class="text-left text-red-600" >{{ error.contactError }}</span>
                      </div>

                      <Contact componentTitle="Contact person" @complete-contact="updateContact"/>
                      <div class="text-left" v-if="error.addressError">
                        <span class="text-left text-red-600" >{{ error.addressError }}</span>
                      </div>
                      <Address componentTitle="Address person" @complete-address="updateAddress"/>
                  </div>

                  <div class="mt-6 flex items-center justify-end gap-x-6 pr-8">
                      <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">Reset</button>
                      <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                  </div>
              </Form  >
          </div>
      </div>
  </div>
</template>

<script>
import Contact from '@/components/Contact.vue';
import Address from '@/components/Address.vue';
import { Field, Form, ErrorMessage} from 'vee-validate';
import axios from 'axios'
import 'vue3-toastify/dist/index.css';


export default {
  name: 'App',
  components: {
    Contact,
    Address,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      data : {
        first_name : "",
        last_name : "",
        email : "",
        selectVendorName: "",
        date:"",
        contactList : [],
        addressList : [],
      },
      vendorName : [],
      error : {
          contactError : "",
          addressError : "",
      },
    }
  },
  created() {
    this.loadVendorName();
  },
  methods : {
    loadVendorName() {
      axios.get("https://mocki.io/v1/ab6f47fa-033e-4b99-b8de-5425530fa779")
        .then((res) => {
          if(res.data.response_code == 200) {
            this.vendorName = res.data.data;
          }
          else {
            this.vendorName = [];
          }
        });
    },
    submitForm(values) {
      this.error.contactError = "";
      this.error.addressError = "";

      if(this.data.contactList.length == 0) {
        this.error.contactError = "Please enter contact details.";
        // toast.error("please enter contact details", {
        //   // toast options here
        // });
      }else if(this.data.addressList.length == 0) {
          this.error.addressError = "Please enter address details";
        //   toast.error(this.error.addressError, {
        //   // toast options here
        // });
      }
      else {
        console.log('Final Submission :');
        console.log(JSON.parse(JSON.stringify(this.data)))
      }
    },
    validateFirstName(value) {
      if (!value) {
        return 'This first name is required.';
      }
      return true;
    },
    validateLastName(value) {
      if (!value) {
        return 'This field is required';
      }
      return true; 
    },
    validateEmail(value) {
      if (!value) {
        return 'This field is required';
      }
      
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }

      return true;
    },
    validateVendorName(value) {
      if (!value) {
        return 'This field is required';
      }
      return true;
    },    
    validateDate(value) {
      if (!value) {
        return 'This field is required';
      }
      
      var CurrentDate = new Date();
      value = new Date(value);
      if(value > CurrentDate || value === CurrentDate){
          return 'Please select a date today or before the current date.';
      }

      return true;
    },
    updateContact(contactData){
      this.data.contactList = [];
      contactData.map((contactData) => {
        this.data.contactList.push({
            mobile_number : contactData.mobile_number,
            second_email : contactData.second_email,
          })
      });
    },
    updateAddress(addressData) {
      this.data.addressList = [];
      addressData.map((addressData) => {
        this.data.addressList.push({
            address : addressData.address,
            dist : addressData.dist,
            state : addressData.state
          })
      });
    }
  }
}
</script>