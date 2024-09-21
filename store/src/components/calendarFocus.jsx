export const handleCalendarFocus = () => {
  setTimeout(() => {
    const datePickerCollection =
      document.getElementsByClassName("p-datepicker");
    console.log(datePickerCollection.item);
    if (datePickerCollection.length) {
      const datePicker = datePickerCollection.item(0);
      datePicker.setAttribute("tabindex", "0");
      datePicker.focus();
    }
  }, 500);
};
