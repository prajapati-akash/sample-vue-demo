<template>
    <!-- Contact header -->

    <div class="flex justify-end border-b border-gray-900/10 items-center">
        <div class="flex-auto">
            <h2 class="text-left block text-xl font-semibold leading-7 text-gray-900">{{ componentTitle }} :</h2>
        </div>
        <div class="flex-auto text-end">
            <button
            type="button"
            class="border border-black bg-transparent hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded float-right flex"
            @click="openAddressModel('addMrsAddressModal')"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                 Add New
            </button>
        </div>
    </div>

    <!-- Address list table -->
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
                                <tr v-if="addressList.length > 0" v-for="(value, index) in addressList" v-bind:key="value.id" class="bg-gray-100 border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.location_type }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.location_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.corresponding_address }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.corresponding_address_country }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.corresponding_address_state }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.corresponding_address_city }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ (typeof value.corresponding_postcode != 'undefined') ? value.corresponding_postcode : "" }}
                                    </td>
                                    <td class="flex text-sm text-end text-gray-900 font-light px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            type="button"
                                            @click="EditAddressList(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            @click="DeleteAddressFormList(index)">
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
    <div v-if="addMrsAddressModal"
        class="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center"
        >
        <div class="relative w-full h-full max-w-2xl md:h-full sm:p-5">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{  newForm ? "Add" : "Edit" }} Corresponding Address
                    </h3>
                    <button
                        type="button"
                        @click="openAddressModel('addMrsAddressModal')"
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
                    <Form @submit="onAddressSubmit" ref="addressRefForm" id="AddressForm" @invalid-submit="onInvalidSubmit"  v-slot="{ isSubmitting }">
                        <div class="space-y-12">
                            <div class="pb-12">

                                <!-- Location Type ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="location_type" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Location Type <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="location_type"
                                                name="location_type"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="locationType" v-for="(item, index) in locationType" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="location_type" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Location Name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="location_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Location Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="location_name"
                                                id="location_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="location_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is Default  -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="is_default_address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Is Default <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field as="select" id="is_default_address" name="is_default_address"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="isDefaultList"
                                                    v-for="(item, index) in isDefaultList"
                                                    :value="item.label"
                                                    :key="index"
                                                >
                                                    {{ item.label }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_default_address" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Corresponding Address -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Address <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="corresponding_address"
                                                id="corresponding_address"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- country (select) -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_country" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            country <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field 
                                                as="select" id="corresponding_address_country"
                                                name="corresponding_address_country"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                @change="selectCountry"
                                            >
                                                <option value=""></option>
                                                <template v-if="countryList">
                                                    <option
                                                        v-if="countryList"
                                                        v-for="(item, index) in countryList"
                                                        :value="item.mc_country"
                                                        :data-country_id="item.mc_country_id"
                                                        :key="item.mc_country_id"
                                                    >
                                                        {{ item.mc_country }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_country" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Region (select) (not required)-->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_region" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Region :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                id="corresponding_address_region"
                                                name="corresponding_address_region"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="regionList"
                                                    v-for="(item, index) in regionList"
                                                    :value="item.val"
                                                    :key="index"
                                                >
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_region" /></p>
                                        </div>
                                    </div>
                                </div>

                                 <!-- State (select)-->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_state" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            State <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                id="corresponding_address_state"
                                                name="corresponding_address_state"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                @change="selectState"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="stateList"
                                                    v-for="(item, index) in stateList"
                                                    :value="item.val"
                                                    :key="index"
                                                    :data-state_id="item.id"
                                                >
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_state" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- LGA/District (select, not required)-->
                                 <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_district" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            LGA/District :
                                        </label>
                                        <div class="mt-2">
                                            <Field as="select" id="corresponding_address_district" name="corresponding_address_district"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                <option value=""></option>
                                                <option v-if="districtList" v-for="(item, index) in districtList" :value="item.val"
                                                :key="index">{{ item.val }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_district" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- City (select, not required)-->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_city" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            City <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                id="corresponding_address_city"
                                                name="corresponding_address_city"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="cityList"
                                                    v-for="(item, index) in cityList"
                                                    :value="item.val"
                                                    :key="index"
                                                >
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_city" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Postcode Name (text, not required)  -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="corresponding_postcode" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Post Code :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="corresponding_postcode"
                                                id="corresponding_postcode"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_postcode" /></p>
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
                                @click="openAddressModel('addMrsAddressModal')"
                                type="button"
                                id="hideAddAddressModel"
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
    <div v-if="addMrsAddressModal" class="opacity-70 fixed inset-0 z-40 bg-gray-900 -top-12"></div>

    <!-- Edit Model -->
    <div  v-if="editMrsAddressModal" id="EditAddressModalOpen"
        class="flex fixed justify-center items-center hs-overlay w-full h-full top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div class="relative w-full h-full max-w-2xl md:h-full sm:p-5">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit Corresponding Address
                    </h3>
                    <button
                        @click="openAddressModel('editMrsAddressModal')"
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
                    <Form @submit="updateAddressForm" id="EditAddressForm" v-slot="{ isSubmitting }">
                        <div class="space-y-12">
                            <div class="pb-12">

                                <!-- Location Type ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="location_type" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Location Type <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field as="select" id="edit_location_type" name="location_type"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                v-model="editAddressListData.location_type"
                                                >
                                                <option value=""></option>
                                                <option v-if="locationType" v-for="(item, index) in locationType" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="location_type" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Location Name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="location_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Location Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.location_name"
                                                type="text"
                                                name="location_name"
                                                id="edit_location_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="location_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is Default  -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="is_default_address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Is Default <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field 
                                                v-model="editAddressListData.is_default_address"
                                                as="select" id="edit_is_default_address" name="is_default_address"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="isDefaultList"
                                                    v-for="(item, index) in isDefaultList"
                                                    :value="item.label"
                                                    :key="index"
                                                >
                                                    {{ item.label }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_default_address" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Corresponding Address -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Address <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_address"
                                                type="text"
                                                name="corresponding_address"
                                                id="edit_corresponding_address"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- country (select) -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_country" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            country <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_address_country"
                                                as="select"
                                                id="edit_corresponding_address_country"
                                                name="corresponding_address_country"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                @change="selectCountry"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="countryList"
                                                    v-for="(item, index) in countryList"
                                                    :value="item.mc_country"
                                                    :data-country_id="item.mc_country_id"
                                                    :key="item.mc_country_id"
                                                >
                                                    {{ item.mc_country }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_country" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Region (select) (not required)-->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_region" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Region :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_address_region"
                                                as="select"
                                                id="edit_corresponding_address_region"
                                                name="corresponding_address_region"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="regionList"
                                                    v-for="(item, index) in regionList"
                                                    :value="item.val"
                                                    :key="index"
                                                >
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_region" /></p>
                                        </div>
                                    </div>
                                </div>

                                 <!-- State (select)-->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_state" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            State <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_address_state"
                                                as="select"
                                                id="edit_corresponding_address_state"
                                                name="corresponding_address_state"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                @change="selectState"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="stateList"
                                                    v-for="(item, index) in stateList"
                                                    :value="item.val"
                                                    :key="index"
                                                    :data-state_id="item.id"
                                                >
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_state" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- LGA/District (select, not required)-->
                                 <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_district" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            LGA/District :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_address_district"
                                                as="select"
                                                id="edit_corresponding_address_district"
                                                name="corresponding_address_district"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <option v-if="districtList" v-for="(item, index) in districtList" :value="item.val" :key="index">
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_district" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- City (select, not required)-->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="corresponding_address_city" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            City <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_address_city"
                                                as="select"
                                                id="edit_corresponding_address_city"
                                                name="corresponding_address_city"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                            >
                                                <option value=""></option>
                                                <option
                                                    v-if="cityList"
                                                    v-for="(item, index) in cityList"
                                                    :value="item.val"
                                                    :key="index"
                                                >
                                                    {{ item.val }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_address_city" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Postcode Name (text, not required)  -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="corresponding_postcode" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Post Code :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editAddressListData.corresponding_postcode"
                                                type="text"
                                                name="corresponding_postcode"
                                                id="edit_corresponding_postcode"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="corresponding_postcode" /></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Field
                                type="hidden"
                                name="id"
                                v-model="editAddressListData.id"
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
                                @click="openAddressModel('editMrsAddressModal')"
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

    <div v-if="editMrsAddressModal" class="opacity-70 fixed inset-0 z-40 bg-gray-900 -top-12"></div>

</template>


<script>
import { initFlowbite } from 'flowbite'
import { Field, Form, ErrorMessage } from 'vee-validate';
import axios from 'axios';
import RequiredAstrik from '../RequiredAstrik.vue';
import TableHeader from '../TableHeader.vue'
import useToasterNotify from '@/js/comman-function.js'

const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;

export default{
    props: {
        componentTitle : {
            type :String,
            required:true,
            default: "Corresponding Address",
        },
        countryList : {
            type :Array
        },
        isDefaultList : {
            type : Array
        }
    },
    emits: ["completeAddress"],
    components : {
        Form,
        Field,
        ErrorMessage,
        RequiredAstrik,
        TableHeader,
    },
    data() {

        return {
            addressList : [],
            editAddressListData : {},
            locationType: [],
            regionList : [],
            stateList : [],
            districtList : [],
            cityList : [],
            addMrsAddressModal : false,
            editMrsAddressModal : false,
            newForm : true,
            tableHeadingData : ["Type","Location","Address","Country","State","City","PostCode"],
        }
    },
    created() {
        // this.loadAPIResponse("GEN_2010_1003", "locationType");
    },
    methods :{
        onAddressSubmit(values) {
            console.log('add new corresponding address')
            this.addressList.push({
                corresponding_address : values.corresponding_address.trim(),
                corresponding_address_city : values.corresponding_address_city.trim(),
                corresponding_address_country : values.corresponding_address_country.trim(),
                corresponding_address_district : (typeof values.corresponding_address_district != 'undefined') ? values.corresponding_address_district.trim() : "",
                corresponding_address_region : (typeof values.corresponding_address_region != 'undefined') ? values.corresponding_address_region.trim() : "",
                corresponding_address_state : values.corresponding_address_state.trim(),
                corresponding_postcode : (typeof values.corresponding_postcode != 'undefined') ? values.corresponding_postcode.trim() : "",
                is_default_address : values.is_default_address.trim(),
                location_name : values.location_name.trim(),
                location_type : values.location_type.trim(),
            })

            useToasterNotify('success', "Corresponding address details add successfully.")
            this.openAddressModel("addMrsAddressModal");
            this.$emit("completeAddress", this.addressList)
            this.$refs.addressRefForm.resetForm();
        },
        onInvalidSubmit({ values, errors, results }) {
            // console.log(values); // current form values
            // console.log(errors); // a map of field names and their first error message
            // console.log(results); // a detailed map of field names and their validation results
        },
        EditAddressList(id) {
            if(typeof this.addressList[id] != 'undefined') {
                console.log('edit form')

                this.editAddressListData = {
                    id : id,
                    corresponding_address : this.addressList[id].corresponding_address,
                    corresponding_address_city : this.addressList[id].corresponding_address_city,
                    corresponding_address_country : this.addressList[id].corresponding_address_country,
                    corresponding_address_district : this.addressList[id].corresponding_address_district,
                    corresponding_address_region : this.addressList[id].corresponding_address_region,
                    corresponding_address_state : this.addressList[id].corresponding_address_state,
                    corresponding_postcode : this.addressList[id].corresponding_postcode,
                    is_default_address : this.addressList[id].is_default_address,
                    location_name : this.addressList[id].location_name,
                    location_type : this.addressList[id].location_type,
                }
                this.openAddressModel("editMrsAddressModal")
            }
            else {
                // alert("please select a valid contact detail");
                useToasterNotify('error', "please select a valid contact detail")
            }
        },
        updateAddressForm(values) {
            if(!typeof values.id !== 'undefined' && typeof values.id == 'number') {

                this.addressList[values.id] = {
                    corresponding_address : values.corresponding_address.trim(),
                    corresponding_address_city : values.corresponding_address_city.trim(),
                    corresponding_address_country : values.corresponding_address_country.trim(),
                    corresponding_address_district : (typeof values.corresponding_address_district != 'undefined') ? values.corresponding_address_district.trim() : "",
                    corresponding_address_region : (typeof values.corresponding_address_region != 'undefined') ? values.corresponding_address_region.trim() : "",
                    corresponding_address_state : values.corresponding_address_state.trim(),
                    corresponding_postcode : (typeof values.corresponding_postcode != 'undefined') ? values.corresponding_postcode.trim() : "",
                    is_default_address : values.is_default_address.trim(),
                    location_name : values.location_name.trim(),
                    location_type : values.location_type.trim(),

                };
                this.openAddressModel("editMrsAddressModal")
                this.$emit("completeAddress", this.addressList)
                // alert("Select contact detail updated successfully")
                useToasterNotify('success', "Contact detail updated successfully")
            }
            else {
                // alert("You have updated form in not found in list");
                useToasterNotify('error', "You have updated form in not found in list")
            }
        },
        DeleteAddressFormList(index) {
            if(confirm("Do you really want to delete?")){
                if(this.addressList && this.addressList.length > 0) {
                    this.addressList.splice(index, 1);
                    this.$emit("completeAddress", this.addressList)
                    // alert("Select contact detail deleted successfully.");
                    useToasterNotify('success', "Select contact detail deleted successfully.")
                } else {
                    // alert("Select contact detail not found in list.");
                    useToasterNotify('error', "Select contact detail not found in list.")
                }
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
        validateMobileNumber(value) {
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
        loadStateCityResponse(method_name, append_paramter, bind_params) {
            var url = null;
            url = `${VUE_APP_BASE_API}method=${method_name}&${append_paramter}`
            axios.get(url)
                .then((res) => {
                    if(res.data.settings.success == "1") {
                        this[bind_params] = res.data.data;
                    }
                    else {
                        this[bind_params] = [];
                    }
                });
        },
        selectCountry(e) {
            this.regionList = []
            this.stateList  = []
            this.cityList   = []

            if(e.target.options.selectedIndex > -1) {
                let country_id = e.target.options[e.target.options.selectedIndex].dataset.country_id;

                if(typeof country_id != 'undefined') {
                    let regions_params = `country_id=${country_id}`
                    let state_params = `country_id=${country_id}`
                    // this.loadStateCityResponse(method, new param, stored response variable)

                    this.loadStateCityResponse("get_region_list",  regions_params, "regionList")
                    this.loadStateCityResponse("get_states", state_params, "stateList")
                }
            }
        },
        selectState(e) {
            if(e.target.options.selectedIndex > -1) {
                let state_id = e.target.options[e.target.options.selectedIndex].dataset.state_id;

                if(typeof state_id != 'undefined') {
                    this.loadStateCityResponse("get_cities", `state_id=${state_id}`, "cityList")
                }
            }
        },
        openAddressModel(toggleModal){
            console.log('open model');

            this[toggleModal] = ! this[toggleModal];

            if(this[toggleModal]) {
                this.loadAPIResponse("GEN_2010_1003", "locationType");
            }
        },
    },
    mounted() {
        initFlowbite();
    }

}
</script>