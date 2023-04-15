<template>
    <thead class="bg-gray-300 border-b">
        <tr>
            <template v-if="tableHeadingData.length > 0 ">

                <th v-if="isSearialNumberShow" scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                    #
                </th>
                <th
                    v-for="(value, index) in tableHeadingData"
                    :key="index"
                    scope="col"
                    class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                    {{ value }}
                </th>
                <th v-if="isActionShow" scope="col" class="text-lg font-medium text-gray-900 px-6 py-4 text-center">
                    Action
                </th>
            </template>
        </tr>
    </thead>
</template>
<script>

export default {
    props: {
        tableHeadingData : {
            type :Array,
            required :true,
            default : []
        },
        isSearialNumberShow : {
            type : Boolean,
            default : true
        },
        isActionShow : {
            type : Boolean,
            default : true
        }
    }
}
</script>