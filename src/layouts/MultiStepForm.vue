<template>
    <div class="multi-step-form">
        <section class="multi-step-form__steps">
            <header class="hidden">
                <h2 aria-heading="Form Navigation" aria-level="2">Form Navigation</h2>
            </header>
            <FormNavigation @goto-step="formStepHandler" :currentStepActive="parseInt(currentStep)" />
        </section>
        <section class="multi-step-form-body">
            <FormSteps @goto-step="formStepHandler" :currentStepActive="parseInt(currentStep)" />
        </section>
    </div>
</template>

<script setup>
import {ref} from "vue";
import FormNavigation from "@/components/FormNavigation.vue";
import FormSteps from "@/components/FormSteps.vue";

const currentStep = ref(1);

const formStepHandler = (step) => {
    console.log(`Go To Step: ${parseInt(step)}`);
    currentStep.value = step;
};
</script>
