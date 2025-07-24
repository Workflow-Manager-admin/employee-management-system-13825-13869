# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## API Integration & Configuration

The React frontend communicates with the Django backend via modularized API services located in `src/api/`:
- `src/api/api.js`: Central API logic, handles base URL and auth.
- `src/api/users.js`: User endpoint services (`/api/users/`).
- `src/api/employees.js`: Employee endpoint services (`/api/employees/`).
- `src/api/attendance.js`: Attendance endpoint services (`/api/attendance/`).
- `src/api/payroll.js`: Payroll endpoint services (`/api/payroll/`).

### Configuring the Backend API URL

1. Copy `.env.example` to `.env` in the project root.
2. Set the `REACT_APP_API_BASE_URL` to point to your Django backend — usually `http://localhost:8000/api/` for local development.

> Your API modules will use this env variable for all backend requests. You can change environments (production/staging/dev) by swapping out this value.

### Importing and Using API Services

All data operations should be performed via these modules:
```js
import { getEmployees } from "./api/employees";
import { getUsers } from "./api/users";
// etc.

useEffect(() => {
  getEmployees().then(data => setEmployees(data));
}, []);
```

- Avoid direct fetch calls to backend; use the provided API functions for consistency and error handling.
- JWT tokens (when supported) are automatically attached if present in localStorage as `"jwt"`.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
