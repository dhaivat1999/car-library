# 🚗 Car Library Website – FiziVerse Frontend Assignment

This is my submission for the **FiziVerse Frontend Home Assignment**. It is a fully responsive **Car Library Website** built with **React + TypeScript**, styled using **Tailwind CSS**, and powered by a backend API. It mirrors real-world frontend development practices, is structured using Domain-Driven Design (DDD), and closely follows the provided Figma design and requirements.

🔗 **GitHub Repository**: [https://github.com/dhaivat1999/car-library](https://github.com/dhaivat1999/car-library)

---

## 💪 Tech Stack

* **React + TypeScript** – Core frontend framework
* **Vite** – Fast dev build tool
* **Tailwind CSS** – Utility-first CSS for styling
* **React Router DOM** – Routing for multi-page layout
* **Axios** – API interaction
* **Domain-Driven Design (DDD)** – Clean, modular folder structure
* **Jest + React Testing Library** – Initial unit test setup

---

## 📁 Folder Structure

```
src/
├── domain/            # Core business types & models
├── infrastructure/    # API layer
├── presentation/      # Pages & UI components
└── main.tsx           # Entry point
```

---

## ✅ Features Implemented

### 🤩 Car Grid

* Responsive grid layout
* Card with image, name, description, car type label
* Image fallback if loading fails

### ℹ️ Car Details Modal

* On card click, shows modal with full car info
* Includes formatted creation date and tags

### 🧹 Search

* Real-time search with debounce
* Matches on car name and description

### 🔃 Sorting

* Sort by name (A-Z, Z-A) or created date (Newest, Oldest)
* Works via backend query params

### 🔍 Filtering

* Filter by car type and tags
* Multi-tag filter uses AND logic

### ➕ Add New Car

* Dynamic form with controlled inputs
* Fields: image URL, name, description, type, tags
* API integration and redirect on submit

### ❌ Delete with Confirmation

* Trash icon triggers a confirmation modal
* Prevents accidental deletion

### ⚠️ Error Handling

* Errors handled gracefully with toast notifications
* Loading states included for delete and fetch

### 🔔 Toast System

* Toast alerts for success and failure
* Planned improvements: auto-dismiss and styling

---

## 🥪 Testing

* Basic setup is in place for:

  * **Jest**
  * **React Testing Library**
* Tests will cover form logic, UI interaction, and error states
* Scaffolding ready for future expansion

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dhaivat1999/car-library.git
cd car-library
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Dev Server

```bash
npm run dev
```

### 4. Run Unit Tests

```bash
npm run test
```

---

## 🔌 API Overview

* Base URL: `https://mock-cars-api-39814baaf6c0.herokuapp.com`
* Key endpoints:

  * `GET /api/cars`
  * `POST /api/cars`
  * `DELETE /api/cars/:id`
  * `GET /api/cars/types`
  * `GET /api/cars/tags`

---

## 📦 Future Improvements

If more time were available, I'd extend the project by:

* Implementing full unit and integration test coverage
* Adding animations with **Framer Motion**
* Enhancing accessibility (ARIA, keyboard nav)
* Introducing optimistic updates for better UX
* Paginating or infinite scrolling the car grid
* Adding persistent toast with dismiss logic

---

## 🗓️ Timeline

> This project was completed within the 5-day window provided for the FiziVerse assignment.

---

## 🙏 Thank You

Thank you for reviewing my submission. I’ve thoroughly enjoyed building this project and hope it demonstrates both technical skill and attention to user experience.

🚀 [dhaivat1999/car-library](https://github.com/dhaivat1999/car-library)
