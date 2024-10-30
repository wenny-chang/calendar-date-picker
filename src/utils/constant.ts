export enum CalendarContentView {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export enum CalendarPickerView {
  MONTH_YEAR_HEADER = "MONTH_YEAR_HEADER",
  YEAR_HEADER = "YEAR_HEADER",
  YEARS_HEADER = "YEARS_HEADER",
}

export const NextCalendarContentView: Record<string, string> = {
  DAY: CalendarContentView.MONTH,
  MONTH: CalendarContentView.YEAR,
};

export const CalendarContentMapping: Record<string, string> = {
  [CalendarContentView.DAY]: CalendarPickerView.MONTH_YEAR_HEADER,
  [CalendarContentView.MONTH]: CalendarPickerView.YEAR_HEADER,
  [CalendarContentView.YEAR]: CalendarPickerView.YEARS_HEADER,
  [CalendarPickerView.MONTH_YEAR_HEADER]: CalendarContentView.DAY,
  [CalendarPickerView.YEAR_HEADER]: CalendarContentView.MONTH,
  [CalendarPickerView.YEARS_HEADER]: CalendarContentView.YEAR,
};
