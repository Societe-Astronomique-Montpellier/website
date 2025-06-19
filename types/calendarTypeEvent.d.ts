import type { ColorDefinition } from "@schedule-x/calendar";

export type CalendarTypeEvent = {
  id: string;
  title: string;
  description: string;
  colorName: string;
  lightColors: ColorDefinition;
  darkColors: ColorDefinition;
};

export type CalendarTypeEventList = CalendarTypeEvent[];
