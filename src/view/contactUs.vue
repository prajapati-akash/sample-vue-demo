<template>
  <div class="grid w-full pt-8 justify-center">
    <form @submit.prevent="sendEmail">
      <label>Name</label>
      <input type="text" id="name" v-model="form.name" name="name" placeholder="Your Name">
      <p class="text-red-700" v-if="!!errors.name">
        {{ errors.name }}
      </p>
      <label>Email</label>
      <input type="email" id="email" v-model="form.email" name="email" placeholder="Your Email">
      <p class="text-red-700" v-if="!!errors.email">
        {{ errors.email }}
      </p>
      <label>Message</label>
      <textarea name="message" id="message" v-model="form.message" cols="30" rows="5" placeholder="Message"></textarea>
      <p class="text-red-700" v-if="!!errors.message">
        {{ errors.message }}
      </p>
      <input type="text" id="search" placeholder="Type here..." v-model="searchTerm" class="p-3 mb-0.5 w-full border border-gray-300 rounded">

      <div class="flex">
      <ul v-if="searchCountries.length" class="w-auto rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10">
        <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
          Showing {{ searchCountries.length }} of {{ countries.countries.length }} results
        </li>
        <li v-for="country in searchCountries" :key="country.name" @click="selectCountry(country.name)" class="cursor-pointer hover:bg-gray-100 p-1">
          {{ country.name }}
        </li>
      </ul>
      </div>

      <button type="submit" class="bg-blue-600 text-white hover:bg-blue-700  px-5 py-2 rounded-md "
        :disabled="is_disabled" :class="{ 'bg-gray-400': is_disabled, 'cursor-not-allowed': is_disabled }">
        Send
      </button>
    </form>
  </div>
  <p v-if="selectedCountry" class="text-lg pt-2 absolute">
    You have selected: {{ selectedCountry }}
  </p>
</template>

<script>
import useToasterNotify from '@/js/comman-function.js'
import * as Yup from "yup";
import countries from '../data/country.json'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  message: Yup.string().required(),
});

export default {
  name: 'contactUs',
  data() {
    return {
      countries,
      selectedCountry : '',
      searchTerm : '',
      schema,
      form: {
        name: '',
        email: '',
        message: '',
      },
      is_disabled: false,
      errors: {
        email: "",
        name: "",
        message: "",
      },
    }
  },
  methods: {
    sendEmail(e) {
      // this.is_disabled = true
      schema.validate(this.article, { abortEarly: false })
        .then(() => {
          const submittedData = `${this.article.title} ${this.article.description}`;
          alert(submittedData);
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors = { ...this.errors, [error.path]: error.message };
          });
        });

      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
    },
    validate(field) {
      schema.validateAt(field, this.article)
        .then(() => (this.errors[field] = ""))
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
    selectCountry(country){
      this.selectedCountry = country
      this.searchTerm = ''
    }
  },
  computed: {
    searchCountries() {
      if (this.searchTerm === '') {
        return []
      }
      let matches = 0
      return this.countries.countries.filter(country => {
        if (
          country.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          && matches < 10
        ) {
          matches++
          return country
        }
      })
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type=text],
[type=email],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
/*
43:06 6:10
44:06 7:10
45:00 8:04
 */
</style>