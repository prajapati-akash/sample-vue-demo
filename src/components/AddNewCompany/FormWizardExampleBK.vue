<template>
    <div class="bg-white dark:bg-gray-800">
        <div class="mx-auto max-w-7xl">
            <p class="font-bold text-2xl">Add new Company</p>
            {{ this.visitedTab }}
            <div class="flex flex-wrap">
                <div class="w-full">
                    <div class="p-8">
                        <ul class="lg:grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                            <li>
                                <a v-on:click="toggleTabs(1)"
                                    class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4 "
                                    :class="{
                                        'border-b-4': 1 <= openTab,
                                        'border-indigo-600': 1 <= openTab,
                                        'border-transparent': false,
                                    }">
                                    General
                                </a>
                            </li>
                            <li>
                                <template v-if="openTab >= 3 || visitedTab.includes(2)">
                                    <a v-on:click="toggleTabs(2)"
                                        class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4"
                                        :class="{
                                                'border-b-4': 2 <= openTab,
                                                'border-indigo-600': 2 <= openTab,
                                                'border-transparent': false,
                                            }">
                                        Owner Info
                                    </a>
                                </template>
                                <template v-else>
                                    <a class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4"
                                        :class="{
                                                'border-b-4': 2 <= openTab,
                                                'border-indigo-600': 2 <= openTab,
                                                'border-transparent': false,
                                            }">
                                        Owner Info
                                    </a>
                                </template>
                            </li>
                            <li>
                                <template v-if="openTab >= 4 || visitedTab.includes(3)">
                                    <a v-on:click="toggleTabs(3)"
                                        class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4"
                                        :class="{
                                                'border-b-4': 3 <= openTab,
                                                'border-indigo-600': 3 <= openTab,
                                                'border-transparent': false,
                                            }">
                                        Permission Info
                                    </a>
                                </template>
                                <template v-else>
                                    <a class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4"
                                        :class="{
                                                'border-b-4': 3 <= openTab,
                                                'border-indigo-600': 3 <= openTab,
                                                'border-transparent': false,
                                            }">
                                        Permission Info
                                    </a>
                                </template>
                            </li>
                            <li>
                                <template v-if="visitedTab.includes(4)">
                                    <a v-on:click="toggleTabs(4)"
                                        class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4"
                                        :class="{
                                                'border-b-4': openTab === 4,
                                                'border-indigo-600': openTab === 4,
                                                'border-transparent': openTab !== 4,
                                            }">
                                        Review
                                    </a>
                                </template>
                                <template v-else>
                                    <a class="flex justify-center cursor-pointer hover:text-indigo-600 hover:border-indigo-600 py-4"
                                        :class="{
                                                'border-b-4': openTab === 4,
                                                'border-indigo-600': openTab === 4,
                                                'border-transparent': openTab !== 4,
                                            }">
                                        Review
                                    </a>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <Form @submit="generalInfoNext" @invalid-submit="oninvalidGeneralInfo" :validation-schema="currentSchema" keep-values v-slot="{ handleSubmit, values }">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="px-4 py-5 flex-auto">
                            <div class="tab-content tab-space">

                                <!-- General info -->
                                <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                                    <!-- <Form @submit="generalInfoNext" :validation-schema="schema" @invalid-submit="oninvalidGeneralInfo"> -->
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
                                                        <div class="flex ">
                                                            <div class="flex-none w-4/5">
                                                                <Field as="select" id="company_country"
                                                                    name="company_country" autocomplete="on"
                                                                    v-model="formValue.general_info.company_country"
                                                                    class="w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                    <template v-if="countryList.countries">
                                                                        <option value=""></option>
                                                                        <option
                                                                            v-for="(item, index) in countryList.countries"
                                                                            :value="item.name" :key="index">
                                                                            {{ item.name }}
                                                                        </option>
                                                                    </template>
                                                                    <template v-else>
                                                                        <option value="">loading...</option>
                                                                    </template>
                                                                </Field>
                                                            </div>
                                                            <div class="flex-none pl-2" v-if="!countryList.countries">
                                                                <Spinner size="8" />
                                                            </div>
                                                        </div>
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
                                                        <div class="flex ">
                                                            <div class="flex-none w-4/5">
                                                                <Field as="select" id="company_language"
                                                                    name="company_language" autocomplete="on"
                                                                    v-model="formValue.general_info.company_language"
                                                                    class="sm:w-4/5 w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-gray-600 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                                    <template v-if="languageList.languages">
                                                                        <option value=""></option>
                                                                        <option
                                                                            v-for="(item, index) in languageList.languages"
                                                                            :value="item.label" :key="index">
                                                                            {{ item.label }}
                                                                        </option>
                                                                    </template>
                                                                    <template v-else>
                                                                        <option value="">loading...</option>
                                                                    </template>
                                                                </Field>
                                                            </div>
                                                            <div class="flex-none pl-2" v-if="!languageList.languages">
                                                                <Spinner size="8" />
                                                            </div>
                                                        </div>
                                                        <p class="text-left text-red-500">
                                                            <ErrorMessage name="company_country" />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="flex justify-end items-center pt-4">
                                            <!-- <button type="submit"
                                                class="text-white bg-black px-6 py-2 rounded-lg selft-center"
                                                id="general_info">Next</button> -->
                                        </div>
                                    <!-- </Form> -->
                                </div>

                                <!-- Owner info -->
                                <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                    <!-- <Form @submit="ownerInfoNext" :validation-schema="owner_info_schema"> -->

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
                                                        <Field type="text" name="owner_name" id="owner_name"
                                                            v-model="formValue.owner_info.owner_name"
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
                                                        <Field type="text" name="owner_email" id="owner_email"
                                                            v-model="formValue.owner_info.owner_email"
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
                                                    <label for="gender"
                                                        class="text-left block text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                                        Gender
                                                        <RequiredAstrik />:
                                                    </label>
                                                    <div class="mt-2">
                                                        <div class="flex items-center mb-4">
                                                            <Field v-model="formValue.owner_info.gender" value="male"
                                                                id="gender-1" type="radio" name="gender"
                                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="gender-1"
                                                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                                Male
                                                            </label>

                                                            <Field v-model="formValue.owner_info.gender" id="gender-2"
                                                                value="female" type="radio" name="gender"
                                                                class="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="gender-2"
                                                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                                            <!-- <button type="button"
                                                class="text-white bg-black px-6 py-2 rounded-lg mr-4 cursor-pointer"
                                                v-on:click="toggleTabs(1)">Back</button>
                                            <button class="text-white bg-black px-6 py-2 rounded-lg">
                                                Next
                                            </button> -->
                                        </div>
                                    <!-- </Form> -->
                                </div>

                                <!-- Permission info -->
                                <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                                    <br>
                                    <!-- <Form @submit="permissionNext" :validation-schema="permission_schema"> -->
                                        <div class="flex items-center mb-4 ">
                                            <Field type="checkbox" id="is_checked" name="is_checked_permission"
                                                v-on:click='checkAll(is_checked)' :value="is_checked" class="rounded-sm" />
                                            <label for="default-checkbox"
                                                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Enable all Permissions <span class="text-left text-red-500">*
                                                    <ErrorMessage name="permission_modules" />
                                                </span>
                                            </label>
                                        </div>

                                        <template v-if="moduleList.modules">
                                            <div v-for="(item, index) in moduleList.modules" :key="index"
                                                class="flex bg-gray-50 rounded-sm py-3 border-b">
                                                <div class="w-2/3">
                                                    <p class="ml-2 font-medium text-gray-900 dark:text-gray-300 text-2xl">
                                                        {{ item.name }}
                                                    </p>
                                                    <p class="ml-2 font-medium text-gray-500 dark:text-white">
                                                        {{ item.description }}
                                                    </p>
                                                </div>
                                                <div class="w-2/6 text-end pr-4 pt-3">
                                                    <label class="relative inline-flex items-end cursor-pointer">
                                                        <Field type="checkbox" name="permission_modules"
                                                            :id="item.type + '_' + index" class="sr-only peer"
                                                            v-bind:value="item" @change='updateCheckall(item)' />
                                                        <div
                                                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class='w-full'>
                                                <div class="flex justify-center">
                                                    <p class="">
                                                        <Spinner size="12" />
                                                        loading ...
                                                    </p>
                                                </div>
                                            </div>
                                        </template>


                                        <div class="flex justify-end items-center pt-4">
                                            <!-- <button type="button" class="text-white bg-black px-6 py-2 rounded-lg mr-4"
                                                v-on:click="toggleTabs(2)">Back</button>
                                            <button class="text-white bg-black px-6 py-2 rounded-lg"
                                                :class="{ 'bg-gray-400': !moduleList.modules, 'cursor-not-allowed': !moduleList.modules }"
                                                :disabled="!moduleList.modules">Next</button> -->
                                        </div>
                                    <!-- </Form> -->
                                </div>

                                <!-- Review  -->
                                <div v-bind:class="{ 'hidden': openTab !== 4 }">

                                    <!-- General Info -->
                                    <div class="grid lg:grid-cols-6 divide-x rounded py-5 pl-5 border border-dashed">
                                        <div class="lg:pb-4 sm:pb-4">
                                            <p class="lg:text-left text-center  font-bold ">General</p>
                                            <p class="lg:text-left sm:pb-4 text-center sm:m-2">
                                                <a v-on:click="toggleTabs(1)"
                                                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                                </a>
                                            </p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Company Name</p>
                                            <p class="text-sm text-gray-500">{{ formValue.general_info.company_name.length >
                                                0 ? formValue.general_info.company_name : "N/A" }}</p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Company email</p>
                                            <p class="text-sm text-gray-500">{{ formValue.general_info.company_email.length
                                                > 0 ? formValue.general_info.company_email : "N/A" }}</p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Company Address</p>
                                            <p class="text-sm text-gray-500">{{
                                                formValue.general_info.company_address.length > 0 ?
                                                formValue.general_info.company_address : "N/A" }}</p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Country</p>
                                            <p class="text-sm text-gray-500">{{
                                                formValue.general_info.company_country.length > 0 ?
                                                formValue.general_info.company_country : "N/A" }}</p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Language</p>
                                            <p class="text-sm text-gray-500">{{
                                                formValue.general_info.company_language.length > 0 ?
                                                formValue.general_info.company_language : "N/A" }}</p>
                                        </div>
                                    </div>

                                    <!-- Owner info -->
                                    <div class="grid lg:grid-cols-6 divide-x rounded py-5 pl-5 border border-dashed mt-8">
                                        <div class="">
                                            <p class="lg:text-left text-center font-bold">Owner info</p>
                                            <p class="lg:text-left sm:pb-4 text-center sm:m-2">
                                                <a v-on:click="toggleTabs(2)"
                                                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                                </a>
                                            </p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Owner Name</p>
                                            <p class="text-sm text-gray-500">{{ formValue.owner_info.owner_name.length != ''
                                                ? formValue.owner_info.owner_name : "N/A" }}</p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Owner email</p>
                                            <p class="text-sm text-gray-500">{{ formValue.owner_info.owner_email.length !=
                                                '' ? formValue.owner_info.owner_email : "N/A" }}</p>
                                        </div>
                                        <div class="pl-4 ">
                                            <p class="text-xl">Gender</p>
                                            <p class="text-sm text-gray-500">{{ formValue.owner_info.gender.length != '' ?
                                                formValue.owner_info.gender : "N/A" }}</p>
                                        </div>
                                    </div>

                                    <!-- Permission info -->

                                    <div class="grid grid-cols-6 divide-x rounded py-5 pl-5 border border-dashed mt-8">
                                        <div class="col-span-1">
                                            <p class="lg:text-left text-center font-bold">Permission info</p>
                                            <p class="lg:text-left sm:pb-4 text-center sm:m-2">
                                                <a v-on:click="toggleTabs(3)"
                                                    class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                                                </a>
                                            </p>
                                        </div>
                                        <div class="pl-4 col-span-5 pr-5">
                                            <template v-if="formValue.permission_info.length > 0">
                                                <div v-for="(item, index) in formValue.permission_info" :key="index"
                                                    class="border border-dashed mb-2">
                                                    <p class="text-xl m-5">{{ item.name }}</p>
                                                    <p class="text-sm m-5 text-gray-500">{{ item.description }}</p>
                                                </div>
                                            </template>
                                        </div>
                                    </div>

                                    <div class="flex justify-end items-center pt-8 divide-x">
                                        <!-- <button class="text-white bg-black px-6 py-2 rounded-lg mr-4"
                                            v-on:click="toggleTabs(3)">Back</button>
                                        <button @click="onSubmit" class="text-white bg-black px-6 py-2 rounded-lg"
                                            type="submit">Submit</button> -->
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end items-center pt-8 divide-x">
                                <!-- <button type="button"
                                    class="text-white bg-black px-6 py-2 rounded-lg mr-4 cursor-pointer"
                                    v-on:click="toggleTabs(1)">Back</button>
                                <button class="text-white bg-black px-6 py-2 rounded-lg">
                                    Next
                                </button> -->
                                <button v-if="openTab !== 0" type="button" @click="prevStep" class="text-white bg-black px-6 py-2 rounded-lg mr-4 cursor-pointer">
                                    Previous
                                </button>

                                <button v-if="openTab !== 4" type="submit" class="text-white bg-black px-6 py-2 rounded-lg mr-4 cursor-pointer">Next</button>

                                <button v-if="openTab === 4" type="submit" class="text-white bg-black px-6 py-2 rounded-lg mr-4 cursor-pointer">Finish</button>
                            </div>
                        </div>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { Spinner } from 'flowbite-vue'
import axios from 'axios'
import useToasterNotify from '@/js/comman-function.js'
import RequiredAstrik from '../RequiredAstrik.vue';
const VUE_APP_BASE_API = process.env.VUE_APP_BASE_API;
import { object, string } from 'yup';
import * as Yup from 'yup';

const validationSchema = [
  Yup.object({
    company_name: Yup.string().required(),
    company_email: Yup.string().required().email(),
    company_address: Yup.string().required(),
    company_country: Yup.string().required(),
    company_language: Yup.string().required(),
  }),
  Yup.object({
    owner_name: Yup.string().required(),
    owner_email: Yup.string().required(),
    gender: Yup.string().required(),
  }),
  Yup.object({
    permission_modules: Yup.array().min(1).required((value) => {
        if (value && value.length) {
            return true;
        }

        return 'Permission modules is a required field';
    }),
  }),
];
// const schema = object({
//     company_name: string().required('Name is required.'),
//     company_email: string().required('Company email is required.'),
//     company_address: string().required('Company address is required.'),
//     company_country: string().required('Company country is required.'),
//     company_language: string().required('Company language is required.'),
// });


const owner_info_schema = object({
    owner_name: string().required('owner name is required.'),
    owner_email: string().required('owner email is required.'),
    gender: string().required('gender is required.'),
});

// const permission_schema = object({
//     permission_modules: Yup.array().min(1).required("Permission modules is a required field"),
// });

const permission_schema = {
    permission_modules: (value) => {
        if (value && value.length) {
            return true;
        }

        return 'Permission modules is a required field';
    },
};

export default {
    name: 'AddNewCompany',
    components: {
        RequiredAstrik,
        Form,
        Field,
        ErrorMessage,
        Spinner,
    },
    data() {
        return {
            validationSchema,
            owner_info_schema,
            permission_schema,
            openTab: 1,
            company_name: '',
            visitedTab: [],
            formValue: {
                general_info: {
                    company_name: '',
                    company_email: '',
                    company_address: '',
                    company_country: '',
                    company_language: '',
                },
                owner_info: {
                    owner_name: '',
                    owner_email: '',
                    gender: '',
                },
                permission_info: [],
            },
            is_checked: false,
            countryList: [],
            languageList: [],
            moduleList: [],
        }
    },
    async created() {
        this.loadAPIResponseData("f9803383-23cc-41aa-a544-1a7a27269761", "countryList");
        this.loadAPIResponseData("def98d1b-7026-47ad-a1b7-65d1aad20ba5", "languageList");
        this.loadAPIResponseData("7f4622f6-1967-4c30-8b50-be5bacf33832", "moduleList");
    },
    methods: {
        toggleTabs: function (tabNumber) {
            console.log(tabNumber)
            this.openTab = tabNumber
            // this.visitedTab.splice(tabNumber, 1)
        },
        generalInfoNext(values) {
            // this.toggleTabs(2)
            // if (!this.visitedTab.includes(1)) {
            //     this.visitedTab.push(1)
            // }

            if (this.openTab === 4) {
                console.log('Done: ');
                console.log(JSON.stringify(values, null, 2));
                return;
            }

            this.openTab++;
            console.log('hello submit general info :')
        },
        oninvalidGeneralInfo(data) {
            let firstError = Object.keys(data.errors)[0];
            console.log(firstError)
            document.getElementById(firstError).focus()
        },
        ownerInfoNext(value) {
            this.toggleTabs(3)
            if (!this.visitedTab.includes(2)) {
                this.visitedTab.push(2)
            }
            console.log('ownerInfo Next :')
        },
        permissionNext(tabNumber) {
            this.toggleTabs(4)
            if (!this.visitedTab.includes(3)) {
                // this.visitedTab.push(3, 4)
                this.visitedTab = [3, 4, ...this.visitedTab]
            }
            console.log('permission Next :')
        },
        onSubmit() {
            alert("Submit form successfully");
            console.log(this.formValue.general_info)
            console.log(this.formValue.owner_info)
            console.log(this.formValue.permission_info)
        },
        checkAll(is_checked_input) {
            this.is_checked = !is_checked_input;
            this.formValue.permission_info = [];

            if (this.is_checked) { // Check all
                this.formValue.permission_info = this.moduleList.modules
                // this.moduleList.modules.map((value, key) => {
                //     // this.formValue.permission_info.push(value)
                //     this.formValue.permission_info = [value, ...this.formValue.permission_info]
                //     // document.getElementById(value.type + "_" + key).checked = true;
                // })
                console.log('check all : ')
                this.permission_schema = {
                    permission_modules: (value) => {
                        return true;
                    },
                };
            } else {
                console.log('un check all : ')
                // this.moduleList.modules.map((value, key) => {
                //     document.getElementById(value.type + "_" + key).checked = false;
                // })
                this.permission_schema = {
                    permission_modules: (value) => {
                        if (value && value.length) {
                            return true;
                        }

                        return 'Permission modules is a required field';
                    },
                };
            }
            var get = document.getElementsByName('permission_modules');

            for (var i = 0; i < get.length; i++) {
                get[i].checked = this.is_checked;
            }
        },
        updateCheckall(value) {
            // console.log(value.id);
            var checkPermissionExists = this.formValue.permission_info.some((formValue, index) => {
                if (formValue.id == value.id) {
                    return true;
                }
            })

            if (!checkPermissionExists) {
                this.formValue.permission_info.push(value)
            } else {
                this.formValue.permission_info = this.formValue.permission_info.filter(
                    (el) => el.id !== value.id);
            }

            if (this.formValue.permission_info.length == this.moduleList.modules.length) {
                this.is_checked = true;
            } else {
                this.is_checked = false;
            }
            // console.log(this.formValue.permission_info);
        },
        async loadAPIResponseData(params, bind_params) {
            await axios.get(`https://mocki.io/v1/${params}`)
                .then((res) => {
                    if (res.status == 200) {
                        this[bind_params] = res.data.data;
                    } else {
                        this[bind_params] = [];
                    }
                });
        },
        prevStep() {
            if (this.openTab <= 0) {
                return;
            }

            this.openTab--;
        }
    },
    computed : {
        currentSchema() {
            var currentTab = ""
            currentTab = this.openTab;
            console.log(currentTab - 1)
            console.log(this.validationSchema[currentTab - 1])
            return this.validationSchema[currentTab - 1];
        }
    }
}
</script>