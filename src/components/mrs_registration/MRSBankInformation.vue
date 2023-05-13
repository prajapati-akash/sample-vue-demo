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
                                <tr v-if="formDataList.length > 0" v-for="(value, index) in formDataList" v-bind:key="value.id" class="bg-gray-100 border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.bank_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.account_number }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.branch_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.iban }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.swift }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.country }}
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
                        {{  newForm ? "Add" : "Edit" }} Bank Information
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

                                <!-- Bank ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_bank" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Bank <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" 
                                                id="bank_information_bank"
                                                name="bank"
                                                v-model="bank"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <template v-if="bankList">
                                                    <option v-for="item in bankList" :value="item.bank_list_name" :key="item.bank_list_id">
                                                        {{ item.bank_list_name }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="bank" /></p>
                                        </div>
                                    </div>
                                </div>


                                 <!-- Bank name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_bank_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Bank Name :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="bank"
                                                disabled="true"
                                                type="text"
                                                name="bank_name"
                                                id="bank_information_bank_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="bank_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Account number (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_account_number" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Account number :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="account_number"
                                                id="bank_information_account_number"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="account_number" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is default ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_is_default" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Is Default :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                value="Yes"
                                                id="bank_information_is_default"
                                                name="is_default"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                            <template v-if="isDefaultList">
                                                <option
                                                    v-for="(item, index) in isDefaultList"
                                                    :value="item.label"
                                                    :key="index"
                                                    >
                                                        {{ item.label }}
                                                </option>
                                            </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_default" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Currency ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_currency" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Currency :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                id="bank_information_currency"
                                                name="currency"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <template v-if="currencyList">
                                                    <option 
                                                        v-for="currency in currencyList" :value="currency.sc_isocode+ '( ' + currency.sc_symbol + ')'"
                                                        :key="currency.sc_sys_currency_id">
                                                        {{currency.sc_isocode }} {{ "( " + currency.sc_symbol + " )" }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="currency" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_branch_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Branch Name :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="branch_name"
                                                id="bank_information_branch_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="branch_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch Code (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_branch_code" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Branch Code :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="branch_code"
                                                id="bank_information_branch_code"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="branch_code" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- IBAN (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_iban" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            IBAN :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="iban"
                                                id="bank_information_iban"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="iban" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- swift (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_swift" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Swift :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="swift"
                                                id="bank_information_swift"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="swift" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bank Address (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_bank_address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Bank Address :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="bank_address"
                                                id="bank_information_bank_address"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="bank_address" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Country ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_country" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Country :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="bank_information_country"
                                                name="country"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            <p class="text-left text-red-500"><ErrorMessage name="country" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Region ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_region" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Region:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="bank_information_region"
                                                name="region"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                <option value=""></option>
                                                <template v-if="regionList">
                                                    <option
                                                    v-for="item in regionList"
                                                    :value="item.val"
                                                    :key="item.id"
                                                    >
                                                        {{ item.val }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="region" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- State ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_state" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            State:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="bank_information_state"
                                                name="state"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                @change="selectState"
                                            >
                                                <option value=""></option>
                                                <template v-if="stateList">
                                                    <option
                                                    v-for="item in stateList"
                                                    :value="item.val"
                                                    :data-state_id="item.id"
                                                    :key="item.id"
                                                    >
                                                        {{ item.val }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="state" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- LGA/District ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_lga_district" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            LGA/District :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="bank_information_lga_district"
                                                name="lga_district"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <template v-if="lgaDistrictList">
                                                    <option
                                                        v-for="(item, index) in lgaDistrictList"
                                                        :value="item.label"
                                                        :key="index"
                                                    >
                                                        {{ item.label }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="lga_district" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- City ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_city" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            City :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="bank_information_city"
                                                name="city"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <template v-if="cityList.length > 0">
                                                    <option
                                                        v-for="item in cityList"
                                                        :value="item.val"
                                                        :key="item.id"
                                                    >
                                                        {{ item.val }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="city" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Post Code (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_post_code" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Post Code :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="post_code"
                                                id="bank_information_post_code"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="post_code" /></p>
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

                                <!-- Input Fields -->

                                <!-- Bank ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_bank" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Bank <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.bank_name"
                                                as="select"
                                                id="bank_information_bank"
                                                name="bank"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <template v-if="bankList">
                                                    <option v-for="item in bankList" :value="item.bank_list_name" :key="item.bank_list_id">
                                                        {{ item.bank_list_name }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="bank" /></p>
                                        </div>
                                    </div>
                                </div>


                                 <!-- Bank name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_bank_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Bank Name :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.bank_name"
                                                disabled="true"
                                                type="text"
                                                name="bank_name"
                                                id="bank_information_bank_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="bank_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Account number (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_account_number" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Account number :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.account_number"
                                                type="text"
                                                name="account_number"
                                                id="bank_information_account_number"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="account_number" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is default ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_is_default" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Is Default :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.Yes"
                                                as="select"
                                                value="Yes"
                                                id="bank_information_is_default"
                                                name="is_default"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                            <template v-if="isDefaultList">
                                                <option
                                                    v-for="(item, index) in isDefaultList"
                                                    :value="item.label"
                                                    :key="index"
                                                    >
                                                        {{ item.label }}
                                                </option>
                                            </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_default" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Currency ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_currency" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Currency :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.currency"
                                                as="select"
                                                id="bank_information_currency"
                                                name="currency"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <template v-if="currencyList">
                                                    <option 
                                                        v-for="currency in currencyList" :value="currency.sc_isocode+ '( ' + currency.sc_symbol + ')'"
                                                        :key="currency.sc_sys_currency_id">
                                                        {{currency.sc_isocode }} {{ "( " + currency.sc_symbol + " )" }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="currency" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_branch_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Branch Name :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.branch_name"
                                                type="text"
                                                name="branch_name"
                                                id="bank_information_branch_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="branch_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch Code (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_branch_code" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Branch Code :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.branch_code"
                                                type="text"
                                                name="branch_code"
                                                id="bank_information_branch_code"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="branch_code" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- IBAN (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_iban" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            IBAN :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.iban"
                                                type="text"
                                                name="iban"
                                                id="bank_information_iban"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="iban" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- swift (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_swift" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Swift :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.swift"
                                                type="text"
                                                name="swift"
                                                id="bank_information_swift"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="swift" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bank Address (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_bank_address" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Bank Address :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.bank_address"
                                                type="text"
                                                name="bank_address"
                                                id="bank_information_bank_address"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="bank_address" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Country ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_country" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Country :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.country"
                                                as="select" id="bank_information_country"
                                                name="country"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            <p class="text-left text-red-500"><ErrorMessage name="country" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Region ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_region" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Region:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.region"
                                                as="select" id="bank_information_region"
                                                name="region"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                <option value=""></option>
                                                <template v-if="regionList">
                                                    <option
                                                    v-for="item in regionList"
                                                    :value="item.val"
                                                    :key="item.id"
                                                    >
                                                        {{ item.val }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="region" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- State ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_state" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            State:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.state"
                                                as="select" id="bank_information_state"
                                                name="state"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                @change="selectState"
                                            >
                                                <option value=""></option>
                                                <template v-if="stateList">
                                                    <option
                                                    v-for="item in stateList"
                                                    :value="item.val"
                                                    :data-state_id="item.id"
                                                    :key="item.id"
                                                    >
                                                        {{ item.val }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="state" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- LGA/District ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_lga_district" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            LGA/District :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.lga_district"
                                                as="select" id="bank_information_lga_district"
                                                name="lga_district"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <template v-if="lgaDistrictList">
                                                    <option
                                                        v-for="(item, index) in lgaDistrictList"
                                                        :value="item.label"
                                                        :key="index"
                                                    >
                                                        {{ item.label }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="lga_district" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- City ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_city" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            City :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.city"
                                                as="select" id="bank_information_city"
                                                name="city"
                                                autocomplete="on"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <template v-if="cityList.length > 0">
                                                    <option
                                                        v-for="item in cityList"
                                                        :value="item.val"
                                                        :key="item.id"
                                                    >
                                                        {{ item.val }}
                                                    </option>
                                                </template>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="city" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Post Code (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="bank_information_post_code" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Post Code :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.post_code"
                                                type="text"
                                                name="post_code"
                                                id="bank_information_post_code"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="post_code" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Input Fields -->
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
import { Field, Form, ErrorMessage} from 'vee-validate';
import { useMasterRecord } from '../../api/MasterRecord.js'
import axios from 'axios';
import RequiredAstrik from '../RequiredAstrik.vue';
import TableHeader from '../TableHeader'
import useToasterNotify from '@/js/comman-function.js'

const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;

export default{
    props: {
        componentTitle : {
            type :String,
            required:true,
            default: "Banking Informatin",
        },
        currencyList : {
            type : Array
        },
        countryList : {
            type : Array
        },
        isDefaultList : {
            type : Array
        }
    },
    emits: ["completeBankInformation"],
    components : {
    Form,
    Field,
    ErrorMessage,
    RequiredAstrik,
    TableHeader
},
    data() {
        return {
            formDataList : [],
            editFormData : { },
            regionList : [],
            stateList : [],
            lgaDistrictList : [],
            cityList : [],
            bankList : [],
            AddToggleModel : false,
            editToggleModel : false,
            newForm : true,
            bank:"",
            tableHeadingData : ["Bank Name" ,"Account Number" ,"Branch" ,"IBAN" ,"SWIFT" ,"COUNTRY"]
        }
    },
    methods :{
        async loadAPIResponse(method_name , bind_params) {
            var url = null;
            url = `${VUE_APP_BASE_API}method=${method_name}`

            await axios.get(url)
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
            console.log('add new bank information')
            var account_number = (values.account_number !== undefined) ? values.account_number : "";
            var value_exists = this.searchObjectValue(account_number, this.formDataList);
            if(value_exists.id != "no_data") {
                // alert("Account number already existed!")
                useToasterNotify('error', "Account number already existed!.")
            }else {
                this.formDataList.push({
                    bank_name : (values.bank_name !== undefined) ? values.bank_name.trim() : "",
                    account_number : (values.account_number !== undefined) ? values.account_number.trim() : "",
                    is_default : (values.is_default !== undefined) ? values.is_default.trim() : "",
                    currency : (values.currency !== undefined) ? values.currency.trim() : "",
                    branch_name : (values.branch_name !== undefined) ? values.branch_name.trim() : "",
                    branch_code : (values.branch_code !== undefined) ? values.branch_code.trim() : "",
                    iban : (values.iban !== undefined) ? values.iban.trim() : "",
                    swift : (values.swift !== undefined) ? values.swift.trim() : "",
                    bank_address : (values.bank_address !== undefined) ? values.bank_address.trim() : "",
                    country : (values.country !== undefined) ? values.country.trim() : "",
                    region : (values.region !== undefined) ? values.region.trim() : "",
                    state : (values.state !== undefined) ? values.state.trim() : "",
                    lga_district : (values.lga_district !== undefined) ? values.lga_district.trim() : "",
                    city : (values.city !== undefined) ? values.city.trim() : "",
                    post_code : (values.post_code !== undefined) ? values.post_code.trim() : "",

                })

                 useToasterNotify('success', "Bank information details added successfully.")

                this.toggleModel("AddToggleModel");
                this.$emit("completeBankInformation", this.formDataList)
                this.$refs.addressRefForm.resetForm();
            }
        },
        onEditForm(id) {
            if(typeof this.formDataList[id] != 'undefined') {
                console.log('edit form')
                this.editFormData = {
                    id : id,
                    bank_name : this.formDataList[id].bank_name,
                    account_number : this.formDataList[id].account_number,
                    is_default : this.formDataList[id].is_default,
                    currency : this.formDataList[id].currency,
                    branch_name : this.formDataList[id].branch_name,
                    branch_code : this.formDataList[id].branch_code,
                    iban : this.formDataList[id].iban,
                    swift : this.formDataList[id].swift,
                    bank_address : this.formDataList[id].bank_address,
                    country : this.formDataList[id].country,
                    region : this.formDataList[id].region,
                    state : this.formDataList[id].state,
                    lga_district : this.formDataList[id].lga_district,
                    city : this.formDataList[id].city,
                    post_code : this.formDataList[id].post_code,
                }

                this.toggleModel("editToggleModel")
            }
            else {
                // alert("please select a valid bank information");
                useToasterNotify('error', "Please select a valid bank information.")
            }
        },
        updateForm(values) {
            if(!typeof values.id !== 'undefined' && typeof values.id == 'number') {
                var account_number = (values.account_number !== undefined) ? values.account_number : "";

                var value_exists = this.searchObjectValue(account_number, this.formDataList);

                if(value_exists.id == values.id) {
                    this.formDataList[values.id] = {
                        bank_name : (typeof values.bank_name != 'undefined') ? values.bank_name.trim() : "",
                        account_number : (typeof values.account_number != 'undefined') ? values.account_number.trim() : "",
                        is_default : (typeof values.is_default != 'undefined') ? values.is_default.trim() : "",
                        currency : (typeof values.currency != 'undefined') ? values.currency.trim() : "",
                        branch_name : (typeof values.branch_name != 'undefined') ? values.branch_name.trim() : "",
                        branch_code : (typeof values.branch_code != 'undefined') ? values.branch_code.trim() : "",
                        iban : (typeof values.iban != 'undefined') ? values.iban.trim() : "",
                        swift : (typeof values.swift != 'undefined') ? values.swift.trim() : "",
                        bank_address : (typeof values.bank_address != 'undefined') ? values.bank_address.trim() : "",
                        country : (typeof values.country != 'undefined') ? values.country.trim() : "",
                        region : (typeof values.region != 'undefined') ? values.region.trim() : "",
                        state : (typeof values.state != 'undefined') ? values.state.trim() : "",
                        lga_district : (typeof values.lga_district != 'undefined') ? values.lga_district.trim() : "",
                        city : (typeof values.city != 'undefined') ? values.city.trim() : "",
                        post_code : (typeof values.post_code != 'undefined') ? values.post_code.trim() : "",
                    };

                    this.toggleModel("editToggleModel")
                    this.$emit("completeBankInformation", this.formDataList)
                    // alert("Bank information updated successfully")
                    useToasterNotify('success', "Bank information updated successfully.")
                } else {
                    // alert("Account number already existed!")
                    useToasterNotify('error', "Account number already existed!.")
                }

            }
            else {
                // alert("You have updated form in not found in list");
                useToasterNotify('error', "You have updated form in not found in list.")
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
                if(this.formDataList && this.formDataList.length > 0) {
                    this.formDataList.splice(index, 1);
                    this.$emit("completeBankInformation", this.formDataList)
                    // alert("Select contact detail deleted successfully.");
                    useToasterNotify('success', "Select contact detail deleted successfully.")
                } else {
                    // alert("Select contact detail not found in list.");
                    useToasterNotify('error', "Select contact detail not found in list.")
                }
            }
        },
        searchObjectValue(key = "", listData = []) {
            for (let i=0; i < listData.length; i++) {
                if (listData[i].account_number === key) {
                    return { id : i};
                }
            }
            return { id :'no_data'}
        },
        async loadRegionAPIResponse(method_name, append_paramter, bind_params) {
            var url = null;
            url = `${VUE_APP_BASE_API}method=${method_name}&${append_paramter}`
            await axios.get(url)
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
                var country_id = e.target.options[e.target.options.selectedIndex].dataset.country_id;

                if(typeof country_id != 'undefined') {
                    console.log('get region and state list')
                    this.loadRegionAPIResponse("get_region_list", `country_id=${country_id}`, "regionList")
                    this.loadRegionAPIResponse("get_states", `country_id=${country_id}`, "stateList")
                }
            }
        },
        selectState(e) {
            if(e.target.options.selectedIndex > -1) {
                var state_id = e.target.options[e.target.options.selectedIndex].dataset.state_id;
                console.log("state_id");
                console.log(state_id);

                if(typeof state_id != 'undefined') {
                    this.loadRegionAPIResponse("get_cities", `state_id=${state_id}`, "cityList")
                }
            }
        },
        toggleModel(toggleModal){
            console.log('model');
            this[toggleModal] = ! this[toggleModal];

            if(this[toggleModal]) {
                this.bankList = [];
                this.bank = ""
                const { api_response: bankListData } = useMasterRecord("get_bank_list")
                this.bankList = bankListData
            }
        },
    },
    mounted() {
        initFlowbite();
    }

}
</script>