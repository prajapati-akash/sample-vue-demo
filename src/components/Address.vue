<template>
<div class="flex items-center">
    <div class="flex-auto w-auto p-3 pl-8">
        <div class="border-gray-900/10">
            <h2 class="text-left block text-xl font-semibold leading-7 text-gray-900">{{ componentTitle }} :</h2>
        </div>
    </div>
    <div class="flex-auto pr-9 ">
        <button 
        type="button"
        id="addContactModal"
        data-modal-target="AddressDefaultModal"
        data-modal-toggle="AddressDefaultModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
        >Add Address</button>
    </div>
</div>
<div class="flex-full">
    <div class="border-gray-900/10 pb-12 border-b flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                                    #
                                </th>
                                <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                                    Address
                                </th>
                                <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                                    Dist
                                </th>
                                <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                                    State
                                </th>
                                <th scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, index) in AddressList" v-bind:key="value.id" class="bg-gray-100 border-b">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ index + 1 }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ value.address }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ value.dist }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ value.state }}
                                </td>
                                <td class="text-right text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap space-x-2">
                                    <button
                                    type="button"
                                    class="font-semibold"
                                    @click="EditAddressList(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                    </button>

                                    <button
                                        type="button"
                                        class="font-semibold"
                                        @click="DeleteAddressList(index)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                    </button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

    <button 
        hidden
        type="button"
        id="editAddressModal"
        data-modal-target="EditAddressDefaultModal"
        data-modal-toggle="EditAddressDefaultModal"
        >Open Edit Address</button>

    <!-- Add address modal -->
    <div id="AddressDefaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Address details
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="AddressDefaultModal"
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
                    <Form @submit="onAddressSubmit" id="AddressFormForm" ref="">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Address :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="textarea"
                                                type="text"
                                                name="address"
                                                id="address"
                                                autocomplete="off"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateTextArea"
                                            />
                                            <span class="text-red-500"><ErrorMessage name="address" /></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="dist" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            District : 
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="dist"
                                                id="dist"
                                                autocomplete="off"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateDist"
                                            />
                                            <span class="text-red-500"><ErrorMessage name="dist" /></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="state" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            State :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="state"
                                                id="state"
                                                autocomplete="off"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateState"
                                            />
                                            <span class="text-red-500"><ErrorMessage name="state" /></span>
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
                                data-modal-hide="AddressDefaultModal"
                                type="button"
                                id="hideAddressModel"
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

    <!-- Edit address modal -->
    <div id="EditAddressDefaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Address details
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="EditAddressDefaultModal"
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
                    <Form @submit="onAddressUpdate" id="EditAddressFormForm">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">

                                <div class="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="Editaddress" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Address :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="textarea"
                                                type="text"
                                                name="address"
                                                id="Editaddress"
                                                autocomplete="off"
                                                v-model="EditAddressListData.address"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateTextArea"
                                            />
                                            <span class="text-red-500"><ErrorMessage name="address" /></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="Editdist" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            District :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="dist"
                                                id="Editdist"
                                                autocomplete="off"
                                                v-model="EditAddressListData.dist"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateDist"
                                            />
                                            <span class="text-red-500"><ErrorMessage name="dist" /></span>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="Editstate" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            State :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="state"
                                                id="Editstate"
                                                autocomplete="off"
                                                v-model="EditAddressListData.state"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateState"
                                            />
                                            <span class="text-red-500"><ErrorMessage name="state" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Field
                            type="hidden"
                            name="id"
                            v-model="EditAddressListData.id"
                        />
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
                                data-modal-hide="EditAddressDefaultModal"
                                type="button"
                                id="hideEditAddressModel"
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

defineRule('required', required);
defineRule('email', email);
defineRule('digits', digits);

export default{
    props: ["componentTitle"],
    emits : ['completeAddress'],
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
            AddressList : [],
            EditAddressListData : {
                address : '',
                dist :  '',
                state : '',
            }
        }
    },
    methods :{
        onAddressSubmit(values) {
            this.AddressList.push({
                address : values.address.trim(),
                dist : values.dist.trim(),
                state : values.state.trim(),
            })
            // this.$emit("completeAddress", this.AddressList)
            this.parentAddressListData(this.AddressList)
            document.getElementById("hideAddressModel").click();
            document.getElementById("AddressFormForm").reset();
            // toast.success("Address detail added successfully.", {
            // // toast options here
            // });
        },
        onAddressUpdate(value) {
            if(!typeof value.id !== 'undefined' && typeof value.id == 'number') {
                // this.AddressList[value.id].address = value.address;
                // this.AddressList[value.id].dist = value.dist;
                // this.AddressList[value.id].state = value.state;

                this.AddressList[value.id] = {
                    address : value.address.trim(),
                    dist : value.dist.trim(),
                    state : value.state.trim(),
                };

                // this.$emit("completeAddress", this.AddressList)
                this.parentAddressListData(this.AddressList)
                document.getElementById("hideEditAddressModel").click();
                // toast.success("Address detail updated successfully.", {
                // toast options here
                // });
            }
            else {
                alert("You have updated form in not found in list");
            }
        },
        validateTextArea(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        validateDist(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        validateState(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        EditAddressList(id) {
            if(typeof this.AddressList[id] != 'undefined') {
                document.getElementById('editAddressModal').click();
                this.EditAddressListData.address = this.AddressList[id].address
                this.EditAddressListData.dist = this.AddressList[id].dist
                this.EditAddressListData.state = this.AddressList[id].state
                this.EditAddressListData.id = id
            }
            else {
                alert("please select a valid contact details");
            }
        },
        DeleteAddressList(index) {
            if(confirm("Do you really want to delete?")){
                if(this.AddressList && this.AddressList.length > 0) {
                    this.AddressList.splice(index, 1);
                    // this.$emit("completeAddress", this.AddressList)
                    this.parentAddressListData(this.AddressList)
                    // toast.success("Selected address detail deleted successfully.", {
                    // // toast options here
                    // });
                }
                else {
                    // toast.success("Please select valid address details.", {
                    // // toast options here
                    // });
                }
            }
        },
        parentAddressListData(parentAddressList) {
            this.$emit("completeAddress", parentAddressList)
        }
    },
    mounted() {
        initFlowbite();
    }
}
</script>