
# 🐝 HoneyHive — Your Home, Our Hive

**A little help. A happier home.**

HoneyHive is a honeybee-inspired home services booking platform that connects people with services for everyday home maintenance. Inspired by how honeybees work together to keep their hive thriving, HoneyHive brings essential home services together in one simple, friendly interface.

From plumbing and electrical work to painting and carpentry, every task contributes to a happier home.

## 💡 Our Inspiration

Honeybees are hardworking, organized, and thrive through teamwork. Each bee plays a role in supporting the hive.

HoneyHive follows the same idea: bring customers and home-service professionals together through one platform, making it easier to organize and manage home maintenance requests.

**Our mission:** Make home maintenance simple, organized, and accessible — one service at a time.

## ✨ Features

- 🏠 **Home Page:** A welcoming landing page introducing the platform.
- 🔧 **Multiple Services:** Plumbing, electrical, painting, and carpentry.
- 📝 **Booking Form:** Submit a service request with contact details, address, preferred date, and problem description.
- 🆔 **Booking ID:** Generate a unique identifier for each booking.
- 📋 **Admin Dashboard:** View and manage submitted bookings.
- 🔎 **Search and Filtering:** Find bookings and filter by status.
- ✅ **Booking Status:** Mark requests as completed.
- 🗑️ **Booking Management:** Delete demo bookings.
- 💾 **Local Storage:** Preserve demo bookings in the same browser and website origin.
- 📱 **Responsive Design:** Support desktop and mobile layouts.
- 🐝 **Honeybee-Inspired UI:** Golden-yellow accents, service icons, and subtle animations.

## 🛠️ Technology Stack

- **HTML5** — page structure and forms
- **CSS3** — responsive styling, layout, and animations
- **Vanilla JavaScript** — form validation and dashboard interactions
- **Browser Local Storage** — demo booking persistence

No backend server or database is currently required.

## 📁 Project Structure

```text
HoneyHive/
├── index.html       # Homepage and booking form
├── style.css        # Styling, responsive layout, and animations
├── script.js        # Booking validation and storage
├── admin.html       # Admin dashboard interface
├── admin.js         # Booking search and management
└── README.md        # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A code editor such as Visual Studio Code
- The Live Server extension for Visual Studio Code (recommended)

### Installation

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Right-click `index.html` and select **Open with Live Server**.
5. Use the homepage to submit a service booking.
6. Open `admin.html` using the same local server and browser to manage bookings.

**Important:** Open both pages through the same origin. Local Storage is origin-specific, so opening one page directly as a file while serving the other through Live Server may prevent them from sharing bookings.

## 🧪 How to Test

1. Open the HoneyHive homepage.
2. Choose a service and complete the booking form.
3. Submit the request and note the booking ID.
4. Open the Admin Dashboard.
5. Confirm that the booking appears.
6. Search for the booking or filter it by status.
7. Mark it as completed.
8. Refresh the dashboard and verify that the update persists.
9. Try the layout on a smaller screen.

## 🔒 Limitations and Future Improvements

This version is a functional demonstration, not a production-ready booking service.

- Bookings are stored in browser Local Storage, not a shared database.
- Data is not automatically synchronized across different users or devices.
- The admin dashboard has no authentication and must not be used for real administrative access.
- Booking confirmation means the request was saved locally; it does not mean a professional has accepted it.
- A real deployment would require a secure backend, database, authentication, input validation on the server, and appropriate privacy protections.

### Future Plans

- Add user accounts and secure administrator authentication.
- Connect a backend API and shared database.
- Allow service professionals to accept and manage requests.
- Add real-time booking updates and notifications.
- Introduce ratings, reviews, and service-provider profiles.
- Explore cloud deployment and monitoring.

## 🤖 AI Usage Disclosure

AI tools were used as development assistance during this project, including support with planning, writing and refining code, UI ideas, and project documentation.

The project team is responsible for reviewing, adapting, testing, and understanding the final implementation. Any AI-generated suggestions should be verified before use.

**AI tools used:** [List the actual AI tools used by your team, such as ChatGPT, and describe their contributions accurately.]

This disclosure should be updated to reflect the tools actually used and the hackathon's rules.

## 🏆 Hackathon Project

Built for the Hacktoberfest Hack Day / AWS Student Builder Group GCB SKP event.

The goal is to demonstrate a practical, user-friendly home services workflow while learning and applying web development concepts.

## ❤️ Our Motto

**Every bee has a role. Every skill matters. Every home deserves care.**

*HoneyHive — Your Home, Our Hive.*
