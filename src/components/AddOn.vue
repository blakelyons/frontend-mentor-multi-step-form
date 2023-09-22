<template></template>
<script setup>
import {ref} from "vue";

const props = defineProps({
    addOnName: {
        type: String,
        required: true,
    },
    addOnDescription: {
        type: String,
        required: true,
    },
    addOnPrice: [
        {
            monthly: {
                type: Number,
                required: true,
            },
            yearly: {
                type: Number,
                required: true,
            },
        },
    ],
});
</script>
