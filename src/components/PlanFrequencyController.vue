<template>
    <div class="billing-frequency-controller">
        <button
            :class="`button button--clear button--simple button--large ${billingFrequency === `Monthly` ? `active` : ``}`"
            @click="billingFrequency = `Monthly`"
        >
            Monthly
        </button>
        <button class="frequency-switch" @click="toggleFrequency">
            <div :class="`frequency-switch__toggle frequency-switch__toggle--${billingFrequency.toLowerCase()}`"></div>
        </button>
        <button
            :class="`button button--clear button--simple button--large ${billingFrequency === `Yearly` ? `active` : ``}`"
            @click="billingFrequency = `Yearly`"
        >
            Yearly
        </button>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {useFormValuesStore} from "@/stores/FormStoreData";

const store = useFormValuesStore();

const billingFrequency = ref("Monthly");

const emit = defineEmits(["toggleFrequency"]);

const toggleFrequency = () => {
    if (billingFrequency.value === "Monthly") {
        billingFrequency.value = "Yearly";
        store.setBillingFrequency("Yearly");
        emit("toggleFrequency", billingFrequency.value);
    } else {
        billingFrequency.value = "Monthly";
        store.setBillingFrequency("Monthly");
        emit("toggleFrequency", billingFrequency.value);
    }
};
</script>
