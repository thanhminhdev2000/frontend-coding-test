# Task Management Application

This is a simple Task Management application built with React, MUI (Material-UI), and Axios for handling HTTP requests. The application allows users to add, update, and delete tasks, as well as filter them based on their status (Incomplete or Completed).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)

## Getting Started

Follow the instructions below to install and run this project locally.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14+ recommended)
- npm or yarn
- A backend server running on `http://localhost:5000`

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thanhminhdev2000/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies using npm or yarn:
   ```bash
   npm install
   ```

## Running the Application

1. Start the backend server application:

   ```bash
   npm run server
   ```

2. Start the frontend application:

   ```bash
   npm run dev
   ```

3. Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Features

- **Add New Task:** Add a new task with title and description.
- **Update Task:** Update the title, description, and status of existing tasks.
- **Delete Task:** Remove tasks from the list.
- **Filter Tasks:** Filter tasks based on their status (Incomplete, Completed, All).

## Folder Structure

Here's an overview of the project's folder structure:

```
src/
├── App.jsx
├── components/
│   ├── AddTaskModal.jsx
│   ├── UpdateTaskModal.jsx
│   ├── ModalDialog.jsx
```

## Dependencies

The project uses the following key dependencies:

- `@mui/material` and `@mui/icons-material`: For UI components.
- `axios`: For making HTTP requests to the backend.
- `react-hook-form`: For handling forms and validation.
- `react-toastify`: For displaying notifications.
- `react`: The main framework for building the UI.
