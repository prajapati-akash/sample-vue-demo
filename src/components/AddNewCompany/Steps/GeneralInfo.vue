<template>
    <Form @submit="generalInfoNext" :validation-schema="schema">
        <div class="grid">

            <!-- Compnay Name -->
            <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div class="sm:col-span-2">
                    <label for="company_name"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Company Name
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field type="text" name="company_name" id="company_name"
                            v-model="formValue.general_info.company_name"
                            class="block lg:w-1/4    rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <p class="text-left text-red-500">
                            <ErrorMessage name="company_name" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Compnay Email -->
            <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div class="sm:col-span-2">
                    <label for="company_email"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Company Email
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field type="text" name="company_email" id="company_email"
                            v-model="formValue.general_info.company_email"
                            class="block lg:w-1/4    rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <p class="text-left text-red-500">
                            <ErrorMessage name="company_email" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Compnay Address -->
            <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div class="sm:col-span-2">
                    <label for="company_address"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Company Address
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field type="text" name="company_address" id="company_address"
                            v-model="formValue.general_info.company_address"
                            class="block lg:w-1/4  rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <p class="text-left text-red-500">
                            <ErrorMessage name="company_address" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Country -->
            <div class="mt-1 pb-4 grid lg:grid-cols-4 sm:grid-cols-1">
                <div class="sm:col-span-1">
                    <label for="company_country"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Country
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field as="select" id="company_country" name="company_country" autocomplete="on"
                            v-model="formValue.general_info.company_country"
                            class="sm:w-4/5 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value=""></option>
                            <template v-if="countryList.countries">
                                <option v-for="(item, index) in countryList.countries" :value="item.name" :key="index">
                                    {{ item.name }}
                                </option>
                            </template>
                        </Field>
                        <p class="text-left text-red-500">
                            <ErrorMessage name="company_country" />
                        </p>
                    </div>
                </div>

                <!-- Language -->
                <div class="sm:col-span-1">
                    <label for="company_language"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Language
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field as="select" id="company_language" name="company_language" autocomplete="on"
                            v-model="formValue.general_info.company_language"
                            class="sm:w-4/5 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value=""></option>
                            <template v-if="languageList.languages">
                                <option v-for="(item, index) in languageList.languages" :value="item.label" :key="index">
                                    {{ item.label }}
                                </option>
                            </template>
                        </Field>
                        <p class="text-left text-red-500">
                            <ErrorMessage name="company_country" />
                        </p>
                    </div>
                </div>
            </div>

        </div>
        <div class="flex justify-end items-center pt-4">
            <button type="submit" class="text-white bg-black px-6 py-2 rounded-lg selft-center">Next</button>
        </div>
    </Form>
</template>

<script>
export default {
    
}
</script>