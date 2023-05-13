<template>
    <Form @submit="ownerInfoNext" :validation-schema="owner_info_schema">

        <div class="grid">

            <!-- owner name -->
            <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div class="sm:col-span-2">
                    <label for="owner_name"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Owner Name
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field type="text" name="owner_name" id="owner_name" v-model="formValue.owner_info.owner_name"
                            class="block lg:w-1/4 rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        <p class="text-left text-red-500">
                            <ErrorMessage name="owner_name" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Owner Email -->
            <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div class="sm:col-span-2">
                    <label for="owner_email"
                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Owner Email
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <Field type="text" name="owner_email" id="owner_email" v-model="formValue.owner_info.owner_email"
                            class="block lg:w-1/4    rounded-md border-0 py-1.5 text-gray-900 dark:text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <p class="text-left text-red-500">
                            <ErrorMessage name="owner_email" />
                        </p>
                    </div>
                </div>
            </div>

            <!-- Gender -->
            <div class="mt-1 pb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                <div class="sm:col-span-2">
                    <label for="gender" class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Gender
                        <RequiredAstrik />:
                    </label>
                    <div class="mt-2">
                        <div class="flex items-center mb-4">
                            <Field v-model="formValue.owner_info.gender" value="male" id="gender-1" type="radio"
                                name="gender"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="gender-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Male
                            </label>

                            <Field v-model="formValue.owner_info.gender" id="gender-2" value="female" type="radio"
                                name="gender"
                                class="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="gender-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Female
                            </label>
                        </div>
                        <p class="text-left text-red-500">
                            <ErrorMessage name="gender" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center pt-4">
            <button type="button" class="text-white bg-black px-6 py-2 rounded-lg mr-4 cursor-pointer"
                v-on:click="toggleTabs(1)">Back</button>
            <button class="text-white bg-black px-6 py-2 rounded-lg">
                Next
            </button>
        </div>
    </Form>
</template>
<script>
export default {

}
</script>