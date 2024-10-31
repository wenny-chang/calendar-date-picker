# Calendar and DatePicker Components

This project features a `Calendar` and a `DatePicker` component, both built with React and Material-UI for a modern, responsive design.

## Getting Started

1. **Install Dependencies**:
   ```bash
   yarn
   ```
2. **Run the Demo**:
   ```bash
   yarn dev
   ```

## Browser Support

- Google Chrome
- Edge
- Firefox
- Internet Explorer 11

## Calendar Component

### Features

- **6-Row Layout**: Always displays 6 rows, regardless of the month's days.
- **Gray Out-of-Month Days**: Days outside the current month appear in gray (`#eeeeee`).
- **Navigation**: 
  - `<` for previous days, months, or years.
  - `>` for next days, months, or years.
- **View Switching**:
  - Click the current month/year to switch views.
- **Highlighting**:
  - Selected date/month/year: red circle (`#db3d44`).
  - Today's date: red (`#db3d44`).

### API Properties

| Name            | Type             | Default | Description                                      |
|-----------------|------------------|---------|--------------------------------------------------|
| `date`          | Date or string   | null    | The selected date.                               |
| `defaultDate`   | Date or string   | null    | The default selected date.                       |
| `firstDayOfWeek`| number           | 0       | First day of the week (0 = Sunday, 1 = Monday, etc.). |
| `onDateSelect`  | function(value)  |         | Callback when the selected date changes.         |

## DatePicker Component

### Features

- **Date Input and Calendar View**: Type a date or select from the calendar.
- **ISO Format**: Displays selected date in ISO format (YYYY-MM-DD).
- **Calendar Dropdown**: Opens on input field click.
- **Auto-Close**: Closes when a date is selected.

### API Properties

| Name            | Type             | Default     | Description                                      |
|-----------------|------------------|-------------|--------------------------------------------------|
| `defaultValue`  | Date or string   | null        | The default selected date.                       |
| `inputFormat`   | string           | yyyy-MM-dd  | The input format (e.g., `yyyy-MM-dd`, `MM-dd-yyyy`, `dd-MM-yyyy`).           |
| `closeOnSelect` | boolean          | false       | Close the calendar after a date is selected.     |
| `firstDayOfWeek`| number           | 0           | First day of the week (0 = Sunday, 1 = Monday, etc.). |
| `onChange`      | function(value)  |             | Callback when the input value changes.           |

## Usage

Import and use these components in your React application:

```jsx
import Calendar from './Calendar/Calendar';
import DatePicker from './DatePicker';

function App() {
  return (
    <div>
      <Calendar />
      <DatePicker />
    </div>
  );
}

export default App;
```

### UI Customization

Customize using Material-UI's theming capabilities. Adjust the theme in `App.jsx` to change colors, typography, and more.