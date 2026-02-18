function createTimePicker(containerID, name, value) {
  console.log(value);
  const $container = $("#" + containerID);
  // Create the time picker HTML
  const timePickerHTML = `
        <div class="time-picker d-flex flex-wrap align-items-center w-100 form-group gap-3">
            <div class="d-flex flex-column align-items-start">
                <select id="${name}_hours" style="width: 150px;" class="form-control">
                    <option value="" disabled selected>Hours</option>
                    ${[...Array(12).keys()]
                      .map((i) => `<option value="${i + 1}">${i + 1}</option>`)
                      .join("")}
                </select>
            </div>
            <div class="d-flex flex-column align-items-start ml-3">
                <div class="d-flex gap-3">
                    <select id="${name}_minutes" style="width: 150px;" class="form-control">
                        <option value="" disabled selected>Minutes</option>
                        ${[...Array(60).keys()]
                          .map(
                            (i) =>
                              `<option value="${i < 10 ? "0" + i : i}">${
                                i < 10 ? "0" + i : i
                              }</option>`
                          )
                          .join("")}
                    </select> 
                    <select id="${name}_ampm" style="width: 100px;" class="form-control">
                        <option value="" disabled selected>AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
            </div>
        </div>

        <input type="text" style=" border: none; width: 0; padding: 0; height: 0; position: absolute;" id="${name}" name="${name}" value="">
    `;

  //     <div class="selected-time alert alert-info mt-3" role="alert">
  //     Selected Time: <span id="${name}_time-display">12:00 AM</span>
  // </div>
  // Append the time picker to the container
  $container.html(timePickerHTML);

  if (value === null || value === undefined || value.trim() === "") {
    // Default values if value is invalid
    let hours = ""; // Default hour
    let minutes = ""; // Default minute
    let ampm = ""; // Default AM/PM
    // Set the values in the select inputs to defaults
    $(`#${name}_hours`).val(hours);
    $(`#${name}_minutes`).val(minutes);
    $(`#${name}_ampm`).val(ampm);
    $(`#${name}`).val(``); // Set initial value to input
  } else {
    // Split the value into hours and minutes
    let [hours24, minutes24] = value.split(/[: ]/);
    // Convert 24-hour format to 12-hour format
    let [hours, minutes, ampm] = convert24To12Array(hours24, minutes24);
    // alert([hours, minutes, ampm]);
    // Set the values in the select inputs
    $(`#${name}_hours`).val(parseInt(hours));
    $(`#${name}_minutes`).val(minutes);
    $(`#${name}_ampm`).val(ampm);
    // $(`#${name}`).val(value); // Set initial value to input
    const time24Regex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/; // Regex for 24-hour format
    if (time24Regex.test(value)) {
      // Only set value if time24 is in valid 24-hour format
      $(`#${name}`).val(value);
      $(`#${name}`).change(); // Trigger change event for validation
    } else {
      // Optionally clear the input if invalid
      $(`#${name}`).val(""); // Clear the input if the format is not valid
    }
  }

  function updateTimeDisplay() {
    const selectedHours = $(`#${name}_hours`).val();
    const selectedMinutes = $(`#${name}_minutes`).val();
    const selectedAmpm = $(`#${name}_ampm`).val();
    let time24 = "";
    if (selectedHours && selectedMinutes && selectedAmpm) {
      time24 = convert12To24(selectedHours, selectedMinutes, selectedAmpm);
    }
    // Handle empty time fields
    // const timeString = `${selectedHours && selectedMinutes ? `${selectedHours}:${selectedMinutes} ${selectedAmpm}` : ''}`;
    // Update the time display and input value
    $(`#${name}_time-display`).text(time24);
    $(`#${name}`).val(time24);
    $(`#${name}`).change();
    $(`#${name}`).on("change", function () {
      $(this).valid(); // Validate the select element on change
    });
  }
  // Add event listeners
  $(`#${name}_hours`).on("change", updateTimeDisplay);
  $(`#${name}_minutes`).on("change", updateTimeDisplay);
  $(`#${name}_ampm`).on("change", updateTimeDisplay);
  // Initialize the time display and input value
  updateTimeDisplay();
}
function convert24To12Array(hour24, minute) {
  // Convert the hour from string to number
  let hour = parseInt(hour24, 10);
  minute = parseInt(minute, 10);
  // Determine AM or PM
  const ampm = hour >= 12 ? "PM" : "AM";
  // Convert 24-hour format to 12-hour format
  hour = hour % 12 || 12; // Convert hour to 12-hour format and handle the 12 AM/PM case
  // Format the minute to always be two digits
  const formattedMinute = minute < 10 ? "0" + minute : minute;
  // Return the result as an array
  return [hour.toString(), formattedMinute, ampm];
}
function convert12To24(hours12, minutes, ampm) {
  // Convert the hours and minutes to numbers
  let hour = parseInt(hours12, 10);
  const minute = parseInt(minutes, 10);
  // Adjust hours based on AM/PM
  if (ampm === "PM" && hour !== 12) {
    hour += 12; // PM hours need to add 12 unless it's 12 PM
  } else if (ampm === "AM" && hour === 12) {
    hour = 0; // 12 AM should be 0 hours in 24-hour format
  }
  // Format hours and minutes to ensure two digits
  const formattedHour = hour < 10 ? "0" + hour : hour.toString();
  const formattedMinute = minute < 10 ? "0" + minute : minute.toString();
  // Return the result as a string in 24-hour format
  return `${formattedHour}:${formattedMinute}`;
}
// function createTimePicker(containerID, name, value) {
//     console.log(value);
//     const $container = $('#' + containerID);
//     // Create the time picker HTML
//     const timePickerHTML = `
//       <div class="time-picker d-flex align-items-center gap-3">
//         <div class="input-group">
//             <select id="${name}_hours" class="form-select">
//                 <option value="" disabled selected>Hours</option>
//                 ${[...Array(12).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
//             </select>
//         </div>
//         <div class="input-group">
//             <select id="${name}_minutes" class="form-select">
//                 <option value="" disabled  selected>Minutes</option>
//                 ${[...Array(60).keys()].map(i => `<option value="${i < 10 ? '0' + i : i}">${i < 10 ? '0' + i : i}</option>`).join('')}
//             </select>
//         </div>
//         <div class="input-group">
//             <select id="${name}_ampm" class="form-select">
//                 <option value=""  disabled selected>AM/PM</option>
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//             </select>
//         </div>
//         <input type="text" class="form-control " id="${name}" name="${name}" value="">
//     `;
//     // Append the time picker to the container
//     $container.html(timePickerHTML);
//     // // Set the initial value
//     // let [hours24, minutes24] = value.split(/[: ]/);
//     // let [hours, minutes, ampm] = convert24To12Array(hours24, minutes24);
//     // alert( [hours, minutes, ampm])
// // Check if value is valid
// if (value === null || value === undefined || value.trim() === '') {
//     // Default values if value is invalid
//     let hours = ''; // Default hour
//     let minutes = ''; // Default minute
//     let ampm = ''; // Default AM/PM
//     // Set the values in the select inputs to defaults
//     $(`#${name}_hours`).val(hours);
//     $(`#${name}_minutes`).val(minutes);
//     $(`#${name}_ampm`).val(ampm);
//     $(`#${name}`).val(`${hours}:${minutes} ${ampm}`); // Set initial value to input
// } else {
//     // Split the value into hours and minutes
//     let [hours24, minutes24] = value.split(/[: ]/);
//     // Convert 24-hour format to 12-hour format
//     let [hours, minutes, ampm] = convert24To12Array(hours24, minutes24);
//     // alert([hours, minutes, ampm]);
//     // Set the values in the select inputs
//     $(`#${name}_hours`).val(parseInt(hours));
//     $(`#${name}_minutes`).val(minutes);
//     $(`#${name}_ampm`).val(ampm);
//     // $(`#${name}`).val(value); // Set initial value to input
//     const time24Regex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/; // Regex for 24-hour format
//     if (time24Regex.test(value)) {
//         // Only set value if time24 is in valid 24-hour format
//         $(`#${name}`).val(value);
//         $(`#${name}`).change(); // Trigger change event for validation
//     } else {
//         // Optionally clear the input if invalid
//         $(`#${name}`).val(''); // Clear the input if the format is not valid
//     }
// }
//     // if (isNaN(hours)) {
//     //     minutes = '';
//     // }
//     // if (isNaN(minutes)) {
//     //     minutes = '';
//     // }
//     // if (isNaN(ampm)) {
//     //     minutes = '';
//     // }
//     $(`#${name}_hours`).val(parseInt(hours));
//     $(`#${name}_minutes`).val(minutes);
//     $(`#${name}_ampm`).val(ampm);
//     $(`#${name}`).val(value); // Set initial value to input
//     // Function to update the displayed time and input value
//     function updateTimeDisplay() {
//         const selectedHours = $(`#${name}_hours`).val();
//         const selectedMinutes = $(`#${name}_minutes`).val();
//         const selectedAmpm = $(`#${name}_ampm`).val();
//         let time24 = '';
//         if (selectedHours && selectedMinutes && selectedAmpm) {
//             time24 = convert12To24(selectedHours, selectedMinutes, selectedAmpm);
//         }
//         // Update the input value
//         const time24Regex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/; // Regex for 24-hour format
//         if (time24Regex.test(time24)) {
//             // Only set value if time24 is in valid 24-hour format
//             $(`#${name}`).val(time24);
//             $(`#${name}`).change(); // Trigger change event for validation
//         } else {
//             // Optionally clear the input if invalid
//             $(`#${name}`).val(''); // Clear the input if the format is not valid
//         }
//     }
//     // Add event listeners
//     $(`#${name}_hours`).on('change', updateTimeDisplay);
//     $(`#${name}_minutes`).on('change', updateTimeDisplay);
//     $(`#${name}_ampm`).on('change', updateTimeDisplay);
//     // Initialize the time display and input value
//     updateTimeDisplay();
// }
// function convert24To12Array(hour24, minute) {
//     let hour = parseInt(hour24, 10);
//     minute = parseInt(minute, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     hour = hour % 12 || 12; // Convert hour to 12-hour format
//     const formattedMinute = minute < 10 ? '0' + minute : minute;
//     return [hour.toString(), formattedMinute, ampm];
// }
// function convert12To24(hours12, minutes, ampm) {
//     let hour = parseInt(hours12, 10);
//     const minute = parseInt(minutes, 10);
//     if (ampm === 'PM' && hour !== 12) {
//         hour += 12;
//     } else if (ampm === 'AM' && hour === 12) {
//         hour = 0;
//     }
//     const formattedHour = hour < 10 ? '0' + hour : hour.toString();
//     const formattedMinute = minute < 10 ? '0' + minute : minute.toString();
//     return `${formattedHour}:${formattedMinute}`;
// }

// function createTimePicker(containerID, name, value) {
//     console.log(value);
//     const $container = $('#' + containerID);

//     // Create the time picker HTML
//     const timePickerHTML = `
//       <div class="time-picker d-flex align-items-center gap-3">
//         <div class="input-group">
//             <select id="${name}_hours" class="form-select">
//                 <option value="" disabled selected>Hours</option>
//                 ${[...Array(12).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
//             </select>
//         </div>
//         <div class="input-group">
//             <select id="${name}_minutes" class="form-select">
//                 <option value="" disabled selected>Minutes</option>
//                 ${[...Array(60).keys()].map(i => `<option value="${i < 10 ? '0' + i : i}">${i < 10 ? '0' + i : i}</option>`).join('')}
//             </select>
//         </div>
//         <div class="input-group">
//             <select id="${name}_ampm" class="form-select">
//                 <option value="" disabled selected>AM/PM</option>
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//             </select>
//         </div>
//         <input type="text" class="form-control" id="${name}" name="${name}" value="" readonly>
//         <div class="selected-time alert alert-info mt-3" role="alert">

//             Selected Time: <span id="${name}_time-display">12:00 AM</span>

//         </div>
//     `;

//     // Append the time picker to the container
//     $container.html(timePickerHTML);

//     // Initialize values
//     let hours = '';
//     let minutes = '';
//     let ampm = '';

//     // Check if the value is valid
//     if (value && value.trim() !== '') {
//         let [hours24, minutes24] = value.split(/[: ]/);

//         // Check if the provided time is in a valid 24-hour format
//         const time24Regex = /^(2[0-3]|[01]?[0-9]):[0-5][0-9]$/;
//         if (time24Regex.test(value)) {
//             // Convert 24-hour format to 12-hour format
//             [hours, minutes, ampm] = convert24To12Array(hours24, minutes24);
//         } else {
//             console.error('Invalid 24-hour format:', value);
//         }
//     }

//     // Set the values in the select inputs to defaults or parsed values
//     $(`#${name}_hours`).val(parseInt(hours) || '');
//     $(`#${name}_minutes`).val(minutes || '');
//     $(`#${name}_ampm`).val(ampm || '');
//     $(`#${name}`).val(`${hours}:${minutes} ${ampm}`.trim()); // Set initial value to input

//     // Function to update the displayed time and input value
//     function updateTimeDisplay() {
//         const selectedHours = $(`#${name}_hours`).val();
//         const selectedMinutes = $(`#${name}_minutes`).val();
//         const selectedAmpm = $(`#${name}_ampm`).val();

//         let time24 = '';

//         if (selectedHours && selectedMinutes && selectedAmpm) {
//             time24 = convert12To24(selectedHours, selectedMinutes, selectedAmpm);
//         }

//         // Validate and update the input value
//         if (time24Regex.test(time24)) {
//             $(`#${name}`).val(time24);
//             $(`#${name}`).change(); // Trigger change event for validation
//         } else {
//             $(`#${name}`).val(''); // Clear the input if the format is not valid
//         }
//     }

//     // Add event listeners
//     $(`#${name}_hours`).on('change', updateTimeDisplay);
//     $(`#${name}_minutes`).on('change', updateTimeDisplay);
//     $(`#${name}_ampm`).on('change', updateTimeDisplay);

//     // Initialize the time display and input value
//     updateTimeDisplay();
// }

function generateDatePicker(containerId, name, startDate, endDate, value) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }
  // Create the input element
  const input = document.createElement("input");
  input.type = "date"; // HTML5 date input will show calendar popup
  input.className = "form-control";
  input.id = `datepicker-${name}`;
  input.name = name;
  input.min = startDate;
  input.max = endDate;
  if (value) {
    input.value = value;
  }
  // Clear the container before appending new elements
  container.innerHTML = "";
  // Append the input
  container.appendChild(input);
  console.log(`Selected date for ${name}: ${value}`);
  // Add event listener to handle date selection
  input.addEventListener("change", function () {
    console.log(`Selected date for ${name}: ${this.value}`);
    // You can add additional logic here to handle the date selection
  });
  // Add focus event listener to trigger the date picker popup and allow manual typing
  input.addEventListener("focus", function () {
    this.showPicker(); // This triggers the calendar popup
  });
  // Allow manual typing of date
  input.addEventListener("keydown", function (event) {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      // Enter key
      this.blur(); // Blurs the input on Enter key, allowing the form to submit
    }
  });
}
function createDropdownDatePicker(
  containerID,
  name,
  startDate,
  endDate,
  value
) {
  generateDatePicker(containerID, name, startDate, endDate, value);
}
function initializeDropdownDatePicker(
  containerID,
  name,
  value = "",
  startYear = 18
) {
  // Get the gender value
  let gender = $("#Container_Gender").val();
  // Set startYear based on gender
  startYear = gender == 2 ? 21 : 18;
  // Check if value is empty and retrieve from container if necessary
  if (value === "" || value === null || value === undefined) {
    value = $(`#${containerID}`).val();
  }
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed (0-11)
  const currentDay = currentDate.getDate();
  // Calculate start date dynamically
  const startDate = new Date(
    currentYear - startYear - 40,
    currentMonth - 1,
    currentDay
  );
  const startDateString = `${startDate.getFullYear()}-${String(
    startDate.getMonth() + 1
  ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
  // Calculate end date dynamically
  const endDate = new Date(
    currentYear - startYear,
    currentMonth - 1,
    currentDay
  );
  const endDateString = `${endDate.getFullYear()}-${String(
    endDate.getMonth() + 1
  ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;
  const initialValue = value;
  createDropdownDatePicker(
    containerID,
    name,
    startDateString,
    endDateString,
    initialValue
  );
}
// function initializeDropdownTimePickerBaseOnGender(){
//     initializeDropdownDatePicker(containerID, name, value = '' , startYear = 18)
// }
function initializeDropdownTimePicker(containerID, name) {
  createTimePicker(containerID, name, getValueFromContainer(containerID));
}
function getValueFromContainer(containerID) {
  const $container = $(`#${containerID}`);
  if ($container.length) {
    return $container.attr("value");
  } else {
    console.error(`Container with ID '${containerID}' not found.`);
    return null;
  }
}
