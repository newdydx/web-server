fetch("http://localhost:3000/weather?address=boston").then((response) => {
  response.json().then((data) => {
    console.log(data.location);
    console.log(data.latitude);
  });
});

// const Location = document.querySelector("input");

// const weatherForm = document.querySelector("form");

// weatherForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const result = location.value;
//   console.log(result);
// });
