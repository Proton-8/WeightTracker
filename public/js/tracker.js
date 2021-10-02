const datePickHandler = (event) => {
  event.preventDefault();

  $(".datepicker-13").datepicker();
  $(".datepicker-13").datepicker("show");
};

document
  .querySelector(".datepicker-13")
  .addEventListener("click", datePickHandler);
