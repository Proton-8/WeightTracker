const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("*********************************");

  const full_name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const current_weight = document
    .querySelector("#currentWeight-signup")
    .value.trim();
  const target_weight = document
    .querySelector("#targetWeight-signup")
    .value.trim();
  const start_date = document.querySelector("#startDate-signup").value.trim();
  const target_date = document.querySelector("#targetDate-signup").value.trim();

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        full_name,
        email,
        password,
        current_weight,
        target_weight,
        start_date,
        target_date,
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

const startDatePickHandler = (event) => {
    event.preventDefault();
  
    $("#startDate-signup").datepicker();
    $("#startDate-signup").datepicker("show");
};


const targetDatePickHandler = (event) => {
    event.preventDefault();
  
    $("#targetDate-signup").datepicker();
    $("#targetDate-signup").datepicker("show");
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);



document
  .querySelector("#startDate-signup")
  .addEventListener("click", startDatePickHandler);



document
  .querySelector("#targetDate-signup")
  .addEventListener("click", targetDatePickHandler);
