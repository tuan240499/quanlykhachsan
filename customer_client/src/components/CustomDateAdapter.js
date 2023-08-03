import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function CustomDateAdapter(options) {
  const adapter = new AdapterDateFns(options);

  const constructDayObject = (day) => ({ charAt: () => day });

  return {
    ...adapter,
    getWeekdays() {
      // Feel free to replace this with your custom value
      const customWeekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
      // const customWeekdays = adapter.getWeekdays();
      return customWeekdays.map((day) => constructDayObject(day));
    },
  };
}
