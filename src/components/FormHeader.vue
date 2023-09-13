<template>
    <header>
        <Transition name="slide-up">
            <h2 key="title" v-if="props.currentStepTitle ? true : false" v-text="props.currentStepTitle" />
        </Transition>
        <Transition name="slide-up">
            <p class="subtitle" key="subtitle" v-if="props.currentStepSubTitle ? true : false" v-text="props.currentStepSubTitle" />
        </Transition>
    </header>
</template>

<script setup>
const props = defineProps({
    currentStepTitle: {
        type: String,
        required: true,
    },
    currentStepSubTitle: {
        type: String,
        required: true,
    },
});
</script>
