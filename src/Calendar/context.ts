import { createContext } from "react";
import { CalendarContentView } from "../utils/constant";

export interface CalendarContextType {
  activeDate: Date;
  setActiveDate: (date: Date) => void;
  formatDate: (date: Date, format: string) => string;
  date: Date | null;
  setDate: (date: Date) => void;
  currentContentView: CalendarContentView;
  setCurrentContentView: (contentView: CalendarContentView) => void;
  firstDayOfWeek: number;
  onDateSelect: (date: { year: number; month: number; day: number }) => void;
}

const CalendarContext = createContext<CalendarContextType>({
  activeDate: new Date(),
  setActiveDate: () => {},
  formatDate: () => "",
  date: new Date(),
  setDate: () => {},
  currentContentView: CalendarContentView.DAY,
  setCurrentContentView: () => {},
  firstDayOfWeek: 0,
  onDateSelect: () => {},
});

const CalendarProvider = CalendarContext.Provider;

export { CalendarContext, CalendarProvider };
