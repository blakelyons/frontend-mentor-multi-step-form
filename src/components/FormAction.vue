<template>
    <section class="form-action">
        <button type="button" :class="`button button--clear has-icon prev ${props.hidePrevButton ? `not-visible` : ``}`" @click="goBackStep">
            <IconArrow pointing="left" /> <span class="button__text">Go Back</span>
        </button>
        <button
            type="button"
            :class="`button next ${currentStep !== 4 ? `has-icon` : ``} button--primary ${
                (store.valid && !bypassValidation) || planSelected ? `` : `button--disabled`
            }`"
            @click="goToNextStep"
        >
            <span class="button__text" v-text="currentStep !== 4 ? `Next Step` : `Confirm`"></span>
            <IconArrow pointing="right" v-if="currentStep !== 4" />
        </button>
    </section>
</template>

<script setup>
import {ref, watch} from "vue";
import {useFormValuesStore} from "@/stores/FormStoreData";
import IconArrow from "./icons/icon-arrow.vue";

const store = useFormValuesStore();

// Bypass Validation
const bypassValidation = false;

const currentStep = ref(1);
const stepIncrement = ref(1);

const emit = defineEmits(["goToNextStep", "goToPrevStep", "validateFormFields"]);

const props = defineProps({
    currentStepActive: {
        type: Number,
        required: true,
    },
    disableNextButton: {
        type: Boolean,
        required: false,
        default: true,
    },
    hidePrevButton: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const goToNextStep = () => {
    // Increment Step by 1
    console.log("Go to next step");
    currentStep.value = currentStep.value + stepIncrement.value;
    emit("goToNextStep", currentStep.value);
};

const goBackStep = () => {
    // Go Back Step by 1
    currentStep.value = currentStep.value - stepIncrement.value;
    emit("goToPrevStep", currentStep.value);
};

watch(
    () => {
        return props.currentStepActive;
    },
    (val) => {
        currentStep.value = val;
    }
);

// Watch if the store.planSelected value changes and update the disableNextButton value
watch(
    () => {
        return store.planSelected;
    },
    (val) => {
        
        console.log(`Plan Selected: ${val}`);
        emit("validateFormFields", val);
    }
);
</script>
