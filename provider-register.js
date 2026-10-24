"use strict";

const PROVIDER_STORAGE_KEY = "honeyhive_providers";

const providerForm = document.getElementById("providerForm");
const providerSuccess = document.getElementById("providerSuccess");
const providerSuccessMessage = document.getElementById("providerSuccessMessage");
const registerAnotherButton = document.getElementById("registerAnother");
const currentYear = document.getElementById("currentYear");
const honeyYear = document.getElementById("honeyYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
if (honeyYear) {
    honeyYear.textContent = new Date().getFullYear();
}

function getProviders() {
    try {
        const stored = localStorage.getItem(PROVIDER_STORAGE_KEY);
        if (!stored) return [];

        const providers = JSON.parse(stored);
        return Array.isArray(providers) ? providers : [];
    } catch (error) {
        console.error("Could not read professional profiles:", error);
        return [];
    }
}

function saveProviders(providers) {
    try {
        localStorage.setItem(PROVIDER_STORAGE_KEY, JSON.stringify(providers));
        return true;
    } catch (error) {
        console.error("Could not save professional profile:", error);
        alert("Could not save your profile in this browser. Please check browser storage.");
        return false;
    }
}

function createProviderId() {
    return "HH-P-" + Date.now().toString(36).toUpperCase();
}

function validateProviderPhone() {
    const phoneInput = document.getElementById("providerPhone");
    const value = phoneInput.value.trim();
    const digits = value.replace(/\D/g, "");
    const valid = /^[0-9+().\s-]+$/.test(value) &&
        digits.length >= 7 &&
        digits.length <= 15;

    phoneInput.setCustomValidity(
        valid ? "" : "Enter a phone number containing 7–15 digits."
    );

    return valid;
}

const providerPhoneInput = document.getElementById("providerPhone");
if (providerPhoneInput) {
    providerPhoneInput.addEventListener("input", validateProviderPhone);
}

if (providerForm) {
    providerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        validateProviderPhone();
        if (!providerForm.reportValidity()) return;

        const formData = new FormData(providerForm);
        const phone = String(formData.get("providerPhone")).trim();
        const email = String(formData.get("providerEmail") || "").trim().toLowerCase();

        const providers = getProviders();

        // Prevent an accidental duplicate profile using the same phone number.
        const normalizedPhone = phone.replace(/\D/g, "");
        const duplicatePhone = providers.some(
            provider => String(provider.phone || "").replace(/\D/g, "") === normalizedPhone
        );

        if (duplicatePhone) {
            providerPhoneInput.setCustomValidity(
                "A profile with this phone number already exists in this browser."
            );
            providerPhoneInput.reportValidity();
            return;
        }

        const provider = {
            id: createProviderId(),
            name: String(formData.get("providerName")).trim(),
            phone,
            email,
            service: String(formData.get("providerService")),
            experience: String(formData.get("providerExperience")),
            area: String(formData.get("providerArea")).trim(),
            details: String(formData.get("providerDetails") || "").trim(),
            available: document.getElementById("providerAvailable").checked,
            status: "Pending review",
            createdAt: new Date().toISOString()
        };

        providers.unshift(provider);

        if (!saveProviders(providers)) return;

        providerSuccessMessage.textContent =
            `Thanks, ${provider.name}! Your ${provider.service.toLowerCase()} profile ` +
            `has been saved in this browser. Your demo profile ID is ${provider.id}.`;

        providerForm.hidden = true;
        providerSuccess.hidden = false;
        providerSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

if (registerAnotherButton) {
    registerAnotherButton.addEventListener("click", () => {
        providerForm.reset();
        providerPhoneInput.setCustomValidity("");
        providerForm.hidden = false;
        providerSuccess.hidden = true;
        providerForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}
