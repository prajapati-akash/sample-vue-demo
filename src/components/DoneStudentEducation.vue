<script setup>
import { onMounted, onUnmounted, onUpdated, onActivated } from 'vue'
import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate';
import * as yup from 'yup';
const emit = defineEmits(['completeEducation'])
// https://stackblitz.com/edit/vee-validate-v4-array-fields-rmuhk8?file=src%2FApp.vue

const schema = yup.object().shape({
  inputs: yup
    .array()
    .of(
      yup.object().shape({
        standard: yup.string().required().label("this field is required"),
        board: yup.string().required().label('Board'),
        university_name: yup.string().required().label('University name'),
        percentage: yup.string().required().label('Percentage')
        .test("percentage", "Please enter a valid Percentage",  (value) => {
          if(value < 0 ||value > 100) {
            return false;
          }
          return true;
        })
        .test("percentage", "Please enter only number",  (value) => {
          if(isNaN(Number)) {
            return true;
          }
        })
        ,
        pass_year: yup.string().required().label('Year')
        .test("passYear", "Please enter a valid passing year",  (value) => {
          if(value <= new Date().getFullYear()) {
            return true;
          }
          return false;
        })
        .test("passYear", "Please enter only number",  (value) => {
          if(isNaN(Number)) {
            return true;
          }
        })
        ,
      })
    )
    .strict(),
});

const initialData = {
      inputs: [
        {
          standard: "",
          board: "",
          university_name: "",
          percentage: "",
          pass_year: "",
        }
      ]
    };

// function submitEducationForm(values, { resetForm }) {
function submitEducationForm(values) {
  console.log('submit function');
  console.log(values.target.name);
  document.getElementById('submit_education_form').click();
  console.log('values');
  var inputData = inputData
  // emit('completeEducation', values);
  // resetForm();
}

onMounted(() => {
  console.log(`the component is now mounted.`)
})

function addNewField(push) {
  document.getElementById('submit_education_form').click();
  push({
      standard: '',
      board: '',
      university_name: '',
      percentage: '',
      pass_year: '',
    })
    // emit('completeEducation', values);
    console.log('add new field');
}

function add(value) {
  initialData.inputs.push({
      standard: "",
      board: "",
      university_name: "",
      percentage: "",
      pass_year: "",
    });
  }
</script>
<template>
  <div class="space-y-12">
    <div class="border-b border-gray-900/20 pb-2">
      <h1 class="text-left text-2xl font-semibold leading-7 text-gray-900">Education details</h1>
    </div>

    <div class="border-b border-gray-900/10 pb-12">

      <!-- heading of education details -->
      <div class="flex flex-row pb-3">
        <div class="flex-initial w-60  pl-3">
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
      </div>

      <Form @change="submitEducationForm" :initial-values="initialData" :validation-schema="schema">
        <FieldArray name="inputs" v-slot="{ fields, push, remove}">
          <div class="mt-6 flex items-center justify-end gap-x-6 pr-8">
            <!-- <button type="button" @click="push({
                standard: '',
                board: '',
                university_name: '',
                percentage: '',
                pass_year: '',
              })"> -->
              <button type="button" @click="addNewField(push)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-green-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <fieldset
          class="InputGroup"
          v-for="(field, idx) in fields"
          :key="field.key"
        >
          <!-- Input Field -->
          <div class="flex pb-3">
              <p class="font-semibold text-center pl-5 pt-1">{{ idx + 1 }}.</p>
              <div class="flex-none w-48 pl-3">
                <Field type="text" :name="`inputs[${idx}].standard`" :id="`standard__${idx}`" autocomplete="given-name"
                  placeholder="Ex: 10th"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`inputs[${idx}].standard`" class="text-red-500" />
              </div>

              <!-- Board input -->
              <div class="flex-none w-32 pl-3">
                <Field type="text" :name="`inputs[${idx}].board`" :id="`board__${idx}`" autocomplete="given-name"
                  placeholder="Ex: Board name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`inputs[${idx}].board`" class="text-red-500" />
              </div>

              <!-- Univercity name input -->
              <div class="flex-none w-80 pl-3">
                <Field type="text" :name="`inputs[${idx}].university_name`" :id="`university_name_${idx}`" autocomplete="given-name"
                  placeholder="Ex: University name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`inputs[${idx}].university_name`" class="text-red-500" />
              </div>

              <!-- Percentage input -->
              <div class="flex-none w-24 pl-3">
                <Field type="text" :name="`inputs[${idx}].percentage`" :id="`percentage_${idx}`" autocomplete="given-name"
                  placeholder="Ex: 100"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`inputs[${idx}].percentage`" class="text-red-500" />
              </div>

              <!-- Passing year input -->
              <div class="flex-none w-32 pl-3">
                <Field type="text" :name="`inputs[${idx}].pass_year`" :id="`pass_year_${idx}`" autocomplete="given-name"
                  placeholder="Ex: 2023"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <ErrorMessage :name="`inputs[${idx}].pass_year`" class="text-red-500" />
              </div>

              <div class="flex-none w-50 pl-3 pt-1" v-if="idx > 0">
                <button type="button" @click="remove(idx)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>

              </div>
          </div>

        </fieldset>
          <div class="mt-6 flex items-center justify-end gap-x-6 pr-8">
            <button type="button"
              class="text-sm font-semibold leading-6 text-gray-900" >
                Reset
            </button>
            <button type="submit" id="submit_education_form"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Update
            </button>
          </div>
        </FieldArray>
      </Form>
    </div>
  </div>
</template>

<script>
// import { Field, Form, ErrorMessage, FieldArray} from 'vee-validate';
// import * as Yup from 'yup';

// export default {
//   components: {
//     Field,
//     Form,
//     ErrorMessage,
//   },
//   data() {
//     const schema = Yup.object().shape({
//       inputs: Yup
//         .array()
//         .of(
//           Yup.object().shape({
//             standard: Yup.string().required().label('Standard'),
//             board: Yup.string().email().required().label('Board'),
//             university_name: Yup.string().email().required().label('University name'),
//             percentage: Yup.string().email().required().label('Percentage'),
//             pass_year: Yup.string().email().required().label('Pass year'),
//           })
//         )
//         .strict(),
//     });
//     return {
//       schema,
//       initialData : { 
//         inputs: [
//           {
//             standard: "",
//             board: "",
//             university_name: "",
//             percentage: "",
//             pass_year: "",
//           }
//         ]
//       },
//       values : { },
//     }
//   },
//   methods: {
//     submitEducationForm(values) {
//       console.log('Final Education submission');
//       // console.log(JSON.parse(JSON.stringify(this.inputs)))
//       console.log(JSON.stringify(values, null, 2));

//       // console.log(submitEvent.target.elements[0].value);
//     },
//     add(inputs) {

//       this.inputs.push({
//         standard: "",
//         board: "",
//         university_name: "",
//         percentage: "",
//         pass_year: "",
//       });
//       console.log(this.inputs);
//       // this.$emit("complete education", this.Contactlist)
//     },
//     remove(index) {
//       this.inputs.splice(index, 1);
//     },
//   }
// }
</script>