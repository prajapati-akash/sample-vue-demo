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
                                <tr v-if="document.length > 0" v-for="(value, index) in document" v-bind:key="value.id" class="bg-gray-100 border-b">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.document_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.document_category }}
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                        {{ value.document_remarks }}
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

                                <!-- Document Name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="document_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Document Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="document_name"
                                                id="document_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="document_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Document Category ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="document_category" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Document Category <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="document_category"
                                                name="document_category"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="documentCategoryList" v-for="(item, index) in documentCategoryList" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="document_category" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Is Expireable ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="is_expirable" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Is Expirable ? :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                as="select" id="is_expirable"
                                                name="is_expirable"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <option v-if="isDefaultList" v-for="(item, index) in isDefaultList" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_expirable" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Expiry Date (Date)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="expiry_date" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Expiry Date:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="date"
                                                name="expiry_date"
                                                id="expiry_date"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateDateField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="expiry_date" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Document Remarks -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="document_remarks" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Remarks:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                type="text"
                                                name="document_remarks"
                                                id="document_remarks"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="document_remarks" /></p>
                                        </div>
                                    </div>
                                </div>

                                 <!-- Document Attachment -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label 
                                            for="document_attachment"
                                            class="text-left block text-lg font-medium leading-6 text-gray-900"
                                            >
                                            Document Attachment :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                multiple
                                                @change="uploadImage"
                                                type="file"
                                                name="document_attachment"
                                                id="document_attachment"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- image previw -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3 border-2 border-black rounded-md h-auto">
                                        <div class="grid grid-cols-4 gap-4 p-3 ">
                                            <div v-for="(image, key) in document_attachments" :key="key" class="border-2 border-black rounded-md h-32">
                                                <img :ref="'image'" alt="" src="" class="border w-48 h-full"/>
                                                <button
                                                    type="button" @click="removeImage(image, key)" class="-mt-7 absolute"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-700    ">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
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

                                <!-- Document Name (text)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="document_name" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Document Name <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.document_name"
                                                type="text"
                                                name="document_name"
                                                id="document_name"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="document_name" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Document Category ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="document_category" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Document Category <RequiredAstrik/>:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.document_category"
                                                as="select" id="document_category"
                                                name="document_category"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateSelectRequiredField">
                                                <option value=""></option>
                                                <option v-if="documentCategoryList" v-for="(item, index) in documentCategoryList" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="document_category" /></p>
                                        </div>
                                    </div>
                                </div>

                                 <!-- Is Expireable ( select ) -->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="is_expirable" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Is Expirable ? :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.is_expirable"
                                                as="select" id="is_expirable"
                                                name="is_expirable"
                                                autocomplete="on"
                                                class="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option value=""></option>
                                                <option v-if="isDefaultList" v-for="(item, index) in isDefaultList" :value="item.label"
                                                :key="index">{{ item.label }}</option>
                                            </Field>
                                            <p class="text-left text-red-500"><ErrorMessage name="is_expirable" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Expiry Date (Date)  *-->
                                <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-4">
                                        <label for="expiry_date" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Expiry Date:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.expiry_date"
                                                type="date"
                                                name="expiry_date"
                                                id="expiry_date"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                :rules="validateRequiredField"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="expiry_date" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Document Remarks -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label for="document_remarks" class="text-left block text-lg font-medium leading-6 text-gray-900">
                                            Remarks:
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                v-model="editFormData.document_remarks"
                                                type="text"
                                                name="document_remarks"
                                                id="document_remarks"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p class="text-left text-red-500"><ErrorMessage name="document_remarks" /></p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Document Attachment -->
                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3">
                                        <label 
                                            for="document_attachment"
                                            class="text-left block text-lg font-medium leading-6 text-gray-900"
                                            >
                                            Document Attachment :
                                        </label>
                                        <div class="mt-2">
                                            <Field
                                                multiple
                                                @change="uploadImage"
                                                type="file"
                                                name="document_attachment"
                                                id="document_attachment"
                                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <!-- image previw -->

                                <div class="mt-1 pb-4  grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                                    <div class="sm:col-span-3 border-2 border-black rounded-md h-auto">
                                        <div class="grid grid-cols-4 gap-4 p-3 ">
                                            <div v-for="(image, key) in editFormData.document_attachments" :key="key" class="border-2 border-black rounded-md h-32">
                                                <img :ref="'image'" alt="" src="" class="border w-48 h-full"/>
                                                <button
                                                    type="button" @click="removeImage(image, key)" class="-mt-7 absolute"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-700    ">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
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
import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';
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
        isDefaultList : {
            type : [Object, Array],
            required: true,
        }
    },
    emits: ["completeDocument"],
    components : {
        Form,
        Field,
        ErrorMessage,
        RequiredAstrik,
        TableHeader,
        VueMultiImageUpload,
    },
    data() {
        return {
            document : [],
            editFormData : { },
            documentCategoryList : [],
            AddToggleModel : false,
            editToggleModel : false,
            newForm : true,
            tableHeadingData : ["Document Name","Category","Notes"],
            component : {},
            options : {},
            imageSize : 2000000, // 2MB
            formatType : ['image/jpeg', 'image/png', 'image/jpg'],
            document_attachments : [],
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
            this.document.push({
                document_name : values.document_name.trim(),
                document_category : values.document_category.trim(),
                expiry_date : (values.expiry_date !== undefined) ?values.expiry_date.trim() : "00-00-0000",
                document_remarks : (values.document_remarks != undefined) ? values.document_remarks.trim() : "",
                is_expirable : (values.is_expirable !== undefined ) ?values.is_expirable.trim() : "",
                document_attachments : this.document_attachments,
            })
            this.document_attachments = []
            console.log('this.document')
            console.log(this.document)

            this.toggleModel("AddToggleModel");
            this.$emit("completeDocument", this.document)
            this.$refs.addressRefForm.resetForm();
        },
        onEditForm(id) {
            if(typeof this.document[id] != 'undefined') {
                console.log('edit form')
                this.editFormData = {
                    id : id,
                    document_name : this.document[id].document_name,
                    expiry_date : this.document[id].expiry_date,
                    document_category : this.document[id].document_category,
                    document_remarks : this.document[id].document_remarks,
                    is_expirable : this.document[id].is_expirable,
                    document_attachments : this.document[id].document_attachments,
                }

                this.document_attachments = []
                this.document_attachments = this.document[id].document_attachments
                this.refreshImg()

                this.toggleModel("editToggleModel")
            }
            else {
                alert("please select a valid contact detail");
            }
        },
        updateForm(values) {
            if(!typeof values.id !== 'undefined' && typeof values.id == 'number') {

                this.document[values.id] = {
                    document_name : values.document_name.trim(),
                    document_category : values.document_category.trim(),
                    expiry_date : (values.expiry_date !== undefined) ?values.expiry_date.trim() : "00-00-0000",
                    document_remarks : (values.document_remarks != undefined) ? values.document_remarks.trim() : "",
                    is_expirable : (values.is_expirable !== undefined ) ?values.is_expirable.trim() : "",
                    document_attachments : this.document_attachments,
                };
                this.toggleModel("editToggleModel")
                this.$emit("completeDocument", this.document)
                this.document_attachments = []
                alert("Select tax information detail updated successfully")
            }
            else {
                alert("You have updated form in not found in list");
            }
        },
        validateDateField(value) {
            let CurrentDate = new Date();
            value = new Date(value);
            if(value < CurrentDate || value === CurrentDate){
                return 'Please select a date today or after the current date.';
            }

            return true;
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
                if(this.document && this.document.length > 0) {
                    this.document.splice(index, 1);
                    this.$emit("completeDocument", this.document)
                    alert("Select contact detail deleted successfully.");
                } else {
                    alert("Select contact detail not found in list.");
                }
            }
        },
        toggleModel(toggleModal){
            console.log('open model');

            this[toggleModal] = ! this[toggleModal];

            if(this[toggleModal]) {
                this.loadAPIResponse("GEN_2102_1026", "documentCategoryList");
            }
        },
        uploadImage(e) {
            let selectedFiles = e.target.files;

            for (let i = 0; i < selectedFiles.length; i++) {
                this.document_attachments.push(selectedFiles[i]);
            }

            this.refreshImg()
            document.getElementById("document_attachment").value = "";
        },
        refreshImg() {
            console.log('refresh img')

            for (let i = 0; i < this.document_attachments.length; i++) {
                let reader = new FileReader();
                reader.onload = (e) => {
                this.$refs.image[i].src = reader.result;
                };
                reader.readAsDataURL(this.document_attachments[i]);
            }
        },
        removeImage(image, index) {
            if(confirm("Do you really want to delete document attachment?")) {
                this.document_attachments.splice(index, 1);
                this.refreshImg()
            } else {
            }

        },
    },
    mounted() {
        initFlowbite();
        this.options.max = "Max";
        this.options.ready = "Ready";
        this.options.select = "Choosed";
    },
    computed : {
    }

}
</script>