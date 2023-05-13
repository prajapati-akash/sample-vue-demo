<template>
    <div class="lg:grid w-full justify-items-stretch pt-9">
        <div class="lg:w-4/5 sm:w-full justify-self-center">
            <div class="justify-self-center">
                <h3 class="text-3xl font-semibold text-center underline">Student list</h3>
                <div class="flex items-center justify-end gap-x-6 text-green-600 hover:text-green-400 border-gray-400 pt-7">
                    <router-link :to="{ name: 'addStudent' }" class="p-3 rounded text-white bg-gray-900 hover:bg-gray-700">
                        Add Profile</router-link>
                </div>
            </div>
            <div class="justify-self-center">
                <div class="pt-3 ">
                    <div class="lg:flex items-center pb-5">
                        <span class="text-left block text-lg font-medium leading-6 text-gray-900 lg:pr-4"> search field :</span>
                        <select v-model="searchField"
                        class="block pr-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option>name</option>
                            <option>email</option>
                        </select>
                        <span class="lg:pl-4 lg:pr-4 text-left block text-lg font-medium leading-6 text-gray-900">search value :  </span>
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

                        <template #header-name="header">
                        <div class="flex">
                            <div class="flex-initial items-center self-center">
                                <img src="../../assets/images/profile.png" class="header-icon w-5 h-5">
                            </div>
                            <div class="flex-intial items-center self-center">
                                <p class="pl-1 pt-1">{{ header.text }}</p>
                            </div>
                        </div>
                        </template>

                        <template #item-profile_picture.value="item">
                        <div class="flex justify-center"> {{ }}
                            <template v-if="typeof item.profile_picture.value !== 'undefined'">
                                <img :src="item.profile_picture.value" style="width: 100px; height: 80px;" alt="profile image not found"/>
                            </template>
                            <template v-else>N/A</template>
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
            </div>
        </div>
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
    { text: "profile_picture", value: "profile_picture.value" },
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
