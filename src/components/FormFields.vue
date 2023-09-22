<template>
    <div class="form__group" v-for="input in inputs" :key="input.id">
        <label :for="input.id">
            <span>{{ input.label }}</span>
            <Transition name="fade">
                <span class="error-message" v-if="input.error">{{ input.errorMessage }}</span>
            </Transition>
        </label>
        <input
            :type="input.type"
            :id="input.id"
            :name="input.name"
            :placeholder="input.placeholder"
            :required="input.required"
            v-model="input.value"
            @change="handleInput"
            @input="handleInput"
            @focusout="handleInput"
            :class="input.error ? `error` : ``"
        />
    </div>
</template>

<script setup>
import {ref} from "vue";
import {useFormValuesStore} from "@/stores/FormStoreData";

const emit = defineEmits(["validationStatus"]);

const inputs = ref([
    {
        type: "text",
        id: "name",
        name: "name",
        placeholder: "e.g. Stephen King",
        required: true,
        label: "Name",
        value: "",
        error: false,
        errorMessage: "Name is required.",
    },
    {
        type: "email",
        id: "email",
        name: "email",
        placeholder: "e.g. stephenking@lorem.com",
        required: true,
        label: "Email Address",
        value: "",
        error: false,
        errorMessage: "Email is required.",
    },
    {
        type: "tel",
        id: "phone",
        name: "phone",
        placeholder: "e.g. +1 123-456-7890",
        required: true,
        label: "Phone Number",
        value: "",
        error: false,
        errorMessage: "Phone is required.",
    },
]);

// Define Store
const store = useFormValuesStore();
const valid = ref(store.valid);

// Format Phone Number
const formatPhoneNumber = async (value) => {
    let x = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    inputs.value[2].value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
};

const nameIsValid = ref(false);
const emailIsValid = ref(false);
const phoneIsValid = ref(false);

// Input Handler
const handleInput = async (event) => {
    // Handle Name Input
    if (event.target.id === "name") {
        // Validate Name if Required and if it's not empty
        if (inputs.value[0].required && event.target.value === "") {
            inputs.value[0].error = true;
            nameIsValid.value = false;
            inputs.value[0].errorMessage = "Name is required.";
        } else {
            inputs.value[0].error = false;
            nameIsValid.value = true;
        }
        store.setName(inputs.value[0].value);
    }

    // Handle Email Input
    if (event.target.id === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Validate Email if Required and if it's not empty
        if (inputs.value[1].required && event.target.value !== "") {
            // Check if it's a valid email address
            if (!emailRegex.test(event.target.value)) {
                inputs.value[1].error = true;
                emailIsValid.value = false;
                inputs.value[1].errorMessage = "Email is invalid.";
            } else {
                inputs.value[1].error = false;
                emailIsValid.value = true;
                inputs.value[1].errorMessage = "";
                store.setEmail(inputs.value[1].value);
            }
        }
    }

    // Handle Phone Input
    if (event.target.id === "phone") {
        // Validate Phone Number if Required and if it's not empty and if it's a valid phone number
        if (inputs.value[2].required && event.target.value === "") {
            inputs.value[2].error = true;
            phoneIsValid.value = false;
            inputs.value[2].errorMessage = "Phone is required.";
        } else {
            inputs.value[2].error = false;
            phoneIsValid.value = true;
            inputs.value[2].errorMessage = "";
        }
        // Format Phone Number
        formatPhoneNumber(event.target.value);
        store.setPhone(inputs.value[2].value);
    }

    if (phoneIsValid.value && emailIsValid.value && nameIsValid.value) {
        store.valid = true;
    } else {
        store.valid = false;
    }

    // Emit Valid Status
    emit("validationStatus", store.valid);
};
</script>
