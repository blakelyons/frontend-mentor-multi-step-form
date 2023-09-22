<template>
    <div class="form-summary">
        <div class="form-summary__container">
            <div class="form-summary__plan-option">
                <div class="form-summary__plan-option__title">
                    <h2 v-text="`${store.selectedPlan} (${store.billingFrequency})`" />
                    <a href="#" class="change-plan">Change</a>
                </div>
                <div class="form-summary__plan-option__value">${{ store.planPrice }}</div>
            </div>
            <div class="form-summary__plan-addons"></div>
        </div>
        <div class="form-total"></div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useFormValuesStore} from "@/stores/FormStoreData";

const store = useFormValuesStore();

const autoFillData = ref(true);

// Compute the total cost of the plan and add-ons

onMounted(() => {
    if (autoFillData.value) {
        store.input.name.value = "Blake Lyons";
        store.input.email.value = "blake@blakelyons.com";
        store.input.phone.value = "555-555-5555";
        store.selectedPlan = "Basic";
        store.billingFrequency = "Monthly";
        store.addOns = ["Basic"];
    }
});
</script>
