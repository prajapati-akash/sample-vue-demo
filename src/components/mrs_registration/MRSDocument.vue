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
import { Field, Form, ErrorMessage} from 'vee-validate';
import TableHeader from '../TableHeader.vue'
import useToasterNotify from '@/js/comman-function.js'

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
            useToasterNotify('success', "Document attachment details added successfully.")
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
                // alert("Please select a valid contact detail");
                useToasterNotify('error', "Please select a valid contact detail.")
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
                // alert("Select tax information detail updated successfully")
                useToasterNotify('success', "Select tax information detail updated successfully.")
            }
            else {
                // alert("You have updated form in not found in list");
                useToasterNotify('error', "You have updated form in not found in list.")
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
                    // alert("Select contact detail deleted successfully.");
                    useToasterNotify('success', "Select contact detail deleted successfully.")
                } else {
                    // alert("Select contact detail not found in list.");
                    useToasterNotify('error', "Select contact detail not found in list.")
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
        async uploadImage(e) {
            let selectedFiles = e.target.files;

            for (let i = 0; i < selectedFiles.length; i++) {
                await this.document_attachments.push(selectedFiles[i]);
            }

            this.refreshImg()
            document.getElementById("document_attachment").value = "";
        },
        refreshImg() {

            for (let i = 0; i < this.document_attachments.length; i++) {
                // if(this.document_attachments[i].type == "application/pdf") {
                //     console.log('png')
                //     var imagepath = "data:image/jpeg;base64,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"
                //     this.$refs.image[i].src = imagepath;
                // } else {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        this.$refs.image[i].src = reader.result;
                    };
                    reader.readAsDataURL(this.document_attachments[i]);
                // }
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