<template>
    <!-- Heading -->

    <div class="flex justify-end border-b border-gray-900/10 items-center">
        <div class="flex-auto">
            <h2 class="text-left block text-xl font-semibold leading-7 text-gray-900">{{ componentTitle }} :</h2>
        </div>
        <div class="flex-auto text-end">
            <button
            type="button"
            class="border border-black bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded float-right flex"
            @click="toggleModel('AddToggleModel')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                 Add New
            </button>
        </div>
    </div>

    <!-- List Table -->
    <div class="flex-full">
        <div class="border-gray-900/10 pb-12 border-b flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <TableHeader
                                :tableHeadingData="tableHeadingData"
                            />
                            <tbody class="border-b">
                                <tr v-if="taxInformation.length > 0" v-for="(value, index) in taxInformation" v-bind:key="value.id" class="bg-gray-100 border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.tax_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.tax_number }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.tax_type }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.tax_description }}
                                    </td>
                                    <td class="flex text-sm text-end text-gray-900 font-light px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            type="button"
                                            @click="onEditForm(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            @click="deleteSelectedListData(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td colspan="9" class="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900 text-center">
                                        <p>No record found!</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Model Main modal -->
    <div v-if="AddToggleModel"
        class="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
        >
        <div class="relative w-full h-full max-w-2xl md:h-full sm:p-5">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{  newForm ? "Add" : "Edit" }} Tax Information
                    </h3>
                    <button
                        type="button"
                        @click="toggleModel('AddToggleModel')"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <Form @submit="onSumbit" ref="addressRefForm" id="AddressForm" v-slot="{ isSubmitting }">
                        <div class="space-y-12">
                            <div class="pb-12">

                                <!-- Tax Name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="tax_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Tax Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="tax_name"
                                                id="tax_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tax Number (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="tax_number" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Tax Number <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="tax_number"
                                                id="tax_number"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_number" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tax Type ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="tax_type" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Location Type <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="tax_type"
                                                name="tax_type"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="taxType" v-for="(item, index) in taxType" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_type" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tax Description -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="tax_description" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Description:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="textarea"
                                                rows="3"
                                                name="tax_description"
                                                id="tax_description"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_description" /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="flex items-center pt-6 pb-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                :disabled="isSubmitting"
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                Submit
                            </button>
                            <button
                                @click="toggleModel('AddToggleModel')"
                                type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Decline
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="AddToggleModel" class="opacity-70 fixed inset-0 z-40 bg-gray-900 -top-12"></div>

    <!-- Edit Model -->
    <div  v-if="editToggleModel" id="EditAddressModalOpen"
        class="flex fixed justify-center items-center hs-overlay w-full h-full top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div class="relative w-full h-full max-w-2xl md:h-full sm:p-5">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Tax Information
                    </h3>
                    <button
                        @click="toggleModel('editToggleModel')"
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <Form @submit="updateForm" :id="'editForm_'+editFormData.id" v-slot="{ isSubmitting }">
                        <div class="space-y-12">
                            <div class="pb-12">

                                <!-- Tax Name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="tax_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Tax Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.tax_name"
                                                type="text"
                                                name="tax_name"
                                                id="tax_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tax Number (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="tax_number" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Tax Number <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.tax_number"
                                                type="text"
                                                name="tax_number"
                                                id="tax_number"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_number" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tax Type ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="tax_type" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Location Type <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.tax_type"
                                                as="select" id="tax_type"
                                                name="tax_type"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="taxType" v-for="(item, index) in taxType" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_type" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tax Description -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="tax_description" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Description:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.tax_description"
                                                as="textarea"
                                                rows="3"
                                                name="tax_description"
                                                id="tax_description"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="tax_description" /></p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <Field
                                type="hidden"
                                name="id"
                                v-model="editFormData.id"
                            />
                        </div>

                        <!-- Modal footer -->
                        <div class="flex items-center pt-6 pb-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                :disabled="isSubmitting"
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Submit
                            </button>
                            <button
                                type="button"
                                id="hideEditAddAddressModel"
                                @click="toggleModel('editToggleModel')"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Decline
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editToggleModel" class="opacity-70 fixed inset-0 z-40 bg-gray-900 -top-12"></div>

</template>


<script>
import { initFlowbite } from 'flowbite'
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import { toast } from 'vue3-toastify';
import TableHeader from '../TableHeader.vue'
import 'vue3-toastify/dist/index.css';

import axios from 'axios';
import RequiredAstrik from '../RequiredAstrik.vue';
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;

export default{
    props: {
        componentTitle : {
            type :String,
            required:true,
            default: "Corresponding Address",
        },
    },
    emits: ["completeTaxInformation"],
    components : {
        Form,
        Field,
        ErrorMessage,
        RequiredAstrik,
        TableHeader
    },
    data() {
        return {
            taxInformation : [],
            editFormData : { },
            taxType : [],
            AddToggleModel : false,
            editToggleModel : false,
            newForm : true,
            tableHeadingData : ["Tax Name","Tax Number","Tax Type","Description"]
        }
    },
    methods :{
        async loadAPIResponse(enum_code, bind_params) {
            await axios.get(`${VUE_APP_BASE_API}method=get_master_enum_data&enum_code=${enum_code}`)
                .then((res) => {
                if(res.data.settings.success == "1") {
                    this[bind_params] = res.data.data.child_data;
                }
                else {
                    this[bind_params] = [];
                }
                });
        },
        onSumbit(values) {
            console.log('add new corresponding address')
            this.taxInformation.push({
                tax_name : values.tax_name.trim(),
                tax_number : values.tax_number.trim(),
                tax_type : values.tax_type.trim(),
                tax_description : values.tax_description.trim(),

            })
            this.toggleModel("AddToggleModel");
            this.$emit("completeTaxInformation", this.taxInformation)
            this.$refs.addressRefForm.resetForm();
        },
        onEditForm(id) {
            if(typeof this.taxInformation[id] != 'undefined') {
                console.log('edit form')
                this.editFormData = {
                    id : id,
                    tax_name : this.taxInformation[id].tax_name,
                    tax_number : this.taxInformation[id].tax_number,
                    tax_type : this.taxInformation[id].tax_type,
                    tax_description : this.taxInformation[id].tax_description,
                }

                console.log(this.editFormData);
                this.toggleModel("editToggleModel")
            }
            else {
                alert("please select a valid contact detail");
            }
        },
        updateForm(values) {
            if(!typeof values.id !== 'undefined' && typeof values.id == 'number') {

                this.taxInformation[values.id] = {
                    tax_name : values.tax_name.trim(),
                    tax_number : values.tax_number.trim(),
                    tax_type : values.tax_type.trim(),
                    tax_description : values.tax_description.trim(),

                };
                this.toggleModel("editToggleModel")
                this.$emit("completeTaxInformation", this.taxInformation)
                alert("Select tax information detail updated successfully")
            }
            else {
                alert("You have updated form in not found in list");
            }
        },
        validateSelectRequiredField(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        validateRequiredField(value) {
            if (!value) {
                return 'This field is required.';
            }
            return true;
        },
        deleteSelectedListData(index) {
            if(confirm("Do you really want to delete?")){
                if(this.taxInformation && this.taxInformation.length > 0) {
                    this.taxInformation.splice(index, 1);
                    this.$emit("completeTaxInformation", this.taxInformation)
                    alert("Select contact detail deleted successfully.");
                } else {
                    alert("Select contact detail not found in list.");
                }
            }
        },
        searchJSON(obj, key) {
            this.editObject = [];
            for (let k in obj) {
                if (obj.hasOwnProperty(k)) {
                if (k === key && obj[k] === val) {
                    this.editObject.push(obj);
                } else if (typeof obj[k] === "object") {
                    this.editObject = this.editObject.concat(searchJSON(obj[k], key, val));
                }
                }
            }
            return this.editObject;
        },
        toggleModel(toggleModal){
            console.log('open model');

            this[toggleModal] = ! this[toggleModal];

            if(this[toggleModal]) {
                this.loadAPIResponse("GEN_2103_1027", "taxType");
            }
        },
    },
    mounted() {
        initFlowbite();
    }

}
</script>