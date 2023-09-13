<template>
    <FormHeader :currentStepTitle="stepTitle" :currentStepSubTitle="stepSubtitle" />
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
                <div class="form__group">
                    <label for="name" class="error">Name</label>
                    <input type="text" id="name" class="error" :placeholder="namePlaceholder" v-model="name" />
                </div>
                <div class="form__group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" :placeholder="emailPlaceholder" v-model="email" />
                </div>
                <div class="form__group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" :placeholder="phonePlaceholder" v-model="phone" />
                </div>
            </section>
        </swiper-slide>
        <!-- Page 2 -->
        <swiper-slide>
            <section class="form-page" key="2">
                <div class="form__group">
                    <label for="plan">Select Plan</label>
                    <div class="plans" v-for="plan in plans" :key="plan.id">
                        <div class="plans__plan">
                            <div class="icon"></div>
                            <div class="plan-name">
                                <h2>Arcade</h2>
                                <p class="price-per-month">$9/mo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </swiper-slide>
        <!-- Page 3 -->
        <swiper-slide>
            <section class="form-page" key="3"></section>
        </swiper-slide>
        <!-- Page 4 -->
        <swiper-slide>
            <section class="form-page" key="4">
                <h3>Step 4</h3>
            </section>
        </swiper-slide>
    </swiper-container>
    <FormAction @next-step="formStepHandler" @go-to-prev-step="formStepHandler" @go-to-next-step="formStepHandler" :currentStepActive="currentStep" />
</template>

<script setup>
import {ref, onMounted, watch} from "vue";
import FormHeader from "@/components/FormHeader.vue";
import FormAction from "@/components/FormAction.vue";

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

const currentStep = ref(1);

const stepTitle = ref("");
const stepSubtitle = ref("");

// Step 1
const name = ref(null);
const namePlaceholder = ref("e.g. Stephen King");

const email = ref(null);
const emailPlaceholder = ref("e.g. stephenking@lorem.com");

const phone = ref(null);
const phonePlaceholder = ref("e.g. +1 234 567 890");

// Step 2
const plans = ref([
    {
        id: 0,
        planName: "Arcade",
        price: 9,
        frequency: "mo",
    },
]);

// Step 3

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
    swiper.swiper.slideTo(gotoStep);
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
                stepSubtitle.value = "You have the option of monthly or yearly billing";
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

onMounted(() => {
    stepTitle.value = "Personal Info";
    stepSubtitle.value = "Please provide your name, email address, and phone number";
});

defineExpose({
    currentStep,
});
</script>
