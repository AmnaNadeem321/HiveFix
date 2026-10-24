
"use strict";

const ADMIN_STORAGE_KEY = "homefix_bookings";

const bookingsList = document.getElementById("bookingsList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchBookings");
const statusFilter = document.getElementById("statusFilter");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

function readBookings() {
    try {
        const data = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (!data) return [];

        const bookings = JSON.parse(data);
        return Array.isArray(bookings) ? bookings : [];
    } catch (error) {
        console.error("Unable to load bookings:", error);
        return [];
    }
}

function writeBookings(bookings) {
    try {
        localStorage.setItem(
            ADMIN_STORAGE_KEY,
            JSON.stringify(bookings)
        );
        return true;
    } catch (error) {
        console.error("Unable to update bookings:", error);
        alert("Could not update browser storage.");
        return false;
    }
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

function addDetail(card, label, value) {
    const detail = createElement("p", "booking-detail");
    const strong = createElement("strong", "", label + ": ");
    const span = createElement("span", "", value || "Not provided");

    detail.append(strong, span);
    card.appendChild(detail);
}

function renderDashboard() {
    const bookings = readBookings();

    // Update summary counts.
    totalCount.textContent = bookings.length;
    pendingCount.textContent = bookings.filter(
        booking => booking.status === "Pending"
    ).length;

    completedCount.textContent = bookings.filter(
        booking => booking.status === "Completed"
    ).length;

    // Filter by search and status.
    const query = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    const filteredBookings = bookings.filter(booking => {
        const searchableText = [
            booking.id,
            booking.name,
            booking.phone,
            booking.service,
            booking.address
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(query);
        const matchesStatus =
            selectedStatus === "All" ||
            booking.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Clear the old cards before rendering new ones.
    bookingsList.replaceChildren();

    emptyState.hidden = filteredBookings.length !== 0;
    bookingsList.hidden = filteredBookings.length === 0;

    filteredBookings.forEach(booking => {
        const card = createElement("article", "booking-admin-card");

        const header = createElement("div", "booking-card-header");
        const headingGroup = createElement("div", "booking-card-title");

        headingGroup.append(
            createElement("h3", "", booking.name),
            createElement("span", "booking-id", booking.id)
        );

        const status = createElement(
            "span",
            "status-badge " +
                (booking.status === "Completed"
                    ? "status-completed"
                    : "status-pending"),
            booking.status
        );

        header.append(headingGroup, status);
        card.appendChild(header);

        const service = createElement(
            "div",
            "booking-service-tag",
            booking.service
        );
        card.appendChild(service);

        addDetail(card, "Phone", booking.phone);
        addDetail(card, "Address", booking.address);
        addDetail(card, "Preferred date", booking.date);
        addDetail(card, "Problem", booking.problem);

        if (booking.createdAt) {
            const created = new Date(booking.createdAt);

            if (!Number.isNaN(created.getTime())) {
                addDetail(
                    card,
                    "Requested on",
                    created.toLocaleString()
                );
            }
        }

        const actions = createElement("div", "booking-actions");

        if (booking.status !== "Completed") {
            const completeButton = createElement(
                "button",
                "btn btn-primary",
                "✓ Mark completed"
            );

            completeButton.type = "button";

            completeButton.addEventListener("click", () => {
                updateBookingStatus(booking.id, "Completed");
            });

            actions.appendChild(completeButton);
        }

        const deleteButton = createElement(
            "button",
            "btn btn-outline btn-delete",
            "Delete"
        );

        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteBooking(booking.id);
        });

        actions.appendChild(deleteButton);
        card.appendChild(actions);

        bookingsList.appendChild(card);
    });
}

function updateBookingStatus(id, newStatus) {
    const bookings = readBookings();

    const booking = bookings.find(item => item.id === id);
    if (!booking) return;

    booking.status = newStatus;

    if (writeBookings(bookings)) {
        renderDashboard();
    }
}

function deleteBooking(id) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this demo booking?"
    );

    if (!confirmed) return;

    const bookings = readBookings().filter(
        booking => booking.id !== id
    );

    if (writeBookings(bookings)) {
        renderDashboard();
        
/* Automatically refresh when bookings change in another tab */
window.addEventListener("storage", (event) => {
    if (event.key === "homefix_bookings") {
        renderDashboard();
    }
});

/* Refresh when returning to the dashboard */
window.addEventListener("focus", renderDashboard);

    }
}

// Search, filter, and refresh controls.
searchInput.addEventListener("input", renderDashboard);
statusFilter.addEventListener("change", renderDashboard);

document.getElementById("refreshBookings")
    .addEventListener("click", renderDashboard);

// Initial dashboard display.
renderDashboard();
