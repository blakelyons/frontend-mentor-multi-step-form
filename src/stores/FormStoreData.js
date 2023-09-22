import {ref} from "vue";
import {defineStore} from "pinia";

export const useFormValuesStore = defineStore("FormValues", () => {
    // Plan Options
    const plans = ref([
        {
            id: 0,
            name: "Arcade",
            price: [
                {
                    Monthly: 9,
                    Yearly: 90,
                },
            ],
            promotion: "2 months free",
            icon: "arcade",
        },
        {
            id: 1,
            name: "Advanced",
            price: [
                {
                    Monthly: 12,
                    Yearly: 120,
                },
            ],
            promotion: "2 months free",
            icon: "advanced",
        },
        {
            id: 2,
            name: "Pro",
            price: [
                {
                    Monthly: 15,
                    Yearly: 150,
                },
            ],
            promotion: "2 months free",
            icon: "pro",
        },
    ]);

    const getPlans = () => {
        return plans.value;
    };

    // Setup Stores for Form Values
    const input = ref({
        name: {
            value: null,
        },
        email: {
            value: null,
        },
        phone: {
            value: null,
        },
    });

    const valid = ref(false);

    const disableNextButton = ref(true);

    // Set Disable Next Button
    const setDisableNextButton = (value) => {
        disableNextButton.value = value;
    };

    // Get Disable Next Button
    const getDisableNextButton = () => {
        return disableNextButton.value;
    };

    // Set Name
    const setName = (newName) => {
        //input.value.name.valid = true;
        input.value.name.value = newName;
    };

    // Set Email
    const setEmail = (newEmail) => {
        input.value.email.value = newEmail;
    };

    // Set Phone
    const setPhone = (newPhone) => {
        input.value.phone.value = newPhone;
    };

    // Set Valid
    const setValid = (value) => {
        valid.value = value;
    };

    // Get Valid
    const getValid = () => {
        return valid.value;
    };

    // Get Name
    const getName = () => {
        return input.value.name.value;
    };

    // Get Email
    const getEmail = () => {
        return input.value.email.value;
    };

    // Get Phone
    const getPhone = () => {
        return input.value.phone.value;
    };

    // Plan Options
    const selectedPlan = ref(null);
    const planSelected = ref(false);
    const planPrice = ref(0);

    // Set Selected Plan Option
    const setSelectedPlan = (plan, frequency, planeIsSelected) => {
        selectedPlan.value = plan;
        planSelected.value = planeIsSelected;
        switch (selectedPlan.value) {
            case "Arcade":
                planPrice.value = frequency === "Monthly" ? plans.value[0].price[0].Monthly : plans.value[0].price[0].Yearly;
                break;

            default:
                break;
        }

        console.log(`Plan Price: ${planPrice.value}`);
    };

    // Get Selected Plan Option
    const getSelectedPlan = () => {
        return selectedPlan.value, planPrice.value;
    };

    const billingFrequency = ref(null);

    // Set Plan Billing Frequency
    const setBillingFrequency = (frequency) => {
        billingFrequency.value = frequency;
    };

    // Get Plan Billing Frequency
    const getBillingFrequency = () => {
        return billingFrequency.value;
    };

    return {
        plans,
        getPlans,
        input,
        valid,
        selectedPlan,
        planSelected,
        billingFrequency,
        planPrice,
        disableNextButton,
        setDisableNextButton,
        getDisableNextButton,
        setName,
        setEmail,
        setPhone,
        setValid,
        getName,
        getEmail,
        getPhone,
        getValid,
        setSelectedPlan,
        getSelectedPlan,
        setBillingFrequency,
        getBillingFrequency,
    };
});
