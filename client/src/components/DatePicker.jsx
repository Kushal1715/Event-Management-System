import { Datepicker } from "flowbite-react";

export function DatePicker() {
  return <Datepicker autoHide={true} minDate={new Date()} />;
}
