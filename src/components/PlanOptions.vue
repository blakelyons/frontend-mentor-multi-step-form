<template>
    <div class="plans">
        <button
            v-for="plan in plans"
            :key="plan.id"
            @click="planHandler(plan.name)"
            :class="`plans__plan-box ${activePlanName === plan.name && store.planSelected ? 'active' : ''}`"
        >
            <div class="icon">
                <IconArcade v-if="plan.icon === 'arcade'" />
                <IconAdvanced v-if="plan.icon === 'advanced'" />
                <IconPro v-if="plan.icon === 'pro'" />
            </div>
            <div :class="`plan-name ${props.frequency === `Yearly` ? `plan-name--move-up` : ``}`">
                <h2>{{ plan.name }}</h2>
                <p class="plan-price" :data-plan="plan.name">
                    $<span class="plan-price__data">{{ plan.price[0].Monthly }}</span
                    >{{ props.frequency === "Monthly" ? " /mo" : " /yr" }}
                </p>
            </div>
            <Transition name="slide-up">
                <p class="plan-promotion" v-if="props.frequency === `Yearly`">{{ plan.promotion }}</p>
            </Transition>
        </button>
    </div>
</template>

<script setup>
import {ref, watch} from "vue";
import IconArcade from "@/components/icons/icon-arcade.vue";
import IconAdvanced from "@/components/icons/icon-advanced.vue";
import IconPro from "@/components/icons/icon-pro.vue";
import {useFormValuesStore} from "@/stores/FormStoreData";

const store = useFormValuesStore();

const props = defineProps({
    frequency: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["validateStatus"]);

const plans = ref(store.getPlans());

const activePlanName = ref(null);
const planSelected = ref(false);

const planHandler = (planName) => {
    // Toggle the activePlanName based on the clicked plan's ID
    activePlanName.value = activePlanName.value === planName ? null : planName;
    planSelected.value = activePlanName.value !== null;
    store.setSelectedPlan(planSelected.value ? activePlanName.value : null, props.frequency, planSelected.value);
    planSelected.value ? (store.valid = true) : (store.valid = false);
};

// Count up to Yearly from Monthly or Count down to Monthly from Yearly
const priceCounter = (frequency, monthlyPrice, yearlyPrice, planName) => {
    const planPriceDataArray = Array.from(document.querySelectorAll(".plan-price__data"));

    for (const plan of plans.value) {
        if (plan.name === planName) {
            // Set the target price based on the frequency default = Monthly
            const targetPrice = frequency === "Monthly" ? monthlyPrice : yearlyPrice;
            const dataElement = planPriceDataArray.find((data) => data.parentElement.dataset.plan === planName);

            if (!dataElement) {
                console.error(`Data element for plan '${planName}' not found.`);
                return;
            }

            const currentPrice = parseFloat(dataElement.textContent);

            console.log(`Current Price: ${currentPrice} Target Price: ${targetPrice}`);

            if (currentPrice !== targetPrice) {
                const step = targetPrice > currentPrice ? 1 : -1;

                const updatePrice = () => {
                    const current = parseFloat(dataElement.textContent);
                    if ((step === 1 && current >= targetPrice) || (step === -1 && current <= targetPrice)) {
                        return;
                    }
                    const updatedPrice = current + step;
                    dataElement.textContent = updatedPrice;

                    // Increase the speed by reducing the delay between frames
                    setTimeout(updatePrice, 3); // Adjust the delay as needed for your desired speed
                };

                updatePrice(); // Start the animation loop
            }
        }
    }
};

// Watch for changes in store's billing frequency
watch(
    store.getBillingFrequency,
    (frequency) => {
        console.log("Frequency Changed");
        if (frequency === "Monthly" || frequency === "Yearly") {
            console.log("Do Price Counter");
            // Loop through the plans and update the price
            plans.value.forEach((plan) => {
                console.log(plan.price[0]["Monthly"], plan.price[0]["Yearly"], plan.name);
                priceCounter(frequency, plan.price[0]["Monthly"], plan.price[0]["Yearly"], plan.name);
            });
        }
    },
    {deep: true}
);
</script>
