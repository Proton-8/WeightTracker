const datePickHandler = (event) => {
  event.preventDefault();

  $(".datepicker-13").datepicker();
  $(".datepicker-13").datepicker("show");
};




const dailyTrackHandler = async (event) => {
    event.preventDefault();
  
    const daily_weight = document.querySelector("#tracker-weight").value.trim();
    const track_date = document.querySelector("#tracker-date").value.trim();
  
    if (daily_weight && track_date) {
      const response = await fetch("/api/trackers", {
        method: "POST",
        body: JSON.stringify({
         daily_weight,
         track_date,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/trackers");
      } else {
        alert("response.statusText");
      }
    }
};

document
  .querySelector("#daily-tracker")
  .addEventListener("click", dailyTrackHandler);



document
  .querySelector(".datepicker-13")
  .addEventListener("click", datePickHandler);