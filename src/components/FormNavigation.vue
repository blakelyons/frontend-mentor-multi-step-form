<template>
    <nav class="form-navigation">
        <ul>
            <li data-step="1" :data-active-status="currentStep == 1 ? `active` : ``">
                <button @click="gotoStep(1)" :class="`step-button ${currentStep == 1 ? `active` : ``}`">
                    <div class="step-number"><span>1</span></div>
                    <div class="step-label">
                        <div class="eyebrow">
                            Step 1
                            <Transition name="slide-up">
                                <span class="active-identifier" v-if="(storeCurrentStep === 1 || currentStep === 1) && showCurrentStepLabel"
                                    >(current step)</span
                                >
                            </Transition>
                        </div>
                        <div class="title">Your Info</div>
                    </div>
                </button>
            </li>
            <li data-step="2" :data-active-status="currentStep == 2 ? `active` : ``">
                <button @click="gotoStep(2)" :class="`step-button ${currentStep == 2 ? `active` : ``}`">
                    <div class="step-number"><span>2</span></div>
                    <div class="step-label">
                        <div class="eyebrow">
                            Step 2
                            <Transition name="slide-up">
                                <span class="active-identifier" v-if="(storeCurrentStep === 2 || currentStep === 2) && showCurrentStepLabel"
                                    >(current step)</span
                                >
                            </Transition>
                        </div>
                        <div class="title">Select Plan</div>
                    </div>
                </button>
            </li>
            <li data-step="3" :data-active-status="currentStep == 3 ? `active` : ``">
                <button @click="gotoStep(3)" :class="`step-button ${currentStep == 3 ? `active` : ``}`">
                    <div class="step-number"><span>3</span></div>
                    <div class="step-label">
                        <div class="eyebrow">
                            Step 3
                            <Transition name="slide-up">
                                <span class="active-identifier" v-if="(storeCurrentStep === 3 || currentStep === 3) && showCurrentStepLabel"
                                    >(current step)</span
                                >
                            </Transition>
                        </div>
                        <div class="title">Add-Ons</div>
                    </div>
                </button>
            </li>
            <li data-step="4" :data-active-status="currentStep == 4 ? `active` : ``">
                <button @click="gotoStep(4)" :class="`step-button ${currentStep == 4 ? `active` : ``}`">
                    <div class="step-number"><span>4</span></div>
                    <div class="step-label">
                        <div class="eyebrow">
                            Step 4
                            <Transition name="slide-up">
                                <span class="active-identifier" v-if="(storeCurrentStep === 4 || currentStep === 4) && showCurrentStepLabel"
                                    >(current step)</span
                                >
                            </Transition>
                        </div>
                        <div class="title">Summary</div>
                    </div>
                </button>
            </li>
        </ul>
        <div class="form-navigation__bg"></div>
    </nav>
</template>

<script setup>
import {ref, onMounted, watch} from "vue";

const emit = defineEmits(["gotoStep"]);

const currentStep = ref(1);
const storeCurrentStep = ref(1);
const showCurrentStepLabel = ref(false);

const props = defineProps({
    currentStepActive: {
        type: Number,
        required: true,
    },
});

const gotoStep = (step) => {
    currentStep.value = storeCurrentStep.value = step;
    emit("gotoStep", currentStep.value); // Emit event to MutliStepFormView
};

watch(
    () => props.currentStepActive,
    (currentStepActive) => {
        storeCurrentStep.value = currentStepActive;
        currentStep.value = currentStepActive;
    }
);

onMounted(() => {
    let stepButton = document.querySelectorAll(`.step-button`);
    let formNavigation = document.querySelector(`.form-navigation`);

    formNavigation.addEventListener("mouseenter", function () {
        // Remove active class from all buttons
        stepButton.forEach((button) => {
            button.classList.remove("active");
        });
        // Show current step label
        currentStep.value = null;
        showCurrentStepLabel.value = true;
    });

    formNavigation.addEventListener("mouseleave", function () {
        // Add active class to current step button
        currentStep.value = storeCurrentStep.value;
        // Hide current step label
        showCurrentStepLabel.value = false;
    });
});
</script>
