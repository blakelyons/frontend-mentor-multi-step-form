<template>
    <section class="form-action">
        <button
            type="button"
            :disabled="disablePrevButton"
            :class="`button button--clear has-icon prev ${hidePrevButton ? `not-visible` : ``}`"
            @click="goBackStep"
        >
            <IconArrow pointing="left" /> <span class="button__text">Go Back</span>
        </button>
        <button
            type="button"
            :disabled="disableNextButton"
            :class="`button next ${currentStep !== 4 ? `has-icon` : ``} button--primary`"
            @click="goToNextStep"
        >
            <span class="button__text" v-text="currentStep !== 4 ? `Next Step` : `Confirm`"></span>
            <IconArrow pointing="right" v-if="currentStep !== 4" />
        </button>
    </section>
</template>

<script setup>
import {ref, watch} from "vue";
import IconArrow from "./icons/icon-arrow.vue";

const currentStep = ref(1);
const stepIncrement = ref(1);

const disableNextButton = ref(false);
const disablePrevButton = ref(false);
const hidePrevButton = ref(true);

const emit = defineEmits(["goToNextStep", "goToPrevStep"]);

const props = defineProps({
    currentStepActive: {
        type: Number,
        required: true,
    },
});

const prevNextButtonHandler = () => {
    if (currentStep.value == 1) {
        disablePrevButton.value = true;
        hidePrevButton.value = true;
    } else {
        disablePrevButton.value = false;
        hidePrevButton.value = false;
    }

    if (currentStep.value === 4) {
        disableNextButton.value = true;
    } else {
        disableNextButton.value = false;
    }
};

const goToNextStep = () => {
    // Increment Step by 1
    currentStep.value = currentStep.value + stepIncrement.value;
    prevNextButtonHandler();
    emit("goToNextStep", currentStep.value);
};

const goBackStep = () => {
    // Go Back Step by 1
    currentStep.value = currentStep.value - stepIncrement.value;
    prevNextButtonHandler();
    emit("goToPrevStep", currentStep.value);
};

watch(
    () => {
        return props.currentStepActive;
    },
    (val) => {
        currentStep.value = val;
        prevNextButtonHandler();
    }
);

defineExpose({
    currentStep,
});
</script>
