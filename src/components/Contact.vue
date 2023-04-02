<template>

    <div class="border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">{{ componentTitle }}</h2>
        <button 
        type="button"
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
        >Add Contact</button>
    </div>

    <div class="border-b flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Mobile number
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Secondary email
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, index) in Contactlist" v-bind:key="value.id" class="bg-gray-100 border-b">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ value.mobile_number }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ value.second_email }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Main modal -->
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Contact Person
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal"
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
                    <Form @submit="onContactSubmit">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                                <div class="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="mobile_number" class="block text-sm font-medium leading-6 text-gray-900">
                                            Mobile number
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="mobile_number"
                                                id="mobile_number"
                                                autocomplete="off"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateMobileNumber"
                                            />
                                            <ErrorMessage name="mobile_number" />
                                        </div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="second_email" class="block text-sm font-medium leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="second_email"
                                                id="second_email"
                                                autocomplete="off"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateEmail"
                                            />
                                            <ErrorMessage name="second_email" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 flex items-center justify-end gap-x-6"></div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Submit
                            </button>
                            <button
                                data-modal-hide="defaultModal"
                                type="button"
                                id="hideModel"
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
</template>


<script>
import { initFlowbite } from 'flowbite'
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min, digits}  from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('digits', digits);

export default{
    props: ["componentTitle", "completeContact"],
    components : {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        
        return {
            required,
            email,
            digits,
            Contactlist : []
        }
    },
    methods :{
        onContactSubmit(values) {
            this.Contactlist.push({
                mobile_number : values.mobile_number,
                second_email : values.second_email,
            })
            
            this.$emit("completeContact", this.Contactlist)

                document.getElementById("hideModel").click();
        },
        validateMobileNumber(value) {
        if (!value) {
            return 'This field is required';
        }

        var count = 0;
        if (value >= 1) ++count;

        while (value / 10 >= 1) {
            value /= 10;
            ++count;
        }

        // if(count !== 10) {
        //     return "please enter only 10 digit character";
        // }

        const number = Number(value);
        const isInteger = Number.isInteger(number);
        const isPositive = number > 0;

        // if(!isInteger && !isPositive){
        //     return "Please enter only positive number";
        // }

        return true; 
        },
        validateEmail(value) {
        if (!value) {
            return 'This field is required';
        }
        
        // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        // if (!regex.test(value)) {
        //     return 'This field must be a valid email';
        // }
        
        return true;
        },

    },
    mounted() {
        initFlowbite();
    }

}
</script>