# Calendar and DatePicker Components

This project includes a `Calendar` component and a `DatePicker` component designed to provide a user-friendly interface for date selection. The components are built using React and Material-UI, ensuring a modern and responsive design.

## Getting Started

1. Install dependencies 
```
yarn
```
2. Run for demo.
```
yarn dev
```

## Browser Support

- Google Chrome
- Edge
- Firefox
- Internet Explorer 11

## Task 1: Calendar Component

### Features

- **6-Row Calendar Layout**: The calendar always renders with 6 rows, regardless of the number of days in the month.
- **Gray Out-of-Month Days**: Days outside the current month are displayed in gray (`#eeeeee`).
- **Navigation**: 
  - Click `<` to navigate to previous days, months, or years.
  - Click `>` to navigate to next days, months, or years.
- **View Switching**:
  - Click the current month to switch to the month view. Selecting a month returns to the previous view.
  - Click the current year to switch to the year view. Selecting a year returns to the previous view.
- **Highlighting**:
  - Selected date, month, or year is marked with a red circle (`#db3d44`).
  - Today's date is shown in red (`#db3d44`).

### API Properties (TBD)

| Name     | Type               | Default | Description                        |
|----------|--------------------|---------|------------------------------------|
| date     | object or string   | null    | The current date to display.       |
| onSelect | function(date)     |         | Called when a date is selected.    |

## Task 2: DatePicker Component

### Features

- **Date Input and Calendar View**: Users can type a date in the input field or select a date from the calendar.
- **ISO Format**: The selected date is displayed in the input field using the ISO format (YYYY-MM-DD).
- **Calendar Dropdown**: Clicking the input field opens the calendar dropdown.
- **Auto-Close**: The calendar closes automatically when a date is selected, and the selected date is displayed in the input field.

## Usage

To use these components, import them into your React application and include them in your JSX:

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
The components can be customized using Material-UI's theming capabilities. Adjust the theme in `App.jsx` to change colors, typography, and more.
