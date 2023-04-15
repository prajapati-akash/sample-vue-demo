<template>
    <div class="bg-white">
      <div class="mx-auto max-w-12xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8 bg-gray-100">
        <div class="mx-auto max-w-6xl bg-gray-200 p-14">
          <Form @submit="submitForm" :validation-schema="schema">
  
            <div class="space-y-12">
                <div class="border-b border-gray-900/100 pb-2">
                    <h1 class="text-4xl font-semibold leading-7 text-gray-900">Student</h1>
                </div>
  
                <div class="border-b border-gray-900/10 pb-12">
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- full name -->
                        <div class="sm:col-span-3">
                            <label for="name" class="text-left block text-lg font-medium leading-6 text-gray-900">Name <sup><span class="text-red-700">*</span> </sup> : </label>
                            <div class="mt-2">
                                <Field 
                                    v-model="data.name"
                                    type="text"
                                    name="name"
                                    id="name"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <!-- rules="required|min:0,100" -->
                                <p class="text-left text-red-500"><ErrorMessage name="name" /></p>
                            </div>
                        </div>
  
                        <!-- Email -->
                        <div class="sm:col-span-3">
                            <label for="email" class="text-left text-lg block font-medium leading-6 text-gray-900">Email address <sup><span class="text-red-700">*</span> </sup> : </label>
                            <div class="mt-2">
                                <Field
                                    v-model="data.email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p class="text-left text-red-500"><ErrorMessage name="email" /></p>
                            </div>
                        </div>
  
                        <!-- college_name -->
                        <div class="sm:col-span-3">
                            <label for="college_name" class="text-left text-lg block font-medium leading-6 text-gray-900">Collage Name <sup><span class="text-red-700">*</span> </sup> : </label>
                            <div class="mt-2">
                                <Field
                                    v-model="data.college_name"
                                    id="college_name"
                                    name="college_name"
                                    type="text"
                                    autocomplete="college_name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                            </div>
                            <p class="text-left text-red-500"><ErrorMessage name="college_name" /></p>
                        </div>
  
                        <!-- Gender -->
                        <div class="sm:col-span-2">
                            <label for="gender" class="text-left block text-lg font-medium leading-6 text-gray-900">Gender <sup><span class="text-red-700">*</span> </sup> : </label>
                            <div class="mt-2 flex items-center gap-x-3">
                              <Field
                                v-model="data.gender"
                                name="gender"
                                type="radio"
                                value="male"
                                class="block border-5 text-lg sm:text-sm sm:leading-6 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label for="push-nothing" class="block text-lg font-medium leading-6 text-gray-900">Male</label>
  
                              <Field
                                v-model="data.gender"
                                name="gender"
                                type="radio"
                                value="female"
                                class="block border-5 text-lg sm:text-sm sm:leading-6 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label for="push-nothing" class="block text-lg font-medium leading-6 text-gray-900">Female</label>
                            </div>
                            <p class="text-left text-red-500"><ErrorMessage name="gender" /></p>
                        </div>
  
                        <!-- Profile Picture -->
                        <div class="sm:col-span-3">
                          <div class="col-span-full text-left">
                            <label for="profile_picture" class="block text-lg font-medium leading-6 text-gray-900">Profile photo <sup><span class="text-red-700">*</span> </sup> :</label>
                            <Field id="password" name="profile_picture" type="file" v-model="data.profile_picture" />
                          </div>
                          <p class="text-left text-red-500"><ErrorMessage name="profile_picture" /></p>
                        </div>
                    </div>
                </div>
  
                <div class="text-left" v-if="error.educationError">
                  <span class="text-left text-red-600" >{{ error.educationError }}</span>
                </div>
                <StudentEducation :field="Field" @complete-education="addStudentEducation"/>
            </div>
  
            <div class="mt-6 flex items-center justify-end gap-x-6 pr-8">
                <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">Reset</button>
                <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
          </Form  >
        </div>
      </div>
    </div>
    </template>
    
  <script>
  import StudentEducation from './StudentEducation.vue';
  import { Field, Form, ErrorMessage} from 'vee-validate';
  import { toast } from 'vue3-toastify';
  import axios from 'axios';
  import 'vue3-toastify/dist/index.css';
  import * as Yup from 'yup';
  
  
  export default {
    name: 'App',
    components: {
      StudentEducation,
      Field,
      Form,
      ErrorMessage,
    },
    data() {
  
      const schema = Yup.object().shape({
        name: Yup.string().required().label('name'),
        email: Yup.string().email().required().label('email'),
        college_name: Yup.string().required((value) => { if(!value.value) { return "Please enter your college details."} }).label('college name').test(
          " ",
          "Please write selected collange name",
          (value) => {
            // console.log(value);
            return true;
          },
          // (value) => {
            // if(value=="test"){  // this is write for test purpose
            //   return true;
            // }
          // }
        ),
        gender: Yup.string().required().label('gender'),
        profile_picture: Yup.mixed()
        .test(
          "fileSize",
          "File size too large, max file size is 1 Mb",
          (file) => file && file.size <= 1100000
        )
        .test(
          "fileType",
          "Please select a file from jpg, png, jpeg",
          (file) =>
            file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
        ),
      });
  
      return {
        schema,
        data : {
          name : "",
          email : "",
          college_name: "",
          gender:"",
          profile_picture : "",
          educationDetail : [],
        },
        error : {
            educationError : "",
        },
      }
    },
    created() {
    },
    methods : {
      submitForm() {
        console.log('Final Submission :');
        console.log(JSON.parse(JSON.stringify(this.data)))
        this.error.educationError = "";
  
        console.log(this.data)
        if(this.data.educationDetail.length == 0) {
          this.error.educationError = "Please enter atlist one education details.";
          // toast.error("please enter contact details", {
          //   // toast options here
          // });
        }
        else {
          alert("Submitted successfully");
        }
      },
      addStudentEducation(educationData){
        console.log('Main Student form')
        console.log(educationData)
  
        // var educationDataInput = educationData.inputs;
        // this.data.educationDetail = [];
  
        // educationDataInput.map( (educationDataInput) => {
        //   this.data.educationDetail.push( {
        //     standard: educationDataInput.standard,
        //     board : educationDataInput.board,
        //     university_name : educationDataInput.university_name,
        //     percentage : educationDataInput.percentage,
        //     pass_year : educationDataInput.pass_year,
        //   })
        // })
      },
    }
  }
  </script>