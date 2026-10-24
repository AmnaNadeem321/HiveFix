
"use strict";

// =======================================
// HomeFix: Booking System
// =======================================

const STORAGE_KEY = "homefix_bookings";

const bookingForm = document.getElementById("bookingForm");
const serviceSelect = document.getElementById("serviceType");
const bookingDate = document.getElementById("bookingDate");
const bookingSuccess = document.getElementById("bookingSuccess");
const successMessage = document.getElementById("successMessage");
const bookAnother = document.getElementById("bookAnother");

// Set today's date as the minimum selectable booking date.
const currentDate = new Date();
const today = [
    currentDate.getFullYear(),
    String(currentDate.getMonth() + 1).padStart(2, "0"),
    String(currentDate.getDate()).padStart(2, "0")
].join("-");

if (bookingDate) {
    bookingDate.min = today;
}


// =======================================
// Read and save bookings
// =======================================

function getBookings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            return [];
        }

        const bookings = JSON.parse(stored);

        return Array.isArray(bookings) ? bookings : [];
    } catch (error) {
        console.error("Could not read bookings:", error);
        return [];
    }
}

function saveBookings(bookings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        return true;
    } catch (error) {
        console.error("Could not save bookings:", error);
        alert("Unable to save your booking. Please check browser storage.");
        return false;
    }
}

function createBookingId() {
    return "HF-" + Date.now().toString(36).toUpperCase();
}


// =======================================
// Service card selection
// =======================================

document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
        if (serviceSelect) {
            serviceSelect.value = link.dataset.service;
        }
    });
});


// =======================================
// Phone validation
// =======================================

const phoneInput = document.getElementById("phone");

function validatePhone() {
    if (!phoneInput) return true;

    const value = phoneInput.value.trim();
    const digits = value.replace(/\D/g, "");

    const valid =
        /^[0-9+().\s-]+$/.test(value) &&
        digits.length >= 7 &&
        digits.length <= 15;

    phoneInput.setCustomValidity(
        valid
            ? ""
            : "Enter a phone number containing 7–15 digits."
    );

    return valid;
}

if (phoneInput) {
    phoneInput.addEventListener("input", validatePhone);
}


// =======================================
// Submit booking
// =======================================

if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        validatePhone();

        if (!bookingForm.reportValidity()) {
            return;
        }

        const formData = new FormData(bookingForm);

        // Create a booking object from the form.
        const booking = {
            id: createBookingId(),
            name: String(formData.get("customerName")).trim(),
            phone: String(formData.get("phone")).trim(),
            service: String(formData.get("serviceType")),
            address: String(formData.get("address")).trim(),
            date: String(formData.get("bookingDate")),
            problem: String(formData.get("problem")).trim(),
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        // Save the booking before showing success.
        const bookings = getBookings();
        bookings.unshift(booking);

        if (!saveBookings(bookings)) {
            return;
        }

        // Show confirmation with the booking ID.
        successMessage.textContent =
            `Thank you, ${booking.name}! Your ` +
            `${booking.service.toLowerCase()} request has been saved. ` +
            `Booking ID: ${booking.id}. Preferred date: ${booking.date}. ` +
            `Your request is currently pending.`;

        bookingForm.hidden = true;
        bookingSuccess.hidden = false;

        bookingSuccess.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}


// =======================================
// Book another service
// =======================================

if (bookAnother) {
    bookAnother.addEventListener("click", () => {
        bookingForm.reset();
        bookingDate.min = today;

        bookingForm.hidden = false;
        bookingSuccess.hidden = true;

        if (phoneInput) {
            phoneInput.setCustomValidity("");
        }

        bookingForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}
