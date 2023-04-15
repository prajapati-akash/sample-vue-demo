<script setup>
import { ref, toRaw } from 'vue';
import StudentEducation from './StudentEducation.vue';
import { Field, Form, ErrorMessage} from 'vee-validate';
import 'vue3-toastify/dist/index.css';
import * as Yup from 'yup';
import { useStudent } from '@/store/Student'
import router from "@/router";

const sendSpinner = ref(false);
const disableButton = ref(false);
const studentStoreData = useStudent();
const preview = ref(null);

const schema = Yup.object().shape({
  name: Yup.string().required().label("name"),
  email: Yup.string().email().required().label("email"),
  college_name: Yup.string()
      .required((value) => {
          if (!value.value) {
              return "Please enter your college details.";
          }
      })
      .label("college name")
      .test("collegeName", "Please write selected collange name", (value) => {
          return true;
      }),
  gender: Yup.string().required().label("gender"),
  profile_picture: Yup.mixed()
    .test("fileSize",
    "File size too large, max file size is 1 Mb",
    (file) => file && file.size <= 1100000)
    .test(
      "fileType",
      "Please select a file from jpg, png, jpeg",
      (file) => file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type),
    ),
  education_details: Yup.array()
      .of(
          Yup.object().shape({
              standard: Yup.string().required().label("this field is required"),
              board: Yup.string().required().label("Board"),
              university_name: Yup.string().required().label("University name"),
              percentage: Yup.string()
                  .required()
                  .label("Percentage")
                  .test("percentage", "Please enter a valid Percentage", (value) => {
                      if (value < 0 || value > 100) {
                          return false;
                      }
                      else if (isNaN(value)) {
                        return false;
                      }
                      else{
                        return true;
                      }
                  })
                  .test("percentage", "Please enter only number", (value) => {
                      if (isNaN(Number)) {
                          return true;
                      }
                  }),
              pass_year: Yup.string()
                  .required()
                  .label("Year")
                  .test("passYear", "Please enter a valid passing year", (value) => {
                      if (value <= new Date().getFullYear()) {
                          return true;
                      }
                      return false;
                  })
                  .test("passYear", "Please enter only number", (value) => {
                      if (isNaN(Number)) {
                          return true;
                      }
                  }),
          })
      )
    .strict(),
});


const initialData = {
  name : "",
  email : "",
  college_name: "",
  gender:"",
  profile_picture : "",
  education_details : [
      {
        standard: "",
        board: "",
        university_name: "",
        percentage: "",
        pass_year: "",
      }
    ]
  ,
}

function submitForm(value) {
  console.log("add student submitted successfully");
  var studentFormData =JSON.parse(JSON.stringify(value));

  var reader = new FileReader();
  reader.onload = (e) => {
    initialData.profile_picture.value = e.target.result;
    studentFormData.profile_picture = { value: e.target.result}
  }
  reader.readAsDataURL(initialData.profile_picture);

  studentStoreData.addStudentData(studentFormData)
  sendSpinner.value = true;
  disableButton.value = true
  router.push({name: "StudentList"});
}

function previewImage(event) {

  console.log('file preview() called')
  console.log()

  if (event.name) {
    var reader = new FileReader();
    reader.onload = (e) => {
      console.log("e");
      initialData.profile_picture = e.target.result;
      preview.value = initialData.profile_picture;
    }
    reader.readAsDataURL(initialData.profile_picture);
  }
}
</script>

<template>
  <div class="mx-auto">
    <div class="sm:py-8 lg:px-8 bg-gray-100">
      <div class="mx-auto max-w-6xl bg-gray-200 p-14">
        <Form @submit="submitForm" :initial-values="initialData" :validation-schema="schema">
          <div class="space-y-12">
            <div class="border-b border-gray-900/100 pb-2">
              <h1 class="text-2xl font-semibold leading-7 text-gray-900">Student</h1>
            </div>
            <div class="border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- full name -->
                <div class="sm:col-span-3">
                  <label for="name" class="text-left block text-lg font-medium leading-6 text-gray-900">Name <sup><span class="text-red-700">*</span> </sup> : </label>
                  <div class="mt-2">
                    <Field 
                      v-model="initialData.name"
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="given-name"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    <!-- rules="required|min:0,100" -->
                    <p class="text-left text-red-500">
                      <ErrorMessage name="name" />
                    </p>
                  </div>
                </div>
                <!-- Email -->
                <div class="sm:col-span-3">
                  <label for="email" class="text-left text-lg block font-medium leading-6 text-gray-900">Email address <sup><span class="text-red-700">*</span> </sup> : </label>
                  <div class="mt-2">
                    <Field
                      v-model="initialData.email"
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    <p class="text-left text-red-500">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                </div>
                <!-- college_name -->
                <div class="sm:col-span-3">
                  <label for="college_name" class="text-left text-lg block font-medium leading-6 text-gray-900">Collage Name <sup><span class="text-red-700">*</span> </sup> : </label>
                  <div class="mt-2">
                    <Field
                      v-model="initialData.college_name"
                      id="college_name"
                      name="college_name"
                      type="text"
                      autocomplete="college_name"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
                  <p class="text-left text-red-500">
                    <ErrorMessage name="college_name" />
                  </p>
                </div>
                <!-- Gender -->
                <div class="sm:col-span-2">
                  <label for="gender" class="text-left block text-lg font-medium leading-6 text-gray-900">Gender <sup><span class="text-red-700">*</span> </sup> : </label>
                  <div class="mt-2 flex items-center gap-x-3">
                    <Field
                      v-model="initialData.gender"
                      name="gender"
                      type="radio"
                      value="male"
                      class="block border-5 text-lg sm:text-sm sm:leading-6 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    <label for="push-nothing" class="block text-lg font-medium leading-6 text-gray-900">Male</label>
                    <Field
                      v-model="initialData.gender"
                      name="gender"
                      type="radio"
                      value="female"
                      class="block border-5 text-lg sm:text-sm sm:leading-6 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    <label for="push-nothing" class="block text-lg font-medium leading-6 text-gray-900">Female</label>
                  </div>
                  <p class="text-left text-red-500">
                    <ErrorMessage name="gender" />
                  </p>
                </div>
                <!-- Profile Picture -->
                <div class="sm:col-span-3">
                  <div class="col-span-full text-left">
                    <label for="profile_picture" class="block text-lg font-medium leading-6 text-gray-900">Profile photo<sup><span class="text-red-700">*</span> </sup> :</label>
                    <Field id="password" name="profile_picture" type="file" v-model="initialData.profile_picture"/>
                  </div>
                  <p class="text-left text-red-500">
                    <ErrorMessage name="profile_picture" />
                  </p>

                  <p>Preview Here:</p>
                  <template v-if="preview">
                    <img :src="preview" class="img-fluid" />
                    <p class="mb-0">file name: {{ initialData.profile_picture.name }}</p>
                    <p class="mb-0">size: {{ initialData.profile_picture.size/1024 }}KB</p>
                  </template>
                </div>
              </div>
            </div>
            <StudentEducation >
            </StudentEducation>
          </div>
          <div class="mt-6 flex items-center justify-end gap-x-6 pr-8">
            <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">Reset</button>
            <button type="submit"
            :disabled="disableButton"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <div role="status" v-if="sendSpinner">
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
            <div v-else>
                Save
            </div>
          </button>
          </div>
        </Form  >
      </div>
    </div>
  </div>
</template>