## Project Overview

This project is a web application designed for managing and displaying course information, including course details,
timings, and user authentication for students. It utilizes a modern tech stack including TypeScript, React, and Tailwind
CSS for styling. The application supports dark mode and does not provide a responsive design.

### Features

- **Course Information Display**: Shows detailed information about courses, including custom styling for course details
  and checkboxes for course selection.
- **HBKU Courses Timings**: Allows users to view and manage the timings for HBKU courses, with functionality to add new
  timings.
- **User Authentication**: Supports login and signup functionality, with form validation and error handling.
- **Dark Mode Support**: Includes a toggle for dark mode, enhancing user experience and accessibility.
- **Responsive Design**: Ensures the application is accessible on various devices and screen sizes.

### Getting Started

To get started with this project, you need several prerequisites:

- Git
- Node.js
- Yarn
- Firebase CLI

I assume you have at least the first two prerequisites installed. For the rest, follow the instructions below.

#### Yarn

After installing Node.js and npm, install Yarn globally by running: `npm install --global yarn`
Verify Yarn is installed by running `yarn --version`

#### Firebase CLI

Install the Firebase CLI globally using npm: `npm install -g firebase-tools`
Verify the installation with `firebase --version`
Log in to Firebase using firebase login and follow the prompts.

Clone the repository and install the dependencies using either npm or yarn:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-name>

# Install dependencies
yarn install
```

### Running the Application

After installing the dependencies, you can start the application locally by running:

```bash
yarn start
```

The application will be available at `http://localhost:3000`.