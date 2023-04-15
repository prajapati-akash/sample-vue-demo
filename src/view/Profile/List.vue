<template>
    <div class="pt-3 pb-18">
        <h3 class="text-3xl font-semibold text-center underline">Student list</h3>
        <div class="flex items-center justify-end gap-x-6 text-green-600 hover:text-green-400 border-gray-400">
            <router-link :to="{ name: 'addStudent' }" class="p-3 rounded text-white bg-gray-900 hover:bg-gray-700">
                Add Profile</router-link>
        </div>
    </div>
    <div class="pt-3">
        <div class="flex items-center pb-5">
            <span class="text-left block text-lg font-medium leading-6 text-gray-900 pr-4"> search field : </span>
            <select v-model="searchField"
            class="block pr-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option>player</option>
                <option>team</option>
            </select>
            <span class="text-left block text-lg font-medium leading-6 text-gray-900 pl-4 pr-4">search value :  </span>
            <input type="text" v-model="searchValue" 
            class="block pr-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>

        <Vue3EasyDataTable
            show-index
            v-model:items-selected="itemsSelected"
            :headers="headers"
            :items="items"
            :rows-per-page="10"
            :search-field="searchField"
            :search-value="searchValue"
            alternating
            border-cell
            buttons-pagination
            :theme-color="`#f48225`"
        >

            <!-- <template #header-player="header">
            <div class="flex">
                <img src="../../assets/images/profile.png" class="header-icon">
                <p class="justify-center pt-4">{{ header.text }}</p>
            </div>
            </template> -->

            <template #item-education_details="item">
            <div class="flex">
                <img :src="education_details" class="header-icon">
                <img :src="item"/>
            </div>
            </template>

            <template #loading>
                <img
                src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                style="width: 100px; height: 80px;"
                />
            </template>
            <template #empty-message>
                <p class="font-semibold">Data not found</p>
            </template>
        </Vue3EasyDataTable>
        <!-- {{ itemsSelected }} -->
    </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import Vue3EasyDataTable from "vue3-easy-data-table";
import itemData from "../../assets/data"
import 'vue3-easy-data-table/dist/style.css';
import { useStudent } from '@/store/Student'
const studentStoreData = useStudent();

let listItemData = [];
let headers = ref([
    { text: "NAME", value: "name" },
    { text: "EMAIL", value: "email" },
    { text: "COLLEGE_NAME", value: "college_name" },
    { text: "GENDER", value: "gender" },
    { text: "Profile Picture", value: "profile_picture.value" },
]);
if(studentStoreData.getStudentData().length > 0)
{
    // listItemData = toRaw(studentStoreData.getStudentData());
    listItemData = studentStoreData.getStudentData();
    // console.log(listItemData);
}
const items = ref(listItemData);

const itemsSelected = ref([]);

const searchField = ref("");
const searchValue = ref("");

// options api examples
// export default {
//     components: {
//         Vue3EasyDataTable,
//     },
//     data() {
//         return {
//             headers: [
//                 // { text: "INDEX", value: "index" },
//                 { text: "PLAYER", value: "player" },
//                 { text: "TEAM", value: "team" },
//                 { text: "NUMBER", value: "number" },
//                 { text: "POSITION", value: "position" },
//                 { text: "HEIGHT", value: "indicator.height" },
//                 { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
//                 { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
//                 { text: "COUNTRY", value: "country" },
//             ],
//             items: listItemData,
//             itemsSelected : [],
//             searchField : "",
//             searchValue : "",
//         };
//     },
// };
</script>
