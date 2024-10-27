export const CalendarContentView = {
  DAY: "DAY",
  MONTH: "MONTH",
  YEAR: "YEAR",
};

export const CalendarPickerView = {
  MONTH_YEAR_HEADER: "MONTH_YEAR_HEADER",
  YEAR_HEADER: "YEAR_HEADER",
  YEARS_HEADER: "YEARS_HEADER",
};

export const NextCalendarContentView = {
  DAY: CalendarContentView.MONTH,
  MONTH: CalendarContentView.YEAR,
};

export const NextCalendarPickerView = {
  MONTH_YEAR: CalendarPickerView.YEAR,
  YEAR: CalendarPickerView.MONTH_YEAR,
};

export const CalendarContentMapping = {
  [CalendarContentView.DAY]: CalendarPickerView.MONTH_YEAR_HEADER,
  [CalendarContentView.MONTH]: CalendarPickerView.YEAR_HEADER,
  [CalendarContentView.YEAR]: CalendarPickerView.YEARS_HEADER,
  [CalendarPickerView.MONTH_YEAR_HEADER]: CalendarContentView.DAY,
  [CalendarPickerView.YEAR_HEADER]: CalendarContentView.MONTH,
  [CalendarPickerView.YEARS_HEADER]: CalendarContentView.YEAR,
};
