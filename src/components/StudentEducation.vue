<script setup>
import { onMounted} from 'vue'
import { Field, ErrorMessage, FieldArray } from 'vee-validate';
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})

function addNewField(push) {
  push({
      standard: '',
      board: '',
      university_name: '',
      percentage: '',
      pass_year: '',
    })
    console.log('add new field');
}

const removeEducationDetails = (remove, value) =>{
  if(confirm("Do you really want to delete?")) {
    remove(value);
  }
  // console.log(value);
}
</script>

<template>
  <div class="space-y-12">
    <div class="border-b border-gray-900/20 pb-2">
      <h1 class="text-left text-2xl font-semibold leading-7 text-gray-900">Education details</h1>
    </div>

    <div class="border-b border-gray-900/10 pb-12">

      <!-- heading of education details -->
      <div class="flex flex-row pb-3 mr-16">
        <div class="flex-initial w-48  pl-3">
          <p class="font-semibold text-center">Standard</p>
        </div>
        <div class="flex-initial w-24 pl-3">
          <p class="font-semibold text-center">Board</p>
        </div>
        <div class="flex-initial w-80 pl-3">
          <p class="font-semibold text-center">University name</p>
        </div>
        <div class="flex-initial w-28 pl-3">
          <p class="font-semibold text-center">Percentage (%)</p>
        </div>
        <div class="flex-initial w-28 pl-3">
          <p class="font-semibold text-center">Passing year</p>
        </div>
        <div class="flex-initial w-25">
        </div>
      </div>

        <FieldArray name="education_details" v-slot="{ fields, push, remove}">
          <!-- hello, {{ fields }} -->
          <div class="flex items-center justify-end gap-x-6">
              <button type="button" @click="addNewField(push)" class=" text-green-600 hover:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <fieldset
          class="InputGroup"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <div class="flex pb-3">
              <p class="font-semibold text-center pl-5 pt-1">{{ idx + 1 }}.</p>

              <!-- Standard -->
              <div class="flex-initial w-36 pl-3">
                <Field type="text" :name="`education_details[${idx}].standard`" :id="`standard__${idx}`" autocomplete="given-name"
                  placeholder="Ex: 10th"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`education_details[${idx}].standard`" class="text-red-500" />
              </div>

              <!-- Board input -->
              <div class="flex-initial w-32 pl-3">
                <Field type="text" :name="`education_details[${idx}].board`" :id="`board__${idx}`" autocomplete="given-name"
                  placeholder="Ex: Board name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`education_details[${idx}].board`" class="text-red-500" />
              </div>

              <!-- Univercity name input -->
              <div class="flex-initial w-80 pl-3">
                <Field type="text" :name="`education_details[${idx}].university_name`" :id="`university_name_${idx}`" autocomplete="given-name"
                  placeholder="Ex: University name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`education_details[${idx}].university_name`" class="text-red-500" />
              </div>

              <!-- Percentage input -->
              <div class="flex-initial w-24 pl-3">
                <Field type="number" :name="`education_details[${idx}].percentage`" :id="`percentage_${idx}`" autocomplete="given-name"
                  placeholder="Ex: 100"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`education_details[${idx}].percentage`" class="text-red-500" />
              </div>

              <!-- Passing year input -->
              <div class="flex-initial w-32 pl-3">
                <Field type="text" :name="`education_details[${idx}].pass_year`" :id="`pass_year_${idx}`" autocomplete="given-name"
                  placeholder="Ex: 2023"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`education_details[${idx}].pass_year`" class="text-red-500" />
              </div>

              <div class="flex-initial w-50 pl-3 pt-1" v-if="idx > 0">
                <button type="button" @click="removeEducationDetails(remove, idx)" class="text-red-600 hover:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>

              </div>
          </div>

          </fieldset>
        </FieldArray>
    </div>
  </div>
</template>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>