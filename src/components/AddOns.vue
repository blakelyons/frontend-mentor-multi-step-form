<template>
    <div class="add-ons">
        <div class="checkbox-container" v-for="addOn in addOns" :key="addOn.id" @click="checkboxHandler">
            <div>
                <input type="checkbox" :id="addOn.id" v-model="selectedAddOns[addOn.id]" @change="getSelectedAddOns" class="add-ons__checkbox" />
            </div>
            <div class="add-ons__checkbox-label">
                <label :for="addOn.id">
                    <h4 class="add-ons__checkbox-title">{{ addOn.addon.name }}</h4>
                    <p class="add-ons__checkbox-description">{{ addOn.addon.description }}</p>
                </label>
            </div>
            <div class="add-ons__price" v-text="`+${getAddOnPrice}/${props.frequency === `Monthly` ? `mo` : `yr`}`"></div>
        </div>
    </div>
</template>

<script setup>
import {ref, defineEmits} from "vue";

const emit = defineEmits(["selectedAddOns"]);

const props = defineProps({
    frequency: {
        type: String,
        required: true,
    },
});

const checkboxHandler = (e) => {
    // Get the checkbox element
    const checkbox = e.target;

    // Get the parent element of the checkbox
    const checkboxContainer = checkbox.closest(".checkbox-container");

    // Toggle the class 'active' on the parent element
    checkboxContainer.classList.toggle("active");
};

const getAddOnPrice = ref(0);

const addOns = ref([
    {
        id: "online-service",
        addon: {
            name: "Online service",
            description: "Access to multiple games",
            price: [
                {
                    frequency: "Monthly",
                    amount: 1,
                },
                {
                    frequency: "Yearly",
                    amount: 10,
                },
            ],
        },
    },
    {
        id: "larger-storage",
        addon: {
            name: "Larger storage",
            description: "Extra 1TB of cloud save",
            price: [
                {
                    frequency: "Monthly",
                    amount: 2,
                },
                {
                    frequency: "Yearly",
                    amount: 20,
                },
            ],
        },
    },
    {
        id: "customizable-profile",
        addon: {
            name: "Customizable profile",
            description: "Change theme on your profile",
            price: [
                {
                    frequency: "Monthly",
                    amount: 2,
                },
                {
                    frequency: "Yearly",
                    amount: 20,
                },
            ],
        },
    },
]);

const selectedAddOns = ref({
    "online-service": false,
    "larger-storage": false,
    "customizable-profile": false,
});

const getSelectedAddOns = () => {
    // Filter the selected items based on the checked checkboxes
    const selected = Object.keys(selectedAddOns.value).filter((key) => selectedAddOns.value[key]);

    // Now, the 'selected' array contains the IDs of the selected items
    console.log(`Selected Add-Ons: ${selected}`);

    emit("selectedAddOns", selected);
};
</script>
