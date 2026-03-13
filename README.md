# Inventory Management System (Frontend)

This is the frontend for a simple inventory management system built with Next.js. It helps track items, manage borrowings, and organize inventory based on physical locations and cupboards.

## Features

*   **Inventory Tracking**: Full CRUD for items, including item codes, quantities, and descriptions.
*   **Borrowing Management**: Keep track of who borrowed what, contact details, and expected return dates.
*   **Location Mapping**: Assign items to specific 'Places' or 'Cupboards' for easier physical searching.
*   **Status Indicators**: Track if items are 'In-Store', 'Borrowed', 'Damaged', or 'Missing'.
*   **Toast Notifications**: Real-time feedback for all actions using `react-hot-toast`.

## Setup & Local Development

1.  **Clone the repo**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root (or copy from `.env.example` if available) and set your API base URL:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Build for production**:
    ```bash
    npm run build
    npm start
    ```

## Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS
*   **State/Logic**: React (Hooks)
*   **API Interaction**: Custom `apiClient` wrapper
*   **Notifications**: React Hot Toast

## Project Structure

Inside `src/app`, you'll find:
*   `/auth`: Login and user management.
*   `/inventory`: Main item management page.
*   `/borrowing`: Tracking borrowed items and return statuses.
*   `/place` & `/cupboard`: Physical location management.

