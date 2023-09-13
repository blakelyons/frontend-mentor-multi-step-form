import {createRouter, createWebHistory} from "vue-router";
import MultiStepFormView from "../views/MultiStepFormView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: MultiStepFormView,
        },
    ],
});

export default router;
