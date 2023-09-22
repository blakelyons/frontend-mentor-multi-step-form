<template>
    <FormHeader :currentStepTitle="stepTitle" :currentStepSubTitle="stepSubtitle" required="required" />
    <swiper-container
        :allowTouchMove="false"
        @swiper="onSwiper"
        @progress="onProgress"
        @slidechange="onSlideChange"
        :space-between="spaceBetween"
        :centered-slides="true"
    >
        <!-- Page 1 -->
        <swiper-slide>
            <section class="form-page" data-step="1" key="1">
                <FormFields @validation-status="nextButtonHandler" />
            </section>
        </swiper-slide>

        <!-- Page 2 -->
        <swiper-slide>
            <section class="form-page" key="2">
                <PlanOptions :frequency="billingFrequency" @plan-selected="nextButtonHandler" />
                <PlanFrequency @toggle-frequency="updateBillingFrequency" />
            </section>
        </swiper-slide>

        <!-- Page 3 -->
        <swiper-slide>
            <section class="form-page" key="3">
                <AddOns @selected-add-on="addOnHandler" :frequency="billingFrequency" />
            </section>
        </swiper-slide>

        <!-- Page 4 -->
        <swiper-slide>
            <section class="form-page" key="4">
                <FormSummary />
            </section>
        </swiper-slide>
    </swiper-container>
    <FormAction
        @next-step="formStepHandler"
        :disableNextButton="disableNextButton"
        :hidePrevButton="hidePrevButton"
        @go-to-prev-step="formStepHandler"
        @go-to-next-step="formStepHandler"
        :currentStepActive="currentStep"
    />
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import {useFormValuesStore} from "@/stores/FormStoreData";
import FormHeader from "@/components/FormHeader.vue";
import FormFields from "./FormFields.vue";
import PlanFrequency from "./PlanFrequencyController.vue";
import PlanOptions from "@/components/PlanOptions.vue";
import AddOns from "@/components/AddOns.vue";
import FormSummary from "@/components/FormSummary.vue";
import FormAction from "@/components/FormAction.vue";

const store = useFormValuesStore();

// core version + navigation, pagination modules:
import {register} from "swiper/element/bundle";

// register Swiper custom elements
register();

const emit = defineEmits(["gotoStep"]);

const props = defineProps({
    currentStepActive: {
        type: Number,
        required: true,
    },
});

const currentStep = ref(2);

const stepTitle = ref("");
const stepSubtitle = ref("");

const disableNextButton = ref(store.getDisableNextButton());
const hidePrevButton = ref(true);

// Step 2
const billingFrequency = ref("Monthly");

const updateBillingFrequency = () => {
    billingFrequency.value = store.getBillingFrequency();
};

// Step 3
const addOnHandler = (selectedAddOns) => {
    console.log(`Selected Add-Ons: ${selectedAddOns}`);
};

// Step 4

const spaceBetween = 500;
const onProgress = (e) => {
    const [swiper, progress] = e.detail;
    console.log(progress);
};

const formStepHandler = (step) => {
    const swiper = document.querySelector("swiper-container");
    currentStep.value = step;
    let gotoStep = step - 1;
    emit("gotoStep", currentStep.value);

    if (step > 1) {
        hidePrevButton.value = false;
    }

    swiper.swiper.slideTo(gotoStep);
    swiper.swiper.on("slideNextTransitionEnd", () => {
        store.valid = false;
        nextButtonHandler(store.valid);
    });
};

const nextButtonHandler = () => {
    console.log(`nextButtonHandler ${store.valid}`);
    store.setDisableNextButton(store.valid);
    disableNextButton.value = store.getDisableNextButton();
};

watch(
    () => props.currentStepActive,
    (currentStepActive) => {
        currentStep.value = currentStepActive;
        formStepHandler(currentStepActive);

        switch (currentStepActive) {
            case 1:
                stepTitle.value = "Personal Info";
                stepSubtitle.value = "Please provide your name, email address, and phone number";
                break;
            case 2:
                stepTitle.value = "Select your plan";
                stepSubtitle.value = "You have the option of Monthly or Yearly billing";
                break;
            case 3:
                stepTitle.value = "Pick add-ons";
                stepSubtitle.value = "Add-ons help enhance your gaming experience";
                break;
            case 4:
                stepTitle.value = "Finishing up";
                stepSubtitle.value = "Double-check everything looks OK before confirming.";
                break;
            default:
                break;
        }
    }
);

// Watch store.disableNextButton for changes and update the local value

onMounted(() => {
    stepTitle.value = "Personal Info";
    formStepHandler(currentStep.value);
    stepSubtitle.value = "Please provide your name, email address, and phone number";
});
</script>
