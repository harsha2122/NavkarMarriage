const notifications = document.querySelector("#notifications");
//   <ul class="notifications"></ul> add this container to html
// buttons = document.querySelectorAll(".buttons .btn")
// const toastDetails = {
//     timer: 5000,
//     success: {
//         icon: "fa-circle-check",
//         text: "Hello World: This is a success toast.",
//     },
//     error: {
//         icon: "fa-circle-xmark",
//         text: "Hello World: This is an error toast.",
//     },
//     warning: {
//         icon: "fa-triangle-exclamation",
//         text: "Hello World: This is a warning toast.",
//     },
//     info: {
//         icon: "fa-circle-info",
//         text: "Hello World: This is an information toast.",
//     },
//     random: {
//         icon: "fa-solid fa-star",
//         text: "Hello World: This is a random toast.",
//     },
// }
// const removeToast = (toast) => {
//     toast.classList.add("hide")
//     if (toast.timeoutId) clearTimeout(toast.timeoutId)
//     setTimeout(() => toast.remove(), 500)
// }
// const createToast = (id) => {
//     const {
//         icon,
//         text
//     } = toastDetails[id]
//     const toast = document.createElement("li")
//     toast.className = `toast ${id}`
//     toast.innerHTML = `<div class="column">
//                        <i class="fa-solid ${icon}"></i>
//                        <span>${text}</span>
//                     </div>
//                     <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`
//     notifications.appendChild(toast)
//     toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer)
// }
// buttons.forEach((btn) => {
//     btn.addEventListener("click", () => createToast(btn.id))
// })
const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    defaultText: "Hello World: This is a success toast.",
  },
  error: {
    icon: "fa-circle-xmark",
    defaultText: "Hello World: This is an error toast.",
  },
  warning: {
    icon: "fa-triangle-exclamation",
    defaultText: "Hello World: This is a warning toast.",
  },
  info: {
    icon: "fa-circle-info",
    defaultText: "Hello World: This is an information toast.",
  },
  random: {
    icon: "fa-solid fa-star",
    defaultText: "Hello World: This is a random toast.",
  },
};
const removeToast = (toast) => {
  // Add the hide class to initiate any hiding animation
  toast.classList.add("hide");

  // Clear any existing timeout for this toast
  if (toast.timeoutId) clearTimeout(toast.timeoutId);

  // Remove the toast from the DOM after the hiding animation completes
  // Adjust the delay to match the animation duration (e.g., 500ms)
  setTimeout(() => toast.remove(), 100); // Adjust 500ms to match your CSS transition
};

function createToast(type, message) {
  // alert('Eorking');
  // const { icon, defaultText } = toastDetails[type];
  // const toastText = message || defaultText; // Use the provided message or default text
  // const toast = document.createElement("li");
  // toast.className = `toast_notification  ${type}`;
  // toast.innerHTML = `<div class="column ${type}">
  //                       <i class="fa-solid ${icon}"></i>
  //                       <span>${toastText}</span>
  //                     </div>
  //                     <a onclick="removeToast(this.parentElement)" >
  //                     <i class="fa-solid fa-xmark" ></i></a>`;
  // $('#notifications').append(toast);
  // toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}
// <li class="toast_notification success hide"><div class="column">
// <i class="fa-solid fa-circle-check"></i>
// <span>Form submitted successfully!</span>
// </div>
// <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i></li>
// buttons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//         const message = prompt("Enter your custom message:", ""); // Prompt user for custom message
//         createToast(btn.id, message);
//     });
// });
