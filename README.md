# GoPratle Requirement Posting Flow

## Overview

The GoPratle Requirement Posting Flow is a robust, dynamic 4-step form designed for event organizers to post specific requirements for Event Planners, Performers, and Crew. Built as a technical assignment for a Full-Stack Developer Intern position, it showcases modern web development practices including robust validation, modular state management, and a clean, responsive UI.

The application allows users to fill out general event basics in Step 1, dynamically adjusts the required fields in Steps 2 and 3 based on the selected category, and provides a final review screen before securely submitting the data to a REST API backed by MongoDB.

## Live Demo

- **Frontend URL:** [Add Vercel URL Here]
- **Backend API URL:** [Add Render/Railway URL Here]

## Screenshots

*(Add screenshots of the form steps and success state here)*

## Features

- **Four-Step Flow:** Seamless navigation through Event Basics, Category Details, Requirements, and Review.
- **Dynamic Forms:** Steps 2 and 3 automatically adapt based on whether the user selects Planner, Performer, or Crew.
- **Dual Validation:** Comprehensive validation runs synchronously on the frontend using Zod and React Hook Form, and securely on the Express backend before database insertion.
- **State Preservation:** Navigating Back/Next preserves form state effortlessly without data loss. Stale data from previous categories is intelligently cleared upon switching.
- **API Submission:** Submits clean JSON to a REST API.
- **MongoDB Persistence:** Stores requirements in a structured, typed Mongoose model.
- **Responsive Design:** Polished Tailwind CSS UI optimized for Desktop, Tablet, and Mobile.
- **Error Handling:** Elegant error messages for invalid fields, network failures, and backend rejections.

## Tech Stack

**Frontend:**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod (Validation)
- Axios

**Backend:**
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod (Validation Middleware)

## Architecture

The project is structured as a monorepo with distinct frontend and backend layers:

**Next.js (Frontend)** -> Handles UI, state, and initial validation. Submits to API via Axios.
**Express.js (Backend)** -> Intercepts the REST request.
**Validation Middleware** -> Zod safely parses incoming data.
**Service Layer** -> Abstracts business logic away from the controller.
**Mongoose/MongoDB** -> Saves the document and returns a formatted response.

## Project Structure

```text
gopratle-requirement-flow/
├── frontend/
│   ├── src/
│   │   ├── app/           (Next.js Pages)
│   │   ├── components/    (React Components & Form Steps)
│   │   ├── lib/           (Zod Schemas, API Config)
│   │   └── types/         (TypeScript Interfaces)
├── backend/
│   ├── src/
│   │   ├── controllers/   (HTTP Logic)
│   │   ├── middlewares/   (Validation & Errors)
│   │   ├── models/        (Mongoose Schemas)
│   │   ├── routes/        (Express Router)
│   │   └── services/      (Database Ops)
```

## Data Model

The MongoDB schema uses strongly typed common fields for top-level event information, while utilizing a flexible `details` object for category-specific data. 
```json
{
  "eventName": "Tech Conference 2026",
  "eventType": "Corporate",
  "startDate": "2026-10-10",
  "endDate": "2026-10-12",
  "location": "Mumbai",
  "category": "performer",
  "details": {
    "performerType": "Band",
    "genre": "Rock",
    "performanceDuration": 120,
    "numberOfPerformers": 4,
    "estimatedBudget": 50000,
    "equipmentRequired": ["Sound System", "Lighting"]
  }
}
```
**Why?** This structure allows common queries (e.g., "Find all events in Mumbai") to run efficiently on top-level indexed fields, while keeping the category-specific schemas strictly validated at the application layer without bloating the DB schema with null values.

## API Documentation

### `POST /api/requirements`

Creates a new requirement.

**Request Body (Example):**
```json
{
  "eventName": "Tech Conference",
  "eventType": "Corporate",
  "startDate": "2026-10-10",
  "endDate": "2026-10-12",
  "location": "Mumbai",
  "category": "crew",
  "details": {
    "crewType": "Videographer",
    "workingHours": 8,
    "numberOfCrewMembers": 2,
    "estimatedBudget": 15000
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Requirement created successfully",
  "data": { ... }
}
```

## Local Setup

**1. Clone the repository:**
```bash
git clone <repo-url>
cd gopratle-requirement-flow
```

**2. Setup Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

**3. Setup Frontend:**
```bash
cd ../frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

**Frontend:**
- `NEXT_PUBLIC_API_URL`: Backend API URL (e.g. `http://localhost:5000/api`)

**Backend:**
- `PORT`: Server port (e.g. 5000)
- `MONGODB_URI`: Connection string to MongoDB
- `FRONTEND_URL`: URL of the frontend for CORS policy

*(Note: Never commit real secrets to source control. Use the `.env.example` templates).*

## Validation & Edge Cases

- **Date Validation:** `endDate` cannot precede `startDate`.
- **Category Switching:** If a user completes Steps 2/3 for a "Performer" but switches to "Crew", the stale `details` data is immediately purged.
- **Double Submission:** The submit button disables and shows a loading state while awaiting the API response.
- **Strict Backend Parsing:** The Express backend uses Zod's `superRefine` to parse the `details` object against specific schemas depending on the `category`. Invalid requests are rejected with a 400 status.

## Assumptions

- Budgets and numeric inputs are strictly positive integers.
- The assignment did not define exhaustive fields for every category, so reasonable logistical fields (like Working Hours for Crew, Duration for Performers) were assumed.
- Currency conversions/formatting are assumed to be localized by the user later; the database strictly stores numeric values.

## Limitations

- Does not include authentication or authorization (by design).
- "Venue" lookup is a free-text field rather than a complex Maps integration.
- Draft saving (Local Storage persistence) is not currently implemented.

## Future Improvements

- Add OAuth/JWT Authentication to link requirements to specific user profiles.
- Save progress automatically to `localStorage` or session storage.
- Implement an admin dashboard to review and filter all incoming requirements.
- Add E2E tests using Cypress or Playwright.
