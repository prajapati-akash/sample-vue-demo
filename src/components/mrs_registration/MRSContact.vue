<template>
    <!-- Contact header -->

    <div class="flex justify-end border-b border-gray-900/10 items-center">
        <div class="flex-auto">
            <h2 class="text-left block text-xl font-semibold leading-7 text-gray-900 dark:text-white">{{ componentTitle }} :</h2>
        </div>
        <div class="flex-auto text-end">
            <button
            type="button"
            @click="toggleAddContactModal('addContactModal')"
            class="border border-black bg-transparent hover:bg-black hover:text-white  text-black dark:text-white font-bold py-2 px-2 rounded float-right flex"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Contact
            </button>
        </div>
    </div>

    <!-- Contact list table -->
    <div class="flex-full">
        <div class="border-gray-900/10 pb-12 border-b flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <TableHeaderVue
                                :tableHeadingData="tableHeadingData"
                            />
                            <tbody class="border-b dark:bg-gray-800 bg-gray-100 border-b">
                                <tr v-if="Contactlist.length > 0" v-for="(value, index) in Contactlist" v-bind:key="value.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-center">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.contact_title + ". " + value.contact_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.contact_email }}
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.gender }}
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.contact_person_mobile + " ("+ value.mobile_country + ")"}}
                                    </td>
                                    <td class="text-sm text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.whatsapp_number + " ("+ value.whatsapp_number_country + ")"}}
                                    </td>
                                    <td class="flex text-sm text-end text-gray-900 dark:text-white font-light px-6 py-4 whitespace-nowrap space-x-2">
                                        <button
                                            type="button"
                                            @click="EditContactList(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            @click="DeleteContactList(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                        </button>

                                    </td>
                                </tr>
                                <tr v-else>
                                    <td colspan="7" class="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900 dark:text-white text-center">
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
    <div v-if="addContactModal" id="defaultModal"
        class="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center">
        <div class="relative sm:w-11/12 md:full h-full max-w-2xl md:h-modal">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-black">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Contact Person
                    </h3>
                    <button
                        type="button"
                        @click="toggleAddContactModal('addContactModal')"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    <Form @submit="onContactSubmit" id="ContactForm" ref="ContactFormDetails">
                        <div class="space-y-12">
                            <div class="pb-12">

                                <!-- Title -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="contact_title" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Title <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field as="select" id="contact_title" name="contact_title"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="TitleList" v-for="(item, index) in TitleList" :value="item.child_enum_slug"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="contact_title" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Name -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="contact_name" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="contact_name"
                                                id="contact_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="contact_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Gender  -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="gender" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                           Gender <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field as="select" id="gender" name="gender"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="TitleList" v-for="(item, index) in GenderList" :value="item.child_enum_slug"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="gender" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Contact Email -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="contact_email" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Email <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="contact_email"
                                                id="contact_email"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateEmail"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="contact_email" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Designation -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="designation" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Designation <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="designation"
                                                id="designation"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="designation" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is Default -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="is_default" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                           Is Default <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field as="select" id="is_default" name="is_default"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="TitleList" v-for="(item, index) in IsDefaultList" :value="item.child_enum_slug"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_default" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Mobile : -->
                                <div class="mt-2 sm:col-span-2">
                                    <label for="mobile" class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">
                                    Mobile <RequiredAstrik/>:
                                    </label>
                                    <div class="flex">
                                    <div class="w-24 mt-2">
                                        <Field
                                        as="select"
                                        id="mobile_country"
                                        name="mobile_country"
                                        autocomplete="on"
                                            class=" dark:bg-gray-600 block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            :rules="validateSelectRequiredField">
                                            <option value="">Country</option>
                                            <option
                                            v-for="(type, index) in countryList"
                                            :value="type.mc_country_code"
                                            :key="index"
                                            >
                                            {{ type.mc_country.charAt(0).toUpperCase() + type.mc_country.slice(1) }}
                                            </option>
                                        </Field>
                                        <p class="text-left text-red-500">
                                            <ErrorMessage name="mobile_country" />
                                        </p>
                                    </div>
                                    <div class="w-5 mt-2 pl-2">
                                        <Field  type="text" name="contact_person_mobile"
                                        id="contact_person_mobile"
                                        autocomplete="on"
                                        class="block w-52 rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        :rules="validateMobileNumber" />
                                        <p class="text-left text-red-500 w-52">
                                            <ErrorMessage name="contact_person_mobile" />
                                        </p>
                                    </div>
                                    </div>
                                </div>

                                <!-- Whatsapp : -->
                                <div class="mt-2 sm:col-span-2">
                                    <label for="whatsapp_number" class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">
                                      Whatsapp Number <RequiredAstrik/> :
                                    </label>
                                    <div class="flex">
                                    <div class="w-24 mt-2">
                                        <Field as="select" id="whatsapp_number_country" name="whatsapp_number_country" autocomplete="on"
                                            class="block w-24 dark:bg-gray-600 rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            :rules="validateSelectRequiredField">
                                            <option value="">Country</option>
                                            <option v-for="(type, index) in countryList" :value="type.mc_country_code" :key="index">
                                            {{ type.mc_country.charAt(0).toUpperCase() + type.mc_country.slice(1) }}
                                            </option>
                                        </Field>
                                        <p class="text-left text-red-500">
                                            <ErrorMessage name="whatsapp_number_country" />
                                        </p>
                                    </div>
                                    <div class="w-5 mt-2 pl-2">
                                        <Field type="text" name="whatsapp_number"
                                        id="whatsapp_number" autocomplete="on"
                                        class="block w-52 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        :rules="validateMobileNumber"
                                        />
                                        <p class="text-left text-red-500 w-52">
                                            <ErrorMessage name="whatsapp_number" />
                                        </p>
                                    </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="flex items-center pt-6 pb-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Submit
                            </button>
                            <button
                                type="button"
                                @click="toggleAddContactModal('addContactModal')"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:text-white focus:z-10 dark:bg-white dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Decline
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="addContactModal" class="opacity-90 fixed inset-0 z-40 bg-gray-900 -top-12"></div>

    <!-- Edit Model Modal  -->
    <div v-if="editContactModel" id="editModelContactList"
        class="flex fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:h-full justify-center items-center">
        <div class="relative w-full h-full max-w-2xl md:h-modal">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-white">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white dark:text-white">
                        Edit Contact Person
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        @click="toggleAddContactModal('editContactModel')"
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
                    <Form @submit="onContactUpdate" id="EditContactForm" ref="ContactFormDetails">
                        <div class="space-y-12">
                            <div class="pb-12">

                                <!-- Title -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="contact_title" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Title <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                id="edit_contact_title"
                                                name="contact_title"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                v-model="EditContactListData.contact_title"
                                                >

                                                <option value=""></option>
                                                <option
                                                    v-if="TitleList"
                                                    v-for="(item, index) in TitleList"
                                                    :value="item.child_enum_slug"
                                                    :key="index">
                                                    {{ item.label }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="contact_title" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Name -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="contact_name" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Name <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="EditContactListData.contact_name"
                                                type="text"
                                                name="contact_name"
                                                id="edit_contact_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="contact_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Gender  -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="gender" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                           Gender <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select"
                                                id="gender"
                                                name="gender"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField"
                                                v-model="EditContactListData.gender"
                                                >
                                                    <option value=""></option>
                                                    <option 
                                                        v-if="TitleList"
                                                        v-for="(item, index) in GenderList"
                                                        :value="item.child_enum_slug"
                                                        :key="index"
                                                    >
                                                      {{ item.label }}
                                                    </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="gender" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Contact Email -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="contact_email" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Email <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="EditContactListData.contact_email"
                                                type="text"
                                                name="contact_email"
                                                id="edit_contact_email"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateEmail"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="contact_email" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Designation -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="designation" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                            Designation <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="EditContactListData.designation"
                                                type="text"
                                                name="designation"
                                                id="edit_designation"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="designation" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is Default -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="is_default" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                           Is Default <RequiredAstrik />:
                                        </label>
                                        <div class="mt-2">
                                            <Field 
                                                    as="select"
                                                    id="edit_is_default"
                                                    name="is_default"
                                                    autocomplete="on"
                                                    class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    :rules="validateSelectRequiredField"
                                                    v-model="EditContactListData.is_default"
                                                >
                                                <option value=""></option>
                                                <option 
                                                    v-if="TitleList"
                                                    v-for="(item, index) in IsDefaultList"
                                                    :value="item.child_enum_slug"
                                                    :key="index"
                                                >
                                                    {{ item.label }}
                                                </option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_default" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Mobile : -->
                                <div class="mt-2 sm:col-span-2">
                                    <label for="mobile" class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">
                                    Mobile <RequiredAstrik />:
                                    </label>
                                    <div class="flex">
                                    <div class="w-24 mt-2">
                                        <Field
                                        as="select"
                                        id="edit_mobile_country"
                                        name="mobile_country"
                                        autocomplete="on"
                                        class="block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        :rules="validateSelectRequiredField"
                                        v-model="EditContactListData.mobile_country"
                                        >
                                            <option value="">Country</option>
                                            <option
                                            v-for="(type, index) in countryList"
                                            :value="type.mc_country_code"
                                            :key="index"
                                            >
                                            {{ type.mc_country.charAt(0).toUpperCase() + type.mc_country.slice(1) }}
                                            </option>
                                        </Field>
                                        <p class="text-left text-red-500">
                                            <ErrorMessage name="mobile_country" />
                                        </p>
                                    </div>
                                    <div class="w-5 mt-2 pl-2">
                                        <Field
                                            v-model="EditContactListData.contact_person_mobile"
                                            type="text"
                                            name="contact_person_mobile"
                                            id="edit_contact_person_mobile"
                                            autocomplete="on"
                                            class="block w-52 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            :rules="validateMobileNumber"
                                        />
                                        <p class="text-left text-red-500 w-52">
                                            <ErrorMessage name="contact_person_mobile" />
                                        </p>
                                    </div>
                                    </div>
                                </div>

                                <!-- Whatsapp Number : -->
                                <div class="mt-2 sm:col-span-2">
                                    <label for="whatsapp_number" class="text-left text-lg block font-medium leading-6 text-gray-900 dark:text-white">
                                      Whatsapp Number <RequiredAstrik />:
                                    </label>
                                    <div class="flex">
                                    <div class="w-24 mt-2">
                                        <Field as="select" id="edit_whatsapp_number_country" name="whatsapp_number_country" autocomplete="on"
                                            class="block w-24 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            :rules="validateSelectRequiredField"
                                            v-model="EditContactListData.whatsapp_number_country"
                                            >
                                            <option value="">Country</option>
                                            <option v-for="(type, index) in countryList" :value="type.mc_country_code" :key="index">
                                            {{ type.mc_country.charAt(0).toUpperCase() + type.mc_country.slice(1) }}
                                            </option>
                                        </Field>
                                        <p class="text-left text-red-500">
                                            <ErrorMessage name="whatsapp_number_country" />
                                        </p>
                                    </div>
                                    <div class="w-5 mt-2 pl-2">
                                        <Field 
                                            type="text"
                                            name="whatsapp_number"
                                            id="edit_whatsapp_number"
                                            autocomplete="on"
                                            class="block w-52 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            :rules="validateMobileNumber"
                                            v-model="EditContactListData.whatsapp_number"
                                        />
                                        <p class="text-left text-red-500 w-52">
                                            <ErrorMessage name="whatsapp_number" />
                                        </p>
                                    </div>
                                        <Field
                                            type="hidden"
                                            name="id"
                                            v-model="EditContactListData.id"
                                            />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Modal footer -->
                        <div class="flex items-center pt-6 pb-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                            Update
                            </button>
                            <button
                                @click="toggleAddContactModal('editContactModel')"
                                type="button"
                                id="hideEditModel"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:text-white focus:z-10 dark:bg-white dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Decline
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editContactModel" class="opacity-90 fixed inset-0 z-40 bg-gray-900 -top-12"></div>

</template>


<script>
import { initFlowbite } from 'flowbite'
import { Field, Form, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min, digits}  from '@vee-validate/rules';
import { useMasterRecord } from '../../api/MasterRecord.js'
import TableHeaderVue from '../TableHeader.vue';
import axios from 'axios';
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;
import useToasterNotify from '@/js/comman-function.js'
import RequiredAstrik from '../RequiredAstrik.vue';

export default{
    props: ["componentTitle", "countryList", "IsDefaultList"],
    emits: ["completeContact"],
    components : {
        Form,
        Field,
        ErrorMessage,
        TableHeaderVue,
        RequiredAstrik,
    },
    data() {
        return {
            required,
            email,
            digits,
            Contactlist : [],
            EditContactListData : {
                contact_email : "",
                contact_name : "",
                contact_title : "",
                whatsapp_number : "",
                whatsapp_number_country : "",
                gender : "",
                is_default : "",
                contact_person_mobile : "",
                mobile_country : "",
                id : "",
            },
            TitleList: [],
            GenderList: [],
            addContactModal: false,
            editContactModel: false,
            tableHeadingData : ["Name", "email", "Gender", "Mobile", "Mobile Number"]
        }
    },
    created() {
        this.loadAPI("GEN_2010_1006", "TitleList");
        this.loadAPI("GEN_1809_1006", "GenderList");
    },
    methods :{
        onContactSubmit(values) {
            console.log('submit mrs contact form');
            this.Contactlist.push({
            contact_email : values.contact_email.trim(),
            contact_name : values.contact_name.trim(),
            contact_person_mobile : values.contact_person_mobile.trim(),
            contact_title : values.contact_title.trim(),
            whatsapp_number_country : values.whatsapp_number_country,
            whatsapp_number : values.whatsapp_number.trim(),
            gender : values.gender.trim(),
            is_default : values.is_default.trim(),
            mobile_country : values.mobile_country.trim(),
            designation : values.designation.trim(),
            })

            useToasterNotify('success', "contact form details add successfully.")

            this.$emit("completeContact", this.Contactlist)
            this.toggleAddContactModal('addContactModal');
            document.getElementById("ContactForm").reset();
        },
        async loadAPI(enum_code, bind_params) {
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
        onContactUpdate(value) {
            if(!typeof value.id !== 'undefined' && typeof value.id == 'number') {

                this.Contactlist[value.id] = {
                    contact_email : value.contact_email.trim(),
                    contact_name : value.contact_name.trim(),
                    contact_person_mobile : value.contact_person_mobile.trim(),
                    contact_title : value.contact_title.trim(),
                    whatsapp_number_country : value.whatsapp_number_country,
                    whatsapp_number : value.whatsapp_number.trim(),
                    gender : value.gender.trim(),
                    is_default : value.is_default.trim(),
                    mobile_country : value.mobile_country.trim(),
                    designation : value.designation.trim(),
                };

                this.toggleAddContactModal('editContactModel');
                this.$emit("completeContact", this.Contactlist)
                // alert("Select contact detail updated successfully")
                useToasterNotify('success', "Select contact detail updated successfully")
            }
            else {
                useToasterNotify('error', "You have updated form in not found in list")
                // alert("You have updated form in not found in list");
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
        EditContactList(id) {
            if(typeof this.Contactlist[id] != 'undefined') {
                this.toggleAddContactModal('editContactModel');
                console.log("edit contact list");

                this.EditContactListData = {
                    contact_email : this.Contactlist[id].contact_email,
                    contact_name : this.Contactlist[id].contact_name,
                    contact_person_mobile : this.Contactlist[id].contact_person_mobile,
                    contact_title : this.Contactlist[id].contact_title,
                    whatsapp_number_country : this.Contactlist[id].whatsapp_number_country,
                    whatsapp_number : this.Contactlist[id].whatsapp_number,
                    gender : this.Contactlist[id].gender,
                    is_default : this.Contactlist[id].is_default,
                    mobile_country : this.Contactlist[id].mobile_country,
                    designation : this.Contactlist[id].designation,
                    id : id,
                };
            }
            else {
                useToasterNotify('error', "Please select a valid contact detail")
                // alert("please select a valid contact detail");
            }
        },
        DeleteContactList(index) {
            if(confirm("Do you really want to delete?")){
                if(this.Contactlist && this.Contactlist.length > 0) {
                    this.Contactlist.splice(index, 1);
                    this.$emit("completeContact", this.Contactlist)
                    // alert("Select contact detail deleted successfully.");
                    useToasterNotify('success', "Select contact detail deleted successfully.")
                } else {
                    // alert("Select contact detail not found in list.");
                    useToasterNotify('error', "Select contact detail not found in list.")
                }
            }
        },
        toggleAddContactModal(toggleModel){
            console.log('toggle modal');
            this[toggleModel] =  !this[toggleModel];
        }
    },
    mounted() {
        initFlowbite();
    }

}
</script>