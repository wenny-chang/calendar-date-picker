import { useMemo } from "react";
import { CalendarContentView } from "../utils/constant";
import useCalendar from "./useCalendar";

export const baseStyle = {
  margin: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
};

const useCalendarStyle = (
  isToday: boolean,
  isSelected: boolean,
  isNotSameScope: boolean,
  view?: CalendarContentView
) => {
  const { currentContentView } = useCalendar();
  const size = useMemo(() => {
    switch (view ?? currentContentView) {
      case CalendarContentView.DAY:
        return 36;
      case CalendarContentView.MONTH:
      case CalendarContentView.YEAR:
        return 60;
      default:
        return 36;
    }
  }, [view]);

  return useMemo(
    () => ({
      ...baseStyle,
      width: size,
      height: size,
      ...(isToday && { color: "#db3d44" }),
      ...(isSelected && { backgroundColor: "#db3d44", color: "white" }),
      ...(isNotSameScope && { color: "#eeeeee" }),
      ":hover": { backgroundColor: "#db3d44", color: "white" },
    }),
    [isToday, isSelected, isNotSameScope, size]
  );
};

export default useCalendarStyle;
