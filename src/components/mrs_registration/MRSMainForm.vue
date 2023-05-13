<template>
  <div class="bg-white dark:bg-gray-800">
    <div class="mx-auto max-w-7xl">
      <Form @submit="submitForm" @invalid-submit="onInvalidSubmit">
        <div class="space-y-12 p-8">
          <div class="border-b border-gray-900/10 pb-2">
            <h1 class="text-4xl font-semibold text-gray-900 dark:text-white leading-9">Personal Information</h1>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

              <!-- VendorName :  -->
              <div class="sm:col-span-4">
                <label for="selectVendorName"
                  class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">INTERESTED TO
                  PROVIDE SUPPLIES :
                </label>
                <div class="mt-2">
                  <Field as="select" v-model="data.selectVendorName" id="selectVendorName" name="selectVendorName"
                    autocomplete="optionVendorName"
                    class="block w-full rounded-lg border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateSelectRequiredField">
                    <template v-if="vendorRecords">
                      <option value="">Select a vendor</option>
                      <option v-for="vendorRecord in vendorRecords" :value="vendorRecord.company_name"
                        :key="vendorRecord.account_id">
                        {{ vendorRecord.company_name }}
                      </option>
                    </template>
                    <template v-else>
                      <option value="">Loading...</option>
                    </template>
                  </Field>
                </div>
                <p class="text-left text-red-500">
                  <ErrorMessage name="selectVendorName" />
                </p>
              </div>
            </div>

            <!-- BUSINESS PROFILE Section heading -->
            <div class="border-b mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
              <div class="sm:col-span-3">
                <p class="text-xl w-full font-semibold">BUSINESS PROFILE</p>
              </div>
            </div>

            <!-- form inputs -->
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

              <!-- Bussiness name -->
              <div class="sm:col-span-4">
                <label for="bussiness_name"
                  class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">Bussiness
                  name :</label>
                <div class="mt-2">
                  <Field v-model="data.bussiness_name" type="text" name="bussiness_name" id="bussiness_name"
                    placeholder="Please enter bussiness name" autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateRequiredField" />
                  <p class="text-left text-red-500">
                    <ErrorMessage name="bussiness_name" />
                  </p>
                </div>
              </div>

              <!-- Registered Business Name -->
              <div class="sm:col-span-4 ">
                <label for="registered_bussiness_name"
                  class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">Registered Business
                  Name</label>
                <div class="mt-2">
                  <Field v-model="data.registered_bussiness_name" type="text" name="registered_bussiness_name"
                    id="registered_bussiness_name" autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateRequiredField" />
                  <p class="text-left text-red-500">
                    <ErrorMessage name="registered_bussiness_name" />
                  </p>
                </div>
              </div>

              <!-- Currency : -->
              <div class="sm:col-span-2">
                <!-- <InputCurrencyField
                      isRequired="true"
                      labelName="Currency"
                      :optionData="allCurrencyList"
                      fildName="currency"
                      v-model:data.currency="data.currency"
                    /> -->

                <label for="currency"
                  class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">Currency :
                </label>
                <div class="mt-2">
                  <Field as="select" v-model="data.currency" id="currency" name="currency" autocomplete="currency"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateSelectRequiredField">
                    <template v-if="allCurrencyList">
                      <option value="">Select a currency</option>
                      <option v-for="currency in allCurrencyList"
                        :value="currency.sc_isocode + ' (' + currency.sc_symbol + ')'" :key="currency.sc_sys_currency_id">
                        {{ currency.sc_isocode }} {{ "( " + currency.sc_symbol + " )" }}
                      </option>
                    </template>
                    <template v-else>
                      <option value="">Loading...</option>
                    </template>
                  </Field>
                </div>
                <p class="text-left text-red-500">
                  <ErrorMessage name="currency" />
                </p>

              </div>

              <!-- Date -->
              <div class="sm:col-span-2">
                <label for="date_of_incorporation"
                  class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">date of
                  incorporation : </label>
                <div class="mt-2">
                  <Field v-model="data.date_of_incorporation" type="date" name="date_of_incorporation"
                    id="date_of_incorporation" autocomplete="date_of_incorporation"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateDate" />
                  <p class="text-left text-red-500">
                    <ErrorMessage name="date_of_incorporation" />
                  </p>
                </div>
              </div>

              <!-- Form of Business -->
              <div class="sm:col-span-4">
                <label for="form_of_bussiness"
                  class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">Form of
                  Business</label>
                <div class="mt-2">
                  <Field as="select" v-model="data.form_of_bussiness" id="form_of_bussiness" name="form_of_bussiness"
                    autocomplete="form_of_bussiness"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateSelectRequiredField">
                    <template v-if="formOfBussinessList.length > 0">
                      <option value="">Select a form of bussiness</option>
                      <option v-for="formOfBussiness in formOfBussinessList" :value="formOfBussiness.child_enum_slug"
                        :key="formOfBussiness.id">
                        {{ formOfBussiness.label }}
                      </option>
                    </template>
                    <template v-else>
                      <option value="">Loading...</option>
                    </template>
                  </Field>
                  <p class="text-left text-red-500">
                    <ErrorMessage name="form_of_bussiness" />
                  </p>
                </div>
              </div>

              <!-- Type of bussiness pending: -->
              <div class="sm:col-span-4">
                <label for="currency"
                  class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">Type of
                  bussiness : </label>
                <div class="mt-2">
                  <Field as="select" v-model="data.type_of_bussiness" id="type_of_bussiness" name="type_of_bussiness"
                    autocomplete="type_of_bussiness"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateSelectRequiredField" multiple>
                    <template v-if="typeOfBussinessList.length > 0">
                      <option value="">Select a type of bussiness</option>
                      <option v-for="typeOfBussiness in typeOfBussinessList" :value="typeOfBussiness.child_enum_slug"
                        :key="typeOfBussiness.id">
                        {{ typeOfBussiness.label }}
                      </option>
                    </template>
                    <template v-else>
                      <option value="">Loading...</option>
                    </template>
                  </Field>
                </div>
                <p class="text-left text-red-500">
                  <ErrorMessage name="currency" />
                </p>
              </div>

            </div>
            <!-- END BUSINESS PROFILE Section heading -->

            <!-- COMMUNICATION INFORMATION Section heading -->
            <div class="border-b mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
              <div class="sm:col-span-8">
                <p class="text-xl w-full font-semibold">COMMUNICATION INFORMATION</p>
              </div>
            </div>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

              <!-- Email address -->
              <div class="sm:col-span-2">
                <label for="email" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Email :
                </label>
                <div class="mt-2">
                  <Field v-model="data.email" type="text" name="email" id="email" autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateEmail" />
                  <!-- rules="required|min:0,100" -->
                  <p class="text-left text-red-500">
                    <ErrorMessage name="email" />
                  </p>
                </div>
              </div>

              <!-- Website Url -->
              <div class="sm:col-span-2">
                <label for="website_url"
                  class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  Website URL :
                </label>
                <div class="mt-2">
                  <Field v-model="data.website_url" type="url" name="website_url" id="website_url"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    :rules="validateUrlField" />
                  <p class="text-left text-red-500">
                    <ErrorMessage name="website_url" />
                  </p>
                </div>
              </div>

              <!-- Mobile : -->
              <div class="sm:col-span-2">
                <label for="mobile" class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">
                  Mobile :
                </label>
                <div class="flex">
                  <div class="w-24 mt-2">
                    <Field as="select" v-model="data.mobile_country" placeholder="select country" id="mobile_country"
                      name="mobile_country" autocomplete="mobile_country"
                      class="block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      :rules="validateSelectRequiredField">
                      <template v-if="countryList">
                        <option value="">select Country</option>
                        <option v-for="(type, index) in countryList" :value="type.mc_country_code" :key="index">
                          {{ type.mc_country.charAt(0).toUpperCase() + type.mc_country.slice(1) }}
                        </option>
                      </template>
                      <template v-else>
                        <option value="">Loading...
                          <Spinner />
                        </option>
                      </template>
                    </Field>
                    <p class="text-left text-red-500">
                      <ErrorMessage name="mobile_country" />
                    </p>
                  </div>
                  <div class="w-5 mt-2 pl-2">
                    <Field v-model="data.mobile_number" type="number" name="mobile_number" id="mobile_number"
                      autocomplete="mobile_number"
                      class="block w-52 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      :rules="validateMobileField" />
                    <p class="text-left text-red-500 w-52">
                      <ErrorMessage name="mobile_number" />
                    </p>
                  </div>
                </div>
              </div>

              <!-- FaxNumber : -->
              <div class="sm:col-span-2">
                <label for="mobile" class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">
                  Fax Number :
                </label>
                <div class="flex">
                  <div class="w-24 mt-2">
                    <Field as="select" v-model="data.fax_country" id="fax_country" name="fax_country"
                      autocomplete="fax_country"
                      class="block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      :rules="validateSelectRequiredField">
                      <template v-if="countryList">
                        <option value="">Country</option>
                        <option v-for="(type, index) in countryList" :value="type.mc_country_code" :key="index">
                          {{ type.mc_country.charAt(0).toUpperCase() + type.mc_country.slice(1) }}
                        </option>
                      </template>
                      <template v-else>
                        <option value="">Loading...</option>
                      </template>
                    </Field>
                    <p class="text-left text-red-500">
                      <ErrorMessage name="fax_country" />
                    </p>
                  </div>
                  <div class="w-5 mt-2 pl-2">
                    <Field v-model="data.fax_number" type="number" name="fax_number" id="fax_number"
                      autocomplete="fax_number"
                      class="block w-52 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      :rules="validateMobileField" />
                    <p class="text-left text-red-500 w-52">
                      <ErrorMessage name="fax_number" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- END COMMUNICATION INFORMATION Section heading -->
          </div>

          <!-- stat contact person -->
          <div id="contact_person_scroll">
            <Notification :error="error.contactError" />

            <MRSContact componentTitle="CONTACT PERSON" :countryList="countryList" :IsDefaultList="IsDefaultList"
              @complete-contact="addContactPerson" />
          </div>
          <!-- end contact person -->

          <!-- stat corresponding Address  -->
          <div id="corresponding_address_scroll">
            <Notification :error="error.addressError" />
            <MRSAddress componentTitle="CORRESPONDING ADDRESS" :countryList="countryList" :isDefaultList="IsDefaultList"
              @complete-address="addCorrespondingAddress" />
          </div>
          <!-- end corresponding Address  -->

          <!-- start Tax information  -->
          <div id="tax_information_scroll">
            <Notification :error="error.taxInformatinError" />
            <MRSTaxInformation componentTitle="TAX INFORMATION" @complete-tax-information="addTaxInformation" />
          </div>
          <!-- end Tax information  -->

          <!-- start bank information  -->
          <div id="bank_information_scroll">
            <Notification :error="error.bankInformationError" />
            <MRSBankInformation componentTitle="BANKING INFORMATION" :currencyList="allCurrencyList"
              :countryList="countryList" :isDefaultList="IsDefaultList" @complete-bank-information="addBankInformation" />
          </div>
          <!-- end bank information  -->

          <!-- start Document  -->
          <div id="document_scroll">
            <Notification :error="error.documentError" />
            <MRSDocument componentTitle="Document" :isDefaultList="IsDefaultList"
              @complete-document="addDocumentInformation" />
          </div>
          <!-- end Document  -->

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6 pr-8">
          <button type="reset" class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Reset</button>
          <button type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import MRSContact from '@/components/mrs_registration/MRSContact.vue';
import MRSAddress from '@/components/mrs_registration/MRSAddress.vue';
import MRSTaxInformation from '@/components/mrs_registration/MRSTaxInformation.vue';
import MRSBankInformation from '@/components/mrs_registration/MRSBankInformation.vue';
import MRSDocument from '@/components/mrs_registration/MRSDocument.vue';
import InputCurrencyField from '@/components/InputCurrencyField.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useMasterRecord } from '@/api/MasterRecord.js'
import axios from 'axios'
import Notification from '@/components/Notification.vue';
import useToasterNotify from '@/js/comman-function.js'
import { Spinner } from 'flowbite-vue'

const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;

export default {
  setup() {
    const vendorNameMethod = ref('vendor_registration_company_list')
    const currencyMethod = ref('get_all_curreny_list')
    const countryMethod = ref('country_list')
    const { api_response: vendorRecords } = useMasterRecord(vendorNameMethod.value)
    const { api_response: allCurrencyList } = useMasterRecord(currencyMethod.value)
    const { api_response: countryList } = useMasterRecord(countryMethod.value)

    return {
      vendorRecords,
      allCurrencyList,
      countryList
    }
  },
  name: 'App',
  components: {
    MRSContact,
    MRSAddress,
    MRSTaxInformation,
    MRSBankInformation,
    MRSDocument,
    InputCurrencyField,
    Field,
    Form,
    ErrorMessage,
    Notification,
    Spinner
  },
  data() {
    const bussiness_name = ref("");
    return {
      data: {
        bussiness_name,
        registered_bussiness_name: bussiness_name,
        currency: "",
        selectVendorName: "",
        date_of_incorporation: "",
        form_of_bussiness: "",
        type_of_bussiness: "",
        website_url: "",
        mobile_country: "",
        mobile_number: "",
        fax_country: "",
        fax_number: "",
        email: "",
        contactPersionList: [],
        addressList: [],
        texInformation: [],
        bankInformation: [],
        document: [],
      },
      formOfBussinessList: [],
      typeOfBussinessList: [],
      IsDefaultList: [],
      error: {
        contactError: "",
        addressError: "",
        taxInformatinError: "",
        bankInformationError: "",
        documentError: "",
      },
    }
  },
  created() {
    this.loadAPIResponseData("GEN_2102_1021", "formOfBussinessList");
    this.loadAPIResponseData("GEN_2102_1022", "typeOfBussinessList");
    this.loadAPIResponseData("GEN_2010_1004", "IsDefaultList");
  },
  methods: {
    loadAPIResponseData(enum_code, bind_params) {
      axios.get(`${VUE_APP_BASE_API}method=get_master_enum_data&enum_code=${enum_code}`)
        .then((res) => {
          if (res.data.settings.success == "1") {
            this[bind_params] = res.data.data.child_data;
          }
          else {
            this[bind_params] = [];
          }
        });
    },
    submitForm(values) {
      if (this.data.contactPersionList.length == 0) {
        this.error.contactError = "Please enter contact details.";
        useToasterNotify("error", "Please enter contact details.")

        let element = document.getElementById("contact_person_scroll")

        if (element) {
          element.scrollIntoView();
        }

      } else if (this.data.addressList.length == 0) {
        this.error.addressError = "Please enter address details";
        useToasterNotify("error", "Please enter address details")

        let element = document.getElementById("corresponding_address_scroll")

        if (element) {
          element.scrollIntoView();
        }
      } else if (this.data.texInformation.length == 0) {
        this.error.taxInformatinError = "Please enter text information details";
        useToasterNotify("error", "Please enter text information details")

        let element = document.getElementById("tax_information_scroll")

        if (element) {
          element.scrollIntoView();
        }
      } else if (this.data.bankInformation.length == 0) {
        this.error.bankInformationError = "Please enter bank information details";
        useToasterNotify("error", "Please enter bank information details")

        let element = document.getElementById("bank_information_scroll")

        if (element) {
          element.scrollIntoView();
        }
      } else if (this.data.document.length == 0) {
        this.error.documentError = "Please enter document details";
        useToasterNotify("error", "Please enter document details")

        let element = document.getElementById("document_scroll")

        if (element) {
          element.scrollIntoView();
        }
      }
      else {
        useToasterNotify("success", "Registration successfully")
        console.log(JSON.parse(JSON.stringify(this.data)))
      }
    },
    onInvalidSubmit(data) {
      let firstError = Object.keys(data.errors)[0];
      document.getElementById(firstError).focus()
    },
    validateRequiredField(value) {
      if (!value) {
        return 'This field is required.';
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
    validateUrlField(value) {
      if (!value) {
        return 'This field is required';
      }

      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

      if (!pattern.test(value)) {
        return "Please enter a valid url";
      }

      return true;
    },
    validateMobileField(value) {
      if (!value) {
        return 'This field is required';
      }
      if (isNaN(value)) {
        return "Please enter a only valid number"
      }

      if (value < 0) {
        return "Please enter a only valid number !"
      }
      return true;
    },
    validateSelectRequiredField(value) {
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
      if (value > CurrentDate || value === CurrentDate) {
        return 'Please select a date today or before the current date.';
      }

      return true;
    },
    addContactPerson(contactData) {
      this.data.contactPersionList = [];
      console.log('add contact person details: ')
      this.error.contactError = "";
      contactData.map((value) => {
        this.data.contactPersionList.push({
          contact_email: value.contact_email,
          contact_name: value.contact_name,
          contact_title: value.contact_title,
          whatsapp_number_country: value.whatsapp_number_country,
          whatsapp_number: value.whatsapp_number,
          gender: value.gender,
          is_default: value.is_default,
          mobile_country: value.mobile_country,
          contact_person_mobile: value.contact_person_mobile,
          designation: value.designation,
        })
      });
    },
    addCorrespondingAddress(addressData) {
      this.data.addressList = [];
      console.log('add address : ')
      this.error.addressError = "";
      addressData.map((value) => {
        this.data.addressList.push({
          corresponding_address: value.corresponding_address,
          corresponding_address_city: value.corresponding_address_city,
          corresponding_address_country: value.corresponding_address_country,
          corresponding_address_district: value.corresponding_address_district,
          corresponding_address_region: value.corresponding_address_region,
          corresponding_address_state: value.corresponding_address_state,
          corresponding_postcode: value.corresponding_postcode,
          is_default_address: value.is_default_address,
          location_name: value.location_name,
          location_type: value.location_type,
        })
      });
    },
    addTaxInformation(taxInfomationData) {
      console.log("add tax information :")
      this.error.taxInformatinError = "";
      this.data.texInformation = [];

      taxInfomationData.map((value) => {
        this.data.texInformation.push({
          tax_name: value.tax_name,
          tax_number: value.tax_number,
          tax_type: value.tax_type,
          tax_description: value.tax_description,
        })
      });
    },
    addBankInformation(bankInformationData) {
      this.data.bankInformation = []
      this.error.bankInformationError = "";

      console.log('add bank information : ')

      bankInformationData.map((value) => {
        this.data.bankInformation.push({
          bank_name: value.bank_name,
          account_number: value.account_number,
          is_default: value.is_default,
          currency: value.currency,
          branch_name: value.branch_name,
          branch_code: value.branch_code,
          iban: value.iban,
          swift: value.swift,
          bank_address: value.bank_address,
          country: value.country,
          region: value.region,
          state: value.state,
          lga_district: value.lga_district,
          city: value.city,
          post_code: value.post_code,
        })
      });
    },
    addDocumentInformation(documentData) {
      this.data.document = []
      this.error.documentError = ""
      console.log('document attachment : ')

      documentData.map((value) => {
        this.data.document.push({
          document_name: value.document_name,
          document_category: value.document_category,
          expiry_date: value.expiry_date,
          document_remarks: value.document_remarks,
          is_expirable: value.is_expirable,
          document_attachments: value.document_attachments,
        })
      });
    }
  },
}
</script>
  
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>