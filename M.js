const form = document.querySelector("form");

const nameError = document.getElementById("use");
const emailError = document.getElementById("ema");
const numError = document.getElementById("num");

document.querySelector(".mobile-btn").addEventListener("click", () => {
  form.requestSubmit();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

const name = document.getElementById("Name").value.trim();
  const email = document.getElementById("Email").value.trim();
  const number = document.getElementById("Number").value.trim();

  console.log(name, email, number);

  nameError.textContent = "";
  emailError.textContent = "";
  numError.textContent = "";

   // NAME
  if (name.length < 5) {
    nameError.textContent = "Enter full name";
    nameError.style.color = "red"
    return;
  }
  // EMAIL
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email";
    emailError.style.color = "red"
    return;
  }

  // PHONE
const allowedCodes = ["+234", "+1", "+44", "+91", "+81", "+61"];
const matchedCode = allowedCodes.find(code => number.startsWith(code));

if (!matchedCode) {
  numError.textContent = "Use valid country code (+234 etc)";
  numError.style.color = "red";
  return;
}

// Remove country code
const localNumber = number.slice(matchedCode.length);

// Check if it's only digits
if (!/^\d+$/.test(localNumber)) {
  numError.textContent = "Phone must contain only digits after code";
  numError.style.color = "red";
  return;
}

// Enforce EXACT length (10 digits)
if (localNumber.length !== 10) {
  numError.textContent = "Number must be exactly 10 digits after country code";
  numError.style.color = "red";
  return;
}
  // PHONE
//     const allowedCodes = ["+234", "+1", "+44", "+91", "+81", "+61"];
//   const validCode = allowedCodes.some(code => number.startsWith(code));
  

//   if (!validCode) {
//     numError.textContent = "Use valid country code (+234 etc)";
//     numError.style.color = "red"
//     return;
//   }

//   if (number.length < 10) {
//     numError.textContent = "Invalid number length";
//     numError.style.color = "red"
//     return;
//   }

  // SUCCESS
  console.log("Submitted:", { name, email, number });

  window.location.href = "page 2.html";
});
  









// const form = document.querySelector("form");
// // const feedBack = document.getElementById("diff");

// const nameError = document.getElementById("use");
// const emailError = document.getElementById("ema");
// const numError = document.getElementById("num");

// const name = document.getElementById("Name").value.trim();
// const email = document.getElementById("Email").value.trim();
// const number = document.getElementById("Number").value.trim();
// const Button = document.querySelector("button")

// console.log(name, email, number);


// nameError.textContent = "";
// emailError.textContent = "";
// numError.textContent = "";

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
// // NAME VALIDATION
//   if (name.length < 5) {
//     nameError.textContent = "Enter your full name";
//     nameError.style.color = "red";
//     return;
//   } 
// //EMAIL VALIDATION
// //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   if (!emailPattern.test(email)) {
// //     feedBack.textContent = "Enter a valid email (must include @ and .com)";
// //     feedBack.style.color = "red";
// //     return;
// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) {
//     emailError.textContent = "Enter a valid email (must include @ and .com)";
//     emailError.style.color = "red";
//     return;
//   } 

//   //  PHONE VALIDATION (with country codes)
//   const allowedCodes = ["+234", "+1", "+44", "+91", "+81", "+61"];
  
//   const validCode = allowedCodes.some(code => number.startsWith(code));
//   if(!validCode){
//     numError.textContent = "Use a Valid country code (e.g +234)";
//   }

//   if (number.length < 10) {
//     numError.textContent = "Invalid number length";
//     numError.style.color = "red";
//     return;
//   } 
//   feedBack.textContent = "Login successful";
//   feedBack.style.color = "green";
//   console.log("Submitted:", { name, email, number});

//   window.location.href = "./page 2.html";
// });
  