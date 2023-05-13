<template>
 <div class="sm:col-span-2">
    <label for="currency" class="text-left text-lg block font-medium leading-6 text-gray-900">
        {{ labelName }} <template v-if="isRequired"> <RequiredAstrik/>  </template> :
    </label>

    <div class="mt-2">
        <Field as="select"
            @input="updateInput"
            :id="fildName"
            :name="fildName"
            autocomplete="false"
            :value="modelValue"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            :rules="validateSelectRequiredField"
        >
            <option value="">Select a currency</option>
            <template v-if="optionData">
                <option
                    v-for="currency in optionData" :value="currency.sc_isocode+ ' (' + currency.sc_symbol + ')'"
                    :key="currency.sc_sys_currency_id">
                    {{currency.sc_isocode }} {{ "( " + currency.sc_symbol + " )" }}
                </option>
            </template>
        </Field>
    </div>
    <p class="text-left text-red-500">
    <ErrorMessage name="currency" />
    </p>
</div>
</template>

<script>
import RequiredAstrik from './RequiredAstrik.vue';
import { Field, ErrorMessage } from 'vee-validate';
export default {
    props: ['isRequired', 'labelName', 'optionData', 'fildName'],
    emits: ['update:modelValue'],
    components :{
        RequiredAstrik,
        Field,
        ErrorMessage
    },
    data() {
        return {

        }
    },
    methods : {
        validateSelectRequiredField(value) {
        if (!value) {
            return 'This field is required';
        }
        return true;
        },
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>